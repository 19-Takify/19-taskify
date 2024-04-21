import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-19/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjk5MiwidGVhbUlkIjoiNC0xOSIsImlhdCI6MTcxMzYwNDc4OCwiaXNzIjoic3AtdGFza2lmeSJ9.C_9YGNBlt7urk1ZNlVqL6KCuFlWozrrAd6rz0Q0YM8M`,
  },
});
export default instance;
