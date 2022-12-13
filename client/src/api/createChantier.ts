import api, { getErrorMessage } from './axios';
import Chantier from '../models/Chantier';
import { AxiosError } from 'axios';

/**
 * @param {Chantier} data
 * @returns {string} a success message
 * @throws {Error}
 */
const createChantier = async (data: Chantier): Promise<string> => {
  try {
    await api.post('/chantiers', data);
    return 'Chantier créé';
  } catch (error) {
    throw new Error(getErrorMessage(error as AxiosError | Error));
  }
};

export default createChantier;
