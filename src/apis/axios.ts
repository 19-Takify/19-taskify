import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TEMP_TOKEN = process.env.NEXT_PUBLIC_TEMP_TOKEN;

const instance = axios.create({

  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TEMP_TOKEN}`,
  },
});
export default instance;
