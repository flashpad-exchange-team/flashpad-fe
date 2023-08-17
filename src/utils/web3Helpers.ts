import { GetBlockParameters } from 'viem';
import { publicClient } from './web3Clients';

export const getBlock = async (params?: GetBlockParameters) => {
  return await publicClient.getBlock(params);
};
