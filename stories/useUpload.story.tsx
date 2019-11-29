import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Upload, Icon } from 'antd';
import useUpload from '../src/useUpload/index';

storiesOf('useSetState', module).add('basic usage', () => {
  const props = useUpload({ action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', maxSize: 2 });
  const { fileResList } = props;
  return (
     <div style={{ padding: '20px' }}>
      <Upload {...props}>
        <Button>
          <Icon type="upload" /> 点击上传
        </Button>
        <div>
          {fileResList && fileResList.map((file, index) => <img src={file.url} key={index} style={{ width: '150px', height: '150px', margin: '10px' }} />) }
        </div>
      </Upload>
    </div>
  );
});
