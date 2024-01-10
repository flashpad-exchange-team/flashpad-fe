import { abi as ERC20ABI } from '@/resources/abis/ERC20.json';
import { publicClient, walletClient } from '../web3Clients';
import { Address } from 'viem';
import { handleError } from '../handleError';

export const erc20Read = async (
  address: Address,
  functionName: string,
  args: any[]
) => {
  try {
    const result = await publicClient.readContract({
      address,
      abi: ERC20ABI,
      functionName,
      args,
    });
    return result;
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
};

export const erc20Write = async (
  account: Address,
  address: Address,
  functionName: string,
  args: any[]
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      account,
      address,
      abi: ERC20ABI,
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
