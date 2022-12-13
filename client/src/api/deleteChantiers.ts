import api, { getErrorMessage } from './axios';
import Chantier from '../models/Chantier';
import { AxiosError } from 'axios';

const deleteChantier = async (chantier: Chantier): Promise<string> => {
  try {
    await api.delete(`/chantiers/${chantier._id}`);
    return `Chantier "${chantier.name}" supprimé`;
  } catch (error) {
    throw new Error(getErrorMessage(error as AxiosError | Error));
  }
};

export default deleteChantier;
