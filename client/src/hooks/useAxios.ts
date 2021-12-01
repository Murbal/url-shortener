import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const apiAxios = axios.create({ baseURL: '/api' });

export const useApiAxios = makeUseAxios({ axios: apiAxios });
