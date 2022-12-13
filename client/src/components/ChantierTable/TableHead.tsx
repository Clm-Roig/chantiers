import {
  Box,
  Checkbox,
  TableHead as MuiTableHead,
  TableCell,
  TableRow,
  TableSortLabel
} from '@mui/material';
import { ChangeEvent, MouseEvent } from 'react';
import { visuallyHidden } from '@mui/utils';
import Chantier from '../../models/Chantier';

type Order = 'asc' | 'desc';

interface HeadCell {
  id: keyof Chantier;
  label: string;
}
const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'description',
    label: 'Description'
  },
  {
    id: 'date',
    label: 'Date'
  },
  {
    id: 'type',
    label: 'Type'
  }
];

interface Props {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Chantier) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function TableHead(props: Props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Chantier) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all chantiers'
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align="center">
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}

export default TableHead;
