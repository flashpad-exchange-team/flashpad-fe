import axios from './axiosInstance';

export const getNftPoolData = async () => {
  try {
    const { data } = await axios.get('/nft-pool');
    return data;
  } catch (error) {
    console.error('Error getNftPoolDataAPI:', error);
  }
};
