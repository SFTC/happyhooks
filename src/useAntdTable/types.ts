import { TableProps } from 'antd/es/table';

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

// useAntdTable`
export interface IAntdTableReturnType<ListItem, Params> {
  onSearch: (params: Partial<Params>) => void;
  update: (newList: ListItem[]) => void;
  tableProps: Partial<TableProps<ListItem>>;
}
export interface ITableState<ListItem, Params> {
  loading: boolean;
  dataSource: ListItem[];
  current: number;
  pageSize: number;
  showTotal: (total: number) => string;
  total: number;
  sort: any;
  params: Partial<Params>;
}
