/* eslint-disable react/no-find-dom-node */
import { useState, useEffect } from 'react';
import { findDOMNode } from 'react-dom';

import { Params } from './types';

const useTableColumns = ({ originColumns, dom }: Params) => {
  const [realWidth, setRealWidth] = useState(0);

  let totalWidth = 0;
  originColumns.forEach((item: any) => {
    if (item.width) {
      totalWidth += item.width;
    }
  });

  if (originColumns.length > 0) {
    originColumns[originColumns.length - 1].fixed = realWidth < totalWidth ? 'right' : false;
    originColumns[0].fixed = realWidth < totalWidth ? 'left' : false;
  }

  useEffect(() => {
    const onResizeHandler = () => {
      if (findDOMNode(dom) && findDOMNode(dom).clientWidth) {
        setRealWidth(findDOMNode(dom).clientWidth);
      }
    };
    if (dom) {
      if (findDOMNode(dom) && findDOMNode(dom).clientWidth) {
        setRealWidth(findDOMNode(dom).clientWidth);
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
