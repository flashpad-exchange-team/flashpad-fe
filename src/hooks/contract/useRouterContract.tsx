import { writeContract } from '@wagmi/core';
import { abi as RouterABI } from '@/resources/abis/FlashpadRouter.json';

export const useRouterContractWrite = () => {
  return { writeContract, ABI: RouterABI };
};
