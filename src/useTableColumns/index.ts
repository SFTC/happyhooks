import { useState, useEffect } from 'react';
import { findDOMNode } from 'react-dom';

const useTableColumns = ({ originColumns, dom }) => {
  const [realWidth, setRealWidth] = useState(0);

  let totalWidth = 0;
  originColumns.forEach((item: any) => {
    if (item.width) {
      totalWidth += item.width;
    }
  });

  if (originColumns.length > 0) {
    originColumns[originColumns.length - 1].fixed = realWidth < totalWidth ? 'right' : false; // eslint-disable-line
    originColumns[0].fixed = realWidth < totalWidth ? 'left' : false; // eslint-disable-line
  }

  useEffect(() => {
    const onResizeHandler = () => {
      // eslint-disable-next-line
      if (findDOMNode(dom) && findDOMNode(dom).clientWidth) {
        setRealWidth(findDOMNode(dom).clientWidth); // eslint-disable-line
      }
    };
    if (dom) {
      // eslint-disable-next-line
      if (findDOMNode(dom) && findDOMNode(dom).clientWidth) {
        setRealWidth(findDOMNode(dom).clientWidth); // eslint-disable-line
      }
    }
    window.addEventListener('resize', onResizeHandler);
    return () => window.removeEventListener('resize', onResizeHandler);
  }, [dom]);

  return {
    columns: originColumns,
    scrollX: totalWidth,
  };
};

export default useTableColumns;
