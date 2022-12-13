import { Divider, Fade } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import getChantiers, { ChantiersAndTotal, PaginateParameters } from '../../api/getChantiers';
import Chantier from '../../models/Chantier';
import ChantierTable from '../common/ChantierTable';
import CreateChantier from '../CreateChantier';
import EditChantier from '../EditChantier';
import useTableControls from '../../hooks/useTableControls';

const DEFAULT_ORDER_BY = 'date';

function Chantiers() {
  const editBlocRef = useRef<HTMLDivElement>(null);
  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    selected,
    setOrder,
    setOrderBy,
    setPage,
    setRowsPerPage,
    setSelected
  } = useTableControls<Chantier>();

  const params: PaginateParameters = {
    page,
    limit: rowsPerPage,
    sortBy: orderBy ?? DEFAULT_ORDER_BY,
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

  // Refetch data when a control changes
  useEffect(() => {
    void refetch();
  }, [order, orderBy, page, rowsPerPage, refetch]);

  // Scroll to selected chantier when it appears
  useEffect(() => {
    if (selected) {
      editBlocRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selected]);

  const onEditOrDeleteSuccess = () => {
    setSelected(undefined);
    void refetch();
  };

  const onCreateSuccess = () => {
    void refetch();
  };

  const chantiers = data?.chantiers ?? [];
  const total = data?.total ?? Infinity;

  return (
    <>
      <ChantierTable
        chantiers={chantiers}
        error={error}
        isError={isError}
        isFetching={isFetching}
        isSuccess={isSuccess}
        order={order}
        orderBy={orderBy ?? DEFAULT_ORDER_BY}
        rowsPerPage={rowsPerPage}
        page={page}
        selected={selected}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        setSelected={setSelected}
        total={total}
      />
      <div ref={editBlocRef}>
        <Fade in={!!selected} timeout={1000}>
          <div>
            {selected && (
              <EditChantier
                chantier={selected}
                onEditSuccess={onEditOrDeleteSuccess}
                onDeleteSuccess={onEditOrDeleteSuccess}
                unselectChantier={() => setSelected(undefined)}
              />
            )}
          </div>
        </Fade>
      </div>
      <Divider sx={{ my: 2 }} />

      <CreateChantier onCreateSuccess={onCreateSuccess} />
    </>
  );
}

export default Chantiers;
