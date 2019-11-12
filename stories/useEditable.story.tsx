import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input, Button } from 'antd';
import useEditable from '../src/useEditable/index';

storiesOf('useEditable', module).add('basic usage', () => {
  const { editable, onEdit, onCancel } = useEditable();
  return (
    <>
      <Input disabled={!editable} placeholder='请输入...' style={{ marginBottom: 16 }} />
      {editable ? (
        <>
          <Button type='primary' onClick={onCancel} style={{ marginRight: 16 }}>
            保存
          </Button>
          <Button onClick={onCancel}>取消</Button>
        </>
      ) : (
        <Button type='primary' onClick={onEdit} style={{ marginRight: 16 }}>
          编辑
        </Button>
      )}
    </>
  );
});
