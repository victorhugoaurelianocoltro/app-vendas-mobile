import axios, { AxiosHeaders } from 'axios';
import { Platform } from 'react-native';

// Emulador Android usa 10.0.2.2 para localhost
const LOCALHOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const BASE_URL = `http://${LOCALHOST}:3000/api`;

export const api = axios.create({ baseURL: BASE_URL, timeout: 8000 });

export function withAuth(token: string | null) {
  const instance = axios.create({ baseURL: BASE_URL, timeout: 8000 });
  instance.interceptors.request.use((config) => {
    if (token) {
      const headers = (config.headers instanceof AxiosHeaders)
        ? config.headers
        : new AxiosHeaders(config.headers as any);
      headers.set('Authorization', `Bearer ${token}`);
      config.headers = headers;
    }
    return config;
  });
  return instance;
}
