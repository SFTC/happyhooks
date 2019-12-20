import { useState } from 'react';
import { UploadProps, UploadChangeParam, RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface.d';

interface ReturnValue<T> extends UploadProps {
  name?: string;
  action: string;
  headers?: {};
  accept?: string;
  validInfo?: string;
  fileResList: FileRes[];
}

type fn = (...args: any[]) => void;
const fn: fn = () => {};

export interface Options {
  action: string;
  onSuccess?: fn;
  onError?: fn;
  maxSize?: number;
  acceptList?: [];
}

export interface File extends RcFile {
  size: number;
}

export interface FileRes {
  url: string;
}

const useUpload = <T>({
  action = '',
  onSuccess = () => {},
  onError = () => {},
  maxSize,
  acceptList = [],
}: Options): ReturnValue<T> => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [validInfo, setVaildInfo] = useState<string>('');
  const [fileResList, setFileResListUrl] = useState<FileRes[]>([]);

  const onChange = ({ file, fileList }: UploadChangeParam): void => {
    if (file.status !== 'uploading') {
    }
    if (file.status === 'done') {
      setFileResListUrl(fileList.map(({ response }: any) => response).filter((val: any) => val));
      onSuccess({ file, fileList });
    } else if (file.status === 'error') {
      onError({ file, fileList });
    }
    setFileList(fileList);
  };
  const beforeUpload = (file: File): boolean => {
    if (maxSize && file.size / 1024 / 1024 >= maxSize) {
      setVaildInfo(`图片大小超过${maxSize}M`);
      return false;
    }
    return true;
  };

  return {
    name: name || 'img',
    action,
    onChange,
    beforeUpload,
    ...(acceptList ? { accept: acceptList.join(',') } : {}),
    fileList,
    ...(validInfo ? { validInfo } : {}),
    fileResList,
  };
};

export default useUpload;
