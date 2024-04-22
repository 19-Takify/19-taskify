import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjk5MiwidGVhbUlkIjoiNC0xOSIsImlhdCI6MTcxMzYwNDc4OCwiaXNzIjoic3AtdGFza2lmeSJ9.C_9YGNBlt7urk1ZNlVqL6KCuFlWozrrAd6rz0Q0YM8M`,
  },
});
export default instance;
