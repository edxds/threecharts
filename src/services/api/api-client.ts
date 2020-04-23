import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});
