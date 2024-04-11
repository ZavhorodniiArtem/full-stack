import axios from 'axios';

const URL = 'http://localhost:3000/api';

const httpClient = axios.create({
  baseURL: URL,
  timeout: 300000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': URL,
  },
});

export default httpClient;
