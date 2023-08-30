import { abi as ArthurPairABI } from '@/resources/abis/ArthurPair.json';
import { publicClient, walletClient } from './web3Clients';
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
      abi: ArthurPairABI,
      functionName,
      args,
    });
    const hash = await walletClient.writeContract(request);
    return { hash, result };
  } catch (err: any) {
    console.log(err);
    customToast({
      message: err.message || err,
      type: 'error',
    });
    return undefined;
  }
};
