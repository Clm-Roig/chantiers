import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import CreateChantierForm from './components/CreateChantierForm';
function App() {
  return (
    <div>
      <Card>
        <CardHeader title="Mes Chantiers" />
        <CardContent>
          <CreateChantierForm />
          <Divider />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
