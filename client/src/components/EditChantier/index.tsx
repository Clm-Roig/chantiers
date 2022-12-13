import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Chantier from '../../models/Chantier';
import ChantierForm from '../common/ChantierForm';
import deleteChantier from '../../api/deleteChantiers';
import { useMutation } from 'react-query';
import { useEffect } from 'react';

interface Props {
  chantier: Chantier;
  onEditSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

function EditChantier({ chantier, onEditSuccess, onDeleteSuccess }: Props) {
  const {
    data: successMessage,
    error,
    isLoading,
    isSuccess,
    isError,
    mutate: doDelete
  } = useMutation<string, Error, Chantier['_id']>(['deleteChantier'], deleteChantier);

  useEffect(() => {
    if (isSuccess && onDeleteSuccess) {
      onDeleteSuccess();
    }
  }, [isSuccess]);

  const handleOnDelete = () => {
    doDelete(chantier._id);
  };
  return (
    <Stack spacing={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">
          Éditer <b>{chantier.name}</b>
        </Typography>
        <Button
          variant="outlined"
          color="error"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress color="error" size={20} /> : <DeleteIcon />}
          onClick={handleOnDelete}>
          Supprimer
        </Button>
      </Box>
      <ChantierForm defaultValues={chantier} onSuccess={onEditSuccess} />
    </Stack>
  );
}

export default EditChantier;
