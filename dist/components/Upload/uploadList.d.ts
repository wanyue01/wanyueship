import { FC } from 'react';
import { UploadFile } from '.';
export interface UploadListProps {
    onRemove: (file: UploadFile) => void;
    fileList: UploadFile[];
}
declare const UploadList: FC<UploadListProps>;
export default UploadList;
