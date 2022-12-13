import { Divider, Fade } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import getChantiers, { ChantiersAndTotal, PaginateParameters } from '../../api/getChantiers';
import Chantier from '../../models/Chantier';
import ChantierTable, { Order } from '../common/ChantierTable';
import CreateChantier from '../CreateChantier';
import EditChantier from '../EditChantier';

function Chantiers() {
  const editBlocRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Chantier>('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const params: PaginateParameters = {
    page,
    limit: rowsPerPage,
    sortBy: orderBy,
    sortOrder: order
  };
  const [selectedChantier, setSelectedChantier] = useState<Chantier | undefined>();
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

  useEffect(() => {
    if (selectedChantier) {
      editBlocRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChantier]);

  const onEditOrDeleteSuccess = () => {
    setSelectedChantier(undefined);
    void refetch();
  };

  const onCreateSuccess = () => {
    void refetch();
  };

  return (
    <>
      <ChantierTable
        chantiers={chantiers}
        error={error}
        isError={isError}
        isFetching={isFetching}
        isSuccess={isSuccess}
        order={order}
        orderBy={orderBy}
        rowsPerPage={rowsPerPage}
        page={page}
        selectedChantier={selectedChantier}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        setSelectedChantier={setSelectedChantier}
        total={total}
      />
      <div ref={editBlocRef}>
        <Fade in={!!selectedChantier} timeout={1000}>
          <div>
            {selectedChantier && (
              <EditChantier
                chantier={selectedChantier}
                onEditSuccess={onEditOrDeleteSuccess}
                onDeleteSuccess={onEditOrDeleteSuccess}
                unselectChantier={() => setSelectedChantier(undefined)}
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
