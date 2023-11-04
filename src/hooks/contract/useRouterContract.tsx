import { writeContract } from '@wagmi/core';
import { abi as RouterABI } from '@/resources/abis/ArthurRouter.json';

export const useRouterContractWrite = () => {
  return { writeContract, ABI: RouterABI };
};
