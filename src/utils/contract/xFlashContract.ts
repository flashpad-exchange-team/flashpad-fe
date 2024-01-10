import { abi as xFlashABI } from '@/resources/abis/XFlashToken.json';
import { publicClient, walletClient } from '../web3Clients';
import { Address } from 'viem';
import { handleError } from '../handleError';

export const read = async (
  address: Address,
  functionName: string,
  args: any[]
) => {
  try {
    const result = await publicClient.readContract({
      address,
      abi: xFlashABI,
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
  args: any[]
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      account,
      address,
      abi: xFlashABI,
      functionName,
      args,
    });
    const hash = await walletClient.writeContract(request);
    return { hash, result };
  } catch (err: any) {
    handleError(err);
    return undefined;
  }
};
