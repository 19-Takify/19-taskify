import axios from '@/apis/axios';

export const getMe = async () => {
  const res = await axios.get('users/me');
  return res.data;
};
