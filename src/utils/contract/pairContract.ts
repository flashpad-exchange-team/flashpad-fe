import { abi as FlashpadPairABI } from '@/resources/abis/FlashpadPair.json';
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
      abi: FlashpadPairABI,
      functionName,
      args,
    });
    return result;
  } catch (err: any) {
    console.log(err,);
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
      abi: FlashpadPairABI,
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
