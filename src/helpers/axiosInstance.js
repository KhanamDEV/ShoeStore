import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.246.65:8000/api/v1/',
  timeout: 1000,
});
