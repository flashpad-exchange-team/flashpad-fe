import axios from 'axios';
import { FLASHPAD_API_URL } from '@/utils/constants';

export const fetchTotalVolumeByLpAPI = async (params: {
  lpAddress: string;
  last24h: boolean;
}) => {
  const { lpAddress, last24h } = params;
  const url = `${FLASHPAD_API_URL}/total-volume/lp?address=${lpAddress}&last24h=${last24h}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetchTotalVolumeByLpAPI:', error);
  }
};

export const fetchAllPairsAPI = async () => {
  const url = `${FLASHPAD_API_URL}/lp-pairs`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetchTotalVolumeByLpAPI:', error);
  }
};

export const fetchPairByAddressAPI = async (params: {
  pairAddress: string;
}) => {
  const url = `${FLASHPAD_API_URL}/lp-pairs?address=${params.pairAddress}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetchTotalVolumeByLpAPI:', error);
  }
};
