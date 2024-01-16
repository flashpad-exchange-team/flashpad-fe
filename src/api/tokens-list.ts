import axios from './axiosInstance';

export interface TokenPostData {
  decimals: number;
  name: string;
  symbol: string;
  address: string;
}

export const getTokensList = async () => {
  try {
    const { data } = await axios.get('/erc20',
    );
    return data;
  } catch (error) {
    console.error('Error erc20:', error);
  }
};
export const importToken = async (tokenData: TokenPostData) => {
  try {
    const { data } = await axios.post('/erc20',
      { ...tokenData }
    );
    return data;
  } catch (error) {
    console.error('Error erc20:', error);
  }
};
