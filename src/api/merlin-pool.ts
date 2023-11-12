import axios from './axiosInstance';

export const getMerlinPoolInfo = (address: string) => {
  return axios.get('/merlin-pool/info/' + address);
};
