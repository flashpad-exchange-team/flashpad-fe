import { abi as ERC20ABI } from '@/resources/abis/ERC20.json';
import { publicClient, walletClient } from './web3Clients';

// export const getERC20TokenContract = (address: string) => {
//   return getContract({
//     address: address as `0x${string}`,
//     abi: ERC20ABI,
//     publicClient,
//     walletClient,
//   });
// }

export const erc20Read = async (
  address: `0x${string}`,
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
    console.log(err.message || err);
    return undefined;
  }
};

export const erc20Write = async (
  account: `0x${string}`,
  address: `0x${string}`,
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
    console.log(err.message || err);
    return undefined;
  }
};
