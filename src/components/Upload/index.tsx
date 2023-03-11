import React, { FC, useRef, ChangeEvent, useState, ReactNode } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";

export interface UploadProps {
  /**文件上传的url */
  action: string;
  /**上传的文件列表*/
  defaultFileList?: UploadFile[];
  /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传*/
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**文件上传时的钩子 */
  onProgress?: (percentage: number, file: File) => void;
  /**文件上传成功时的钩子 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**文件上传失败时的钩子 */
  onError?: (data: any, file: UploadFile) => void;
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用*/
  onChange?: (file: UploadFile) => void;
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void;
  /**设置上传的请求头部 */
  headers?: { [key: string]: any };
  /**上传的文件字段名 */
  name?: string;
  /**上传时附带的额外参数 */
  data?: { [key: string]: any };
  /**支持发送 cookie 凭证信息 */
  withCredentials?: boolean;
  /**可选参数, 接受上传的文件类型 */
  accept?: string;
  /**是否支持多选文件 */
  multiple?: boolean;
  children?: ReactNode;
  /**是否支持拖拽上传 */
  drag?: boolean;
};

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  status: UploadFileStatus;
  percentage?: number;
  raw?: File;
  success?: any;
  error?: any;
};

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 * 
 * ~~~js
 * import { Upload } from 'wanyueship'
 * ~~~
 */
const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    data,
    withCredentials,
    name,
    accept,
    multiple,
    children,
    drag,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file;
        }
      })
    });
  };
  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (inputRef.current) inputRef.current.value = '';
  };
  const handleRemove = (_file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(file => {
        return file.uid !== _file.uid;
      })
    });
    onRemove?.(_file);
  };
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result) {
          post(file);
        }
      }
    });
  };
  const post = (file: File) => {
    const _file: UploadFile = {
      uid: `${+new Date()}upload-file`,
      name: file.name,
      size: file.size,
      status: 'ready',
      percentage: 0,
      raw: file,
    };
    setFileList(prevList => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || 'file', file);
    if (data) {
      for (let [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress(e) {
        let percentage: number;
        if (e.progress) {
          percentage = Math.round(e.progress * 100);
        } else percentage = 0;
        if (percentage < 100) {
          updateFileList(_file, { percentage, status: 'uploading' });
          onProgress?.(percentage, file);
        }
      },
    }).then(res => {
      updateFileList(_file, { status: 'success', success: res });
      _file.status = 'success';
      _file.success = res;
      onSuccess?.(res, _file);
      onChange?.(_file);
    }).catch(err => {
      updateFileList(_file, { status: 'error', error: err });
      _file.status = 'error';
      _file.error = err;
      onError?.(err, _file);
      onChange?.(_file);
    })
  }
  return (
    <div className="upload">
      <div className="upload-input" onClick={handleClick}>
        {drag ?
          <Dragger onFile={(files) => uploadFiles(files)}>{children}</Dragger>
          : children
        }
        <input
          type="file"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={handleChange}
          multiple={multiple}
          accept={accept}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
};

Upload.defaultProps = {
  name: 'file',
};

export default Upload;