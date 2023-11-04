import { writeContract } from '@wagmi/core';
import { abi as MerlinPoolABI } from '@/resources/abis/MerlinPool.json';

export const useMerlinPoolContractWrite = () => {
  return { writeContract, ABI: MerlinPoolABI };
};
