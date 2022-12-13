import api, { getErrorMessage } from './axios';
import Chantier from '../models/Chantier';
import { AxiosError } from 'axios';

/**
 * @param {Chantier['_id']} data
 * @returns {string} a success message
 * @throws {Error}
 */
const deleteChantier = async (chantierId: Chantier['_id']): Promise<string> => {
  try {
    await api.delete(`/chantiers/${chantierId}`);
    return 'Chantier supprimé';
  } catch (error) {
    throw new Error(getErrorMessage(error as AxiosError | Error));
  }
};

export default deleteChantier;
