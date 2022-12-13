import { Box, Card, CardContent, Divider, Typography, Container } from '@mui/material';
import ChantierTable from './components/ChantierTable';
import CreateChantierForm from './components/CreateChantierForm';
import { useState } from 'react';
import Chantier from './models/Chantier';
function App() {
  const [selectedChantier, setSelectedChantier] = useState<Chantier | undefined>();
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
            <ChantierTable
              selectedChantier={selectedChantier}
              setSelectedChantier={setSelectedChantier}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default App;
