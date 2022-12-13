import {
  CircularProgress,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import createChantier from '../../../api/createChantier';
import Chantier from '../../../models/Chantier';
import ChantierType from '../../../models/ChantierType';
import editChantier from '../../../api/editChantier';
import { useSnackbar } from 'notistack';

type ChantierFormDefaultValues = Omit<Chantier, '_id'>;

const emptyChantier: ChantierFormDefaultValues = {
  description: '',
  name: '',
  date: new Date(),
  type: ChantierType.Type1
};

interface Props {
  defaultValues?: ChantierFormDefaultValues;
  onSuccess?: () => void;
}

function ChantierForm({ defaultValues, onSuccess }: Props) {
  const isEditing = !!defaultValues;
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty }
  } = useForm<Chantier>({
    defaultValues: isEditing ? defaultValues : emptyChantier
  });

  const {
    data: successMessage,
    error,
    isLoading,
    isSuccess,
    isError,
    mutate
  } = useMutation<string, Error, Chantier>(
    [isEditing ? 'editChantier' : 'createChantier'],
    isEditing ? editChantier : createChantier
  );

  // Display alert if something changes
  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(successMessage, { variant: 'success' });
    }
    if (isError) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  }, [isSuccess, isError, successMessage, error]);

  // Reset on success
  useEffect(() => {
    if (isSuccess) {
      resetForm();
      if (onSuccess) onSuccess();
    }
  }, [isSuccess]);

  // Reset on defaultValues change
  useEffect(() => {
    resetForm();
  }, [defaultValues]);

  const onSubmit = (data: Chantier) => {
    mutate(data);
  };

  const resetForm = () => reset(isEditing ? defaultValues : emptyChantier);

  return (
    <>
      <form>
        <Box display="flex" width="100%" gap={2} flexWrap="wrap" justifyContent="center">
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
              <TextField
                required
                label={name[0].toUpperCase() + name.slice(1)}
                onChange={onChange}
                inputRef={ref}
                value={value}
                error={!(error == null)}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
              <DatePicker
                label={name[0].toUpperCase() + name.slice(1)}
                onChange={onChange}
                inputRef={ref}
                value={value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={!(error == null)}
                    helperText={error?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
              <FormControl sx={{ minWidth: '150px' }} error={!(error == null)}>
                <InputLabel>{name[0].toUpperCase() + name.slice(1)}</InputLabel>
                <Select
                  required
                  value={value}
                  label={name[0].toUpperCase() + name.slice(1)}
                  onChange={onChange}
                  error={!(error == null)}>
                  {Object.values(ChantierType).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
              <TextField
                minRows={4}
                sx={{ minWidth: '400px' }}
                multiline
                label={name[0].toUpperCase() + name.slice(1)}
                onBlur={onBlur}
                onChange={onChange}
                inputRef={ref}
                value={value}
                error={!(error == null)}
                helperText={error?.message}
              />
            )}
          />
          <Box display="flex" gap={1} flexDirection="row" alignItems="center">
            <Button
              type="submit"
              disabled={isLoading || (isEditing && !isDirty)}
              onClick={handleSubmit(onSubmit)}>
              {isEditing ? 'Éditer' : 'Créer'}
            </Button>
            <Button disabled={isLoading} onClick={resetForm} variant={'outlined'}>
              Réinitialiser
            </Button>
            {isLoading && <CircularProgress size={30} />}
          </Box>
        </Box>
      </form>
    </>
  );
}

export default ChantierForm;
