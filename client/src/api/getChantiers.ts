import api, { getErrorMessage } from './axios';
import Chantier from '../models/Chantier';
import { AxiosError } from 'axios';

export interface PaginateParameters {
  page: number;
  limit: number;
}

const getChantiers = async (params: PaginateParameters): Promise<Chantier[]> => {
  try {
    const res = await api.get('/chantiers', { data: params });
    return res.data.chantiers as Chantier[];
  } catch (error) {
    throw new Error(getErrorMessage(error as AxiosError | Error));
  }
};

export default getChantiers;
