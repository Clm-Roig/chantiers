import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';
import { url } from './config/db.config';

const app = express();

// ========== APP config
const corsOptions = {
  origin: 'http://localhost:8081'
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// ========== DB connection
db.connect(url, {
  serverSelectionTimeoutMS: 2000 // Wait only 2s before crashing
})
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

// ========== ROUTES
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to chantiers application.' });
});

// ========== RUN SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
