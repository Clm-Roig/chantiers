import { MouseEvent, ChangeEvent } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow as MuiTableRow
} from '@mui/material';
import TableRow from './TableRow';
import TableHead from './TableHead';
import Chantier from '../../../models/Chantier';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Order, TableControls } from '../../../hooks/useTableControls';
import TableSkeleton from './TableSkeleton';

interface Props extends TableControls<Chantier> {
  chantiers: Chantier[];
  error: Error | null;
  isError: boolean;
  isFetching: boolean;
  isSuccess: boolean;
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
  selected,
  setOrder,
  setOrderBy,
  setPage,
  setRowsPerPage,
  setSelected,
  total
}: Props) {
  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof Chantier) => {
    const isAsc = orderBy === property && order === Order.ASC;
    setOrder(isAsc ? Order.DESC : Order.ASC);
    setOrderBy(property);
  };

  const handleRowClick = (event: MouseEvent<unknown>, clickedChantier: Chantier) => {
    if (isSelected(clickedChantier._id)) {
      setSelected();
    } else {
      setSelected(clickedChantier);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected?._id === id;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  return (
    <>
      <Typography variant="h2" id="tableTitle">
        Tous mes chantiers
      </Typography>

      {/* ===== Handle loading and error ===== */}
      {chantiers.length === 0 && isSuccess && <Alert severity="info">Aucun chantier trouvé</Alert>}
      {isFetching && chantiers.length === 0 && <TableSkeleton />}
      {isError && <Alert severity="error">{error?.message}</Alert>}
      {/* ===== End loading and error handling ===== */}

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
                    key={chantier._id}
                    chantier={chantier}
                    isSelected={isSelected}
                    handleRowClick={handleRowClick}
                  />
                ))}
                {emptyRows > 0 && (
                  <MuiTableRow
                    style={{
                      height: 53 * emptyRows
                    }}>
                    <TableCell colSpan={6} />
                  </MuiTableRow>
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
