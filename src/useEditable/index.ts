import { useState } from 'react';

interface IReturn {
  editable: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

const useEditable = (): IReturn => {
  const [editable, setEditable] = useState(false);

  const onEdit = () => {
    setEditable(true);
  };

  const onCancel = () => {
    setEditable(false);
  };
  return {
    editable,
    onEdit,
    onCancel,
  };
};

export default useEditable;
