import axios from 'axios';
import { FLASHPAD_API_URL } from '@/utils/constants';

const instance = axios.create({
  baseURL: FLASHPAD_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
