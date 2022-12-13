import { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Checkbox,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@mui/material';
import TableToolbar from './TableToolbar';
import TableHead from './TableHead';
import { useQuery } from 'react-query';
import getChantiers, { ChantiersAndTotal, PaginateParameters } from '../../api/getChantiers';
import Chantier from '../../models/Chantier';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';

type Order = 'asc' | 'desc';

function ChantierTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Chantier>('date');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const params: PaginateParameters = {
    page,
    limit: rowsPerPage,
    sortBy: orderBy,
    sortOrder: order
  };
  const { data, error, isError, isFetching, isSuccess, refetch } = useQuery<
    ChantiersAndTotal,
    Error
  >({
    queryKey: ['getChantiers', params],
    queryFn: async () => await getChantiers(params),
    enabled: false,
    keepPreviousData: true
  });
  const chantiers = data?.chantiers ?? [];
  const total = data?.total ?? Infinity;

  useEffect(() => {
    void refetch();
  }, [order, orderBy, page, rowsPerPage, refetch]);

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof Chantier) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = chantiers.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.includes(name);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={selected.length} />

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
        {isError && <Alert severity="error">{error.message}</Alert>}
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
                <TableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={chantiers.length}
                />

                <TableBody>
                  {chantiers
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((chantier, index) => {
                      const isItemSelected = isSelected(chantier._id);
                      const labelId = `chantiers-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, chantier._id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={chantier._id}
                          selected={isItemSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId
                              }}
                            />
                          </TableCell>
                          <TableCell>{chantier.name}</TableCell>
                          <TableCell>{chantier.description}</TableCell>
                          <TableCell>{chantier.date.toString()}</TableCell>
                          <TableCell>{chantier.type}</TableCell>
                        </TableRow>
                      );
                    })}
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
      </Paper>
    </Box>
  );
}

export default ChantierTable;
