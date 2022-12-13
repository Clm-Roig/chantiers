import { Box, Card, CardContent, Typography, Container } from '@mui/material';
import Chantiers from './components/Chantiers';

function App() {
  return (
    <Container>
      <Box m={2}>
        <Typography variant="h1" textAlign="center" py={2}>
          MES CHANTIERS
        </Typography>
        <Card>
          <CardContent>
            <Chantiers />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default App;
