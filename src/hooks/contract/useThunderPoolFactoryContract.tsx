import { writeContract } from '@wagmi/core';
import { abi as ThunderPoolFactoryABI } from '@/resources/abis/ThunderPoolFactory.json';

export const useThunderPoolFactoryContractWrite = () => {
  return { writeContract, ABI: ThunderPoolFactoryABI };
};
