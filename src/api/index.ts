import { ARTHUR_API_URL } from '@/utils/constants';

export const fetchTotalVolumeByLp = async (params: {
  lpAddress: string;
  last24h: boolean;
}) => {
  const { lpAddress, last24h } = params;
  const url = `${ARTHUR_API_URL}/total-volume/lp?address=${lpAddress}&last24h=${last24h}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetchTotalVolumeByLp:', error);
  }
};
