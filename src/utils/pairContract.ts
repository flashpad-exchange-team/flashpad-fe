import { abi as ArthurPairABI } from '@/resources/abis/ArthurPair.json';
import { publicClient } from './web3Clients';
import { Address } from 'viem';
// import { toast } from 'react-toastify';

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
    console.log(err.message || err);
    return undefined;
  }
};
