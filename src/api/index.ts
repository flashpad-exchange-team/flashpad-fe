import axios from 'axios';
import { ARTHUR_API_URL } from '@/utils/constants';

export const fetchTotalVolumeByLp = async (params: {
  lpAddress: string;
  last24h: boolean;
}) => {
  const { lpAddress, last24h } = params;
  const url = `${ARTHUR_API_URL}/total-volume/lp?address=${lpAddress}&last24h=${last24h}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': '"Origin, X-Requested-With, Content-Type, Accept"'
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetchTotalVolumeByLp:', error);
  }
};
