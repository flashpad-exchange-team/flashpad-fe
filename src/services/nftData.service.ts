import axios from 'axios';
import { RESERVOIR_API_BASE_URL, RESERVOIR_API_KEY } from '@/utils/constants';

const headers = {
  Accept: '*/*',
  'x-api-key': RESERVOIR_API_KEY,
};

export const getNFTsOwnedByAddress = async (
  address: string,
  tokenContract: string
) => {
  const url = `${RESERVOIR_API_BASE_URL}/users/${address}/tokens/v7`;
  const queryParams = {
    // contract: '0xCcA56Fafb6019932Ef3F3f0D62eb0683Cc70EcF2',
    contract: tokenContract,
  };

  try {
    const response = await axios.get(url, {
      headers: headers,
      params: queryParams,
    });

    const tokens = response.data.tokens || [];
    return tokens.map((e: any) => e.token)
      .filter((e: any) => !!e);
  } catch (error) {
    console.log('Error getNFTsOwnedByAddress:', error);
    return [];
  }
};
