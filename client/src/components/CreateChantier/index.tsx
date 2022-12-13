import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChantierForm from '../common/ChantierForm';

interface Props {
  onCreateSuccess: () => void;
}
function CreateChantier({ onCreateSuccess }: Props) {
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Créer un chantier</Typography>
      <ChantierForm onSuccess={onCreateSuccess} />
    </Stack>
  );
}

export default CreateChantier;
