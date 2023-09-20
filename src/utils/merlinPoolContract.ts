import { Address } from 'viem';
import { abi as MerlinPoolABI } from '@/resources/abis/MerlinPool.json';
import { publicClient, walletClient } from './web3Clients';
import { handleError } from './handleError';

export const read = async (
  address: Address,
  functionName: string,
  args: any[]
) => {
  try {
    const result = await publicClient.readContract({
      address,
      abi: MerlinPoolABI,
      functionName,
      args,
    });
    return result;
  } catch (err: any) {
    handleError(err);
    return undefined;
  }
};

export const write = async (
  account: Address,
  address: Address,
  functionName: string,
  args: any[],
  value?: string,
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      account,
      address,
      abi: MerlinPoolABI,
      functionName,
      args,
      value,
    });
    const hash = await walletClient.writeContract(request);
    return { hash, result };
  } catch (err: any) {
    handleError(err);
    return undefined;
  }
};
