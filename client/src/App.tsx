import { Box, Card, CardContent, Typography, Container } from '@mui/material';
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
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default App;
