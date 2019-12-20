import { useReducer, useEffect, Reducer } from 'react';
import { Partial, IAntdTableReturnType, ITableState } from './types';

// TODO 消灭AnyScript!!
const DEFAULT_STATE = {
  loading: false,
  dataSource: [],
  current: 1,
  pageSize: 20,
  showTotal: (total: number): string => `共 ${total} 条`,
  total: 0,
  sort: {},
  params: {},
};

const tableReducer = <T>(
  state: T,
  action: {
    type: string;
    payload?: Partial<T>;
  },
) => {
  switch (action.type) {
    case 'updateState':
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};

export default function useAntdTable<ListItem, Params>(
  fetch: (params: any) => Promise<any>,
  searchParams: Params,
): IAntdTableReturnType<ListItem, Params> {
  const [
    {
      loading,
      current,
      pageSize,
      total,
      showTotal,
      sort,
      dataSource,
      params, // 额外搜索项
    },
    dispatch,
  ] = useReducer<Reducer<ITableState<ListItem, Params>, any>>(tableReducer, {
    ...DEFAULT_STATE,
    params: searchParams,
  });

  // 获取数据
  useEffect(() => {
    let cancel = false;
    dispatch({ type: 'updateState', payload: { loading: true } });
    fetch({
      page: current,
      perpage: pageSize,
      ...params,
    })
      .then(({ data }: { data: { list: ListItem[]; total: number } }) => {
        if (!cancel) {
          dispatch({ type: 'updateState', payload: { dataSource: data.list } });
          dispatch({ type: 'updateState', payload: { total: data.total } });
        }
      })
      .finally(() => dispatch({ type: 'updateState', payload: { loading: false } }));

    // 返回值页面卸载之后调用的函数
    return () => {
      cancel = true;
    };
  }, [current, pageSize, sort, params, fetch]);

  // 按搜索条件刷新列表 跳到第一页
  const onSearch = (nextParams: any) => {
    if (!loading) {
      dispatch({
        type: 'updateState',
        payload: {
          params: nextParams,
          current: 1,
        },
      });
    }
  };

  const update = (newList: ListItem[]) => {
    if (!loading) {
      dispatch({ type: 'updateState', payload: { dataSource: newList } });
    }
  };

  // 分页变更
  const onChange = (pager: any, filters: any, sorter: any) => {
    if (!loading) {
      dispatch({
        type: 'updateState',
        payload: {
          current: pager.current,
          pageSize: pager.pageSize,
          sort: sorter,
        },
      });
    }
  };

  return {
    onSearch,
    update,
    tableProps: {
      bordered: true,
      loading,
      dataSource,
      pagination: {
        current,
        pageSize,
        total,
        showTotal,
      },
      onChange,
    },
  };
}
