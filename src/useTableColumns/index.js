import { useState, useEffect } from 'react';
import { findDOMNode } from 'react-dom';

export default ({ originColumns, dom }) => {
  const [realWidth, setRealWidth] = useState(null);

  let totalWidth = 0;
  originColumns.forEach(item => {
    if (item.width) {
      totalWidth += item.width;
    }
  });

  if (originColumns.length > 0) {
    originColumns[originColumns.length - 1].fixed = // eslint-disable-line
      realWidth && realWidth < totalWidth ? 'right' : false;
    originColumns[0].fixed = realWidth && realWidth < totalWidth ? 'left' : false; // eslint-disable-line
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
