import { MouseEvent, ChangeEvent } from 'react';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@mui/material';
import TableHead from './TableHead';
import Chantier from '../../../models/Chantier';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export type Order = 'asc' | 'desc';

interface Props {
  chantiers: Chantier[];
  error: Error | null;
  isError: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  order: Order;
  orderBy: keyof Chantier;
  page: number;
  rowsPerPage: number;
  selectedChantier?: Chantier;
  setRowsPerPage: (rowsPerPage: number) => void;
  setOrder: (order: Order) => void;
  setOrderBy: (orderBy: keyof Chantier) => void;
  setPage: (page: number) => void;
  setSelectedChantier: (chantier?: Chantier) => void;
  total: number;
}

function ChantierTable({
  chantiers,
  error,
  isError,
  isFetching,
  isSuccess,
  order,
  orderBy,
  page,
  rowsPerPage,
  selectedChantier,
  setOrder,
  setOrderBy,
  setPage,
  setRowsPerPage,
  setSelectedChantier,
  total
}: Props) {
  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof Chantier) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRowClick = (event: MouseEvent<unknown>, clickedChantier: Chantier) => {
    if (isSelected(clickedChantier._id)) {
      setSelectedChantier();
    } else {
      setSelectedChantier(clickedChantier);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selectedChantier?._id === id;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  return (
    <>
      <Typography variant="h2" id="tableTitle">
        Tous mes chantiers
      </Typography>
      {/* Handle loading and error */}
      {chantiers.length === 0 && isSuccess && <Alert severity="info">No chantiers found</Alert>}
      {isFetching && chantiers.length === 0 && (
        <Box>
          <Skeleton width="100%" height="50px" />
          <Divider />
          <Skeleton width="100%" height="50px" />
          <Skeleton width="100%" height="50px" />
          <Skeleton width="100%" height="50px" />
          <Skeleton width="100%" height="50px" />
          <Box display="flex" justifyContent="space-between">
            <Box flex={1} />
            <Skeleton sx={{ flex: 1 }} height="50px" />
          </Box>
        </Box>
      )}
      {isError && <Alert severity="error">{error?.message}</Alert>}
      {chantiers.length > 0 && isSuccess && (
        <>
          <TableContainer sx={{ position: 'relative' }}>
            {isFetching && (
              <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
            )}
            <Table
              sx={{ minWidth: 750, filter: isFetching ? 'blur(2px)' : '' }}
              aria-labelledby="tableTitle"
              size={'medium'}>
              <TableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />

              <TableBody>
                {chantiers.map((chantier) => (
                  <TableRow
                    hover
                    sx={{
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                    onClick={(event) => handleRowClick(event, chantier)}
                    role="checkbox"
                    aria-checked={isSelected(chantier._id)}
                    tabIndex={-1}
                    key={chantier._id}
                    selected={isSelected(chantier._id)}>
                    <TableCell>{chantier.name}</TableCell>
                    <TableCell>{chantier.description}</TableCell>
                    <TableCell>{new Date(chantier.date).toLocaleDateString()}</TableCell>
                    <TableCell>{chantier.type}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows
                    }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </>
  );
}

export default ChantierTable;
