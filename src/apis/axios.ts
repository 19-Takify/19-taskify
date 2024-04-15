import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/2-9/',
});
export default instance;
