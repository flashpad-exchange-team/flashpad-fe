import { writeContract } from '@wagmi/core';
import { abi as MerlinPoolFactoryABI } from '@/resources/abis/MerlinPoolFactory.json';

export const useMerlinPoolFactoryContractWrite = () => {
  return { writeContract, ABI: MerlinPoolFactoryABI };
};
