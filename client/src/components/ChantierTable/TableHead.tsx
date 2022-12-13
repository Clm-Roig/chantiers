import { Box, TableHead as MuiTableHead, TableCell, TableRow, TableSortLabel } from '@mui/material';
import { MouseEvent } from 'react';
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
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Chantier) => void;
  order: Order;
  orderBy: string;
}

function TableHead({ order, orderBy, onRequestSort }: Props) {
  const createSortHandler = (property: keyof Chantier) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <MuiTableHead>
      <TableRow>
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
