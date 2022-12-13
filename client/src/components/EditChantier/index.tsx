import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import Chantier from '../../models/Chantier';
import ChantierForm from '../common/ChantierForm';
import deleteChantier from '../../api/deleteChantiers';
import { useMutation } from 'react-query';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

interface Props {
  chantier: Chantier;
  onEditSuccess?: () => void;
  onDeleteSuccess?: () => void;
  unselectChantier: () => void;
}

function EditChantier({ chantier, onEditSuccess, onDeleteSuccess, unselectChantier }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    data: successMessage,
    error,
    isLoading,
    isSuccess,
    isError,
    mutate: doDelete
  } = useMutation<string, Error, Chantier>(['deleteChantier'], deleteChantier);

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(successMessage, { variant: 'success' });
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    }
    if (isError) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  }, [isSuccess, isError, error, successMessage, enqueueSnackbar, onDeleteSuccess]);

  const handleOnDelete = () => {
    doDelete(chantier);
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
      <Box>
        <Button variant="text" onClick={unselectChantier} startIcon={<RestartAltIcon />}>
          Désélectionner
        </Button>
      </Box>
      <ChantierForm defaultValues={chantier} onSuccess={onEditSuccess} />
    </Stack>
  );
}

export default EditChantier;
