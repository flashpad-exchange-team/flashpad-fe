import { writeContract } from '@wagmi/core';
import { abi as FlashpadPairABI } from '@/resources/abis/FlashpadPair.json';

export const usePairContractWrite = () => {
  return { writeContract, ABI: FlashpadPairABI };
};
