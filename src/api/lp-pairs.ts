import axios from './axiosInstance';

export const getAllPairsDataForPosition = async (userAddress = '') => {
  try {
    const { data } = await axios.get('/lp-pairs/positions', {
      params: {
        userAddress,
      },
    });
    return data;
  } catch (error) {
    console.error('Error getAllPairsDataForPositionAPI:', error);
  }
};

export const getAllPairsDataForAllPool = async (userAddress = '') => {
  try {
    const { data } = await axios.get('/lp-pairs/all-pools', {
      params: {
        userAddress,
      },
    });
    return data;
  } catch (error) {
    console.error('Error getAllPairsDataForPositionAPI:', error);
  }
};

export const getAllPoolsInfo = async () => {
  try {
    const { data } = await axios.get('/lp-pairs/all-pools-info');
    return data;
  } catch (error) {
    console.error('Error getAllPoolsInfo:', error);
  }
};
