import axios, { isAxiosError } from 'axios';
const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-19/',
});
export { instance, isAxiosError };
