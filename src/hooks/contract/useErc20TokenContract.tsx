import { abi as ERC20ABI } from '@/resources/abis/ERC20.json';
import { writeContract } from '@wagmi/core';

export const useERC20TokenContractWrite = () => {
  return { writeContract, ABI: ERC20ABI };
};
