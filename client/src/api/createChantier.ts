import api, { getErrorMessage } from './axios';
import Chantier from '../models/Chantier';
import { AxiosError } from 'axios';

const createChantier = async (data: Chantier): Promise<string> => {
  try {
    await api.post('/chantiers', data);
    return `Chantier "${data.name}" créé`;
  } catch (error) {
    throw new Error(getErrorMessage(error as AxiosError | Error));
  }
};

export default createChantier;
