import { Address } from 'viem';
import axios from './axiosInstance';

export const getMerlinPoolInfo = (address: string) => {
  return axios.get('/merlin-pool/info/' + address);
};

export const getAllMerlinPoolsData = async (
  userAddress: Address | undefined
) => {
  try {
    const { data } = await axios.get('/merlin-pool', {
      params: {
        userAddress,
      },
    });
    return data;
  } catch (error) {
    console.error('Error getAllMerlinPoolsDataAPI:', error);
  }
};
