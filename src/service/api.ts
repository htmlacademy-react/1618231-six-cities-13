import axios, {AxiosInstance} from 'axios';
import { REQUEST_TIMEOUT, BACKEND_URL } from '../components/const';

export const createAPI = () : AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  return api;
};
