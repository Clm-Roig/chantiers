import { useState } from 'react';

export enum Order {
  ASC = 'asc',
  DESC = 'desc'
}

export interface TableControls<T> {
  order: Order;
  orderBy?: keyof T;
  page: number;
  rowsPerPage: number;
  selected?: T;
  setRowsPerPage: (rowsPerPage: number) => void;
  setOrder: (order: Order) => void;
  setOrderBy: (orderBy: keyof T) => void;
  setPage: (page: number) => void;
  setSelected: (item?: T) => void;
}

function useTableControls<T>(): TableControls<T> {
  const [order, setOrder] = useState<Order>(Order.ASC);
  const [orderBy, setOrderBy] = useState<keyof T>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<T | undefined>();
  return {
    order,
    setOrder,
    orderBy,
    setOrderBy,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    selected,
    setSelected
  };
}

export default useTableControls;
