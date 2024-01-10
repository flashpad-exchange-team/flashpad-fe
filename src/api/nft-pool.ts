import axios from './axiosInstance';

export const getNftPoolData = async () => {
  try {
    const { data } = await axios.get('/nft-pools');
    return data;
  } catch (error) {
    console.error('Error getNftPoolDataAPI:', error);
  }
};
