import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://172.17.178.1:8000/api/v1/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
});
