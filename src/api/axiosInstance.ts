import axios from 'axios';
import { ARTHUR_API_URL } from '@/utils/constants';

const instance = axios.create({
  baseURL: ARTHUR_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
