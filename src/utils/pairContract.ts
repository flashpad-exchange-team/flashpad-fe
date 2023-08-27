import { abi as ArthurPairABI } from '@/resources/abis/ArthurPair.json';
import { publicClient } from './web3Clients';
import { Address } from 'viem';
import customToast from '@/components/notification/customToast';

export const read = async (
  address: Address,
  functionName: string,
  args: any[]
) => {
  try {
    const result = await publicClient.readContract({
      address,
      abi: ArthurPairABI,
      functionName,
      args,
    });
    return result;
  } catch (err: any) {
    customToast({
      message: err.message || err,
      type: 'error',
    });
    console.log(err);
    return undefined;
  }
};
