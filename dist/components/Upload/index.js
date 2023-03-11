var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
;
;
/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'component-library'
 * ~~~
 */
var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, data = props.data, withCredentials = props.withCredentials, name = props.name, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var inputRef = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var handleChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        uploadFiles(files);
        if (inputRef.current)
            inputRef.current.value = '';
    };
    var handleRemove = function (_file) {
        setFileList(function (prevList) {
            return prevList.filter(function (file) {
                return file.uid !== _file.uid;
            });
        });
        onRemove === null || onRemove === void 0 ? void 0 : onRemove(_file);
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: "".concat(+new Date(), "upload-file"),
            name: file.name,
            size: file.size,
            status: 'ready',
            percentage: 0,
            raw: file,
        };
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                formData.append(key, value);
            }
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage;
                if (e.progress) {
                    percentage = Math.round(e.progress * 100);
                }
                else
                    percentage = 0;
                if (percentage < 100) {
                    updateFileList(_file, { percentage: percentage, status: 'uploading' });
                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(percentage, file);
                }
            },
        }).then(function (res) {
            updateFileList(_file, { status: 'success', success: res });
            _file.status = 'success';
            _file.success = res;
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(res, _file);
            onChange === null || onChange === void 0 ? void 0 : onChange(_file);
        }).catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            _file.status = 'error';
            _file.error = err;
            onError === null || onError === void 0 ? void 0 : onError(err, _file);
            onChange === null || onChange === void 0 ? void 0 : onChange(_file);
        });
    };
    return (React.createElement("div", { className: "upload" },
        React.createElement("div", { className: "upload-input", onClick: handleClick },
            drag ?
                React.createElement(Dragger, { onFile: function (files) { return uploadFiles(files); } }, children)
                : children,
            React.createElement("input", { type: "file", ref: inputRef, style: { display: 'none' }, onChange: handleChange, multiple: multiple, accept: accept })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file',
};
export default Upload;
