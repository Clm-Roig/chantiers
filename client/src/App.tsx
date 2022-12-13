import { Box, Card, CardContent, Divider, Typography, Container } from '@mui/material';
import ChantierTable from './components/ChantierTable';
import CreateChantierForm from './components/CreateChantierForm';
function App() {
  return (
    <Container>
      <Box m={2}>
        <Typography variant="h1" textAlign="center" py={2}>
          MES CHANTIERS
        </Typography>
        <Card>
          <CardContent>
            <CreateChantierForm />
            <Divider sx={{ my: 2 }} />
            <ChantierTable />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default App;
