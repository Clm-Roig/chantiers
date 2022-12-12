import axios from './axios';
import Chantier from '../models/Chantier';

const createChantier = async (data: Chantier): Promise<Number> => {
  try {
    const res = await axios.post('/chantiers', data);
    return res.status;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occured');
    }
  }
};

export default createChantier;
