import {
  CircularProgress,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
  Stack
} from '@mui/material';
import { Box } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import createChantier from '../../api/createChantier';
import Chantier from '../../models/Chantier';
import ChantierType from '../../models/ChantierType';

const defaultValues: Chantier = {
  description: '',
  name: '',
  date: new Date(),
  type: ChantierType.Type1
};

function CreateChantierForm() {
  const { control, handleSubmit, reset } = useForm<Chantier>({
    defaultValues
  });

  const { isLoading, isSuccess, mutate: doCreateChantier } = useMutation(createChantier);

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  const onSubmit = (data: any) => {
    doCreateChantier(data as Chantier);
  };

  const onReset = () => reset();

  return (
    <Stack spacing={2}>
      <Typography variant="h2">Créer un chantier</Typography>

      {isSuccess && <Alert severity="success">Chantier créé !</Alert>}

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
          <Box>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                  Créer
                </Button>
                <Button disabled={isLoading} onClick={onReset} variant={'outlined'}>
                  Réinitialiser
                </Button>
              </>
            )}
          </Box>
        </Box>
      </form>
    </Stack>
  );
}

export default CreateChantierForm;
