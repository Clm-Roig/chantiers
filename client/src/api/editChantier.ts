import api, { getErrorMessage } from './axios';
import Chantier from '../models/Chantier';
import { AxiosError } from 'axios';

const editChantier = async (data: Chantier): Promise<string> => {
  try {
    await api.put(`/chantiers/${data._id}`, data);
    return 'Chantier édité';
  } catch (error) {
    throw new Error(getErrorMessage(error as AxiosError | Error));
  }
};

export default editChantier;
