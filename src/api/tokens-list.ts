import axios from './axiosInstance';

export const getTokensList = async () => {
  try {
    const { data } = await axios.get('/erc20');
    return data;
  } catch (error) {
    console.error('Error erc20:', error);
  }
};
