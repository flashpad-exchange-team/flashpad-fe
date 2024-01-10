import { Address } from 'viem';
import axios from './axiosInstance';

export const getThunderPoolInfo = (address: string) => {
  return axios.get('/thunder-pools/info/' + address);
};

export const getAllThunderPoolsData = async (
  userAddress: Address | undefined
) => {
  try {
    const { data } = await axios.get('/thunder-pools', {
      params: {
        userAddress,
      },
    });
    return data;
  } catch (error) {
    console.error('Error getAllThunderPoolsDataAPI:', error);
  }
};
