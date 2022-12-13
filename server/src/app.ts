import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';
import chantiersRoutes from './routes/chantiers';
import { url } from './config/db.config';

const app = express();

// ========== APP config
const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  exposedHeaders: '*'
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Simulate slow traffic
app.use(function (req, res, next) {
  setTimeout(next, 1000);
});

// ========== ROUTES
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to chantiers application.' });
});
app.use('/api/chantiers', chantiersRoutes);

// ========== DB connection
db.connect(url, {
  serverSelectionTimeoutMS: 2000 // Wait only 2s before crashing
})
  .then(() => {
    console.log('Connected to the database!');
    // ========== RUN SERVER
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });
