import { writeContract } from '@wagmi/core';
import { abi as ArthurPairABI } from '@/resources/abis/ArthurPair.json';

export const usePairContractWrite = () => {
  return { writeContract, ABI: ArthurPairABI };
};
