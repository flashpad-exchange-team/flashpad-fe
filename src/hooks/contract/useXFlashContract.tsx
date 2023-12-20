import { writeContract } from '@wagmi/core';
import { abi as xFlashABI } from '@/resources/abis/XFlashToken.json';

export const useXFlashContractWrite = () => {
  return { writeContract, ABI: xFlashABI };
};
