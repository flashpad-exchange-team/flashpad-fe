import { writeContract } from '@wagmi/core';
import { abi as xARTABI } from '@/resources/abis/XArtToken.json';

export const useXARTContractWrite = () => {
  return { writeContract, ABI: xARTABI };
};
