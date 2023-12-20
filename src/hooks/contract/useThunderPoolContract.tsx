import { writeContract } from '@wagmi/core';
import { abi as ThunderPoolABI } from '@/resources/abis/ThunderPool.json';

export const useThunderPoolContractWrite = () => {
  return { writeContract, ABI: ThunderPoolABI };
};
