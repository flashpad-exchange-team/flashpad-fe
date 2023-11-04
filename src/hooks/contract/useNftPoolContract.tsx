import { writeContract } from '@wagmi/core';
import { abi as NFTPoolABI } from '@/resources/abis/NFTPool.json';

export const useNftPoolContractWrite = () => {
  return { writeContract, ABI: NFTPoolABI };
};
