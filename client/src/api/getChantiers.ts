import api, { getErrorMessage } from './axios';
import Chantier from '../models/Chantier';
import { AxiosError } from 'axios';

export interface ChantiersAndTotal {
  chantiers: Chantier[];
  total: number;
}
export interface PaginateParameters {
  page: number;
  limit: number;
  sortBy: keyof Chantier;
  sortOrder: 'asc' | 'desc';
}

const getChantiers = async (params: PaginateParameters): Promise<ChantiersAndTotal> => {
  try {
    const res = await api.get('/chantiers', { params });
    const total = Number(res?.headers['x-total-count']);
    return { chantiers: res.data.chantiers as Chantier[], total };
  } catch (error) {
    throw new Error(getErrorMessage(error as AxiosError | Error));
  }
};

export default getChantiers;
