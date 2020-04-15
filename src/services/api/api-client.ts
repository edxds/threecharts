import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://192.168.1.165:5000/api',
});
