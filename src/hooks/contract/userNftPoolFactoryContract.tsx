import { writeContract } from '@wagmi/core';
import { abi as NFTPoolFactoryABI } from '@/resources/abis/NFTPoolFactory.json';

export const userNftPoolFactoryContractWrite = () => {
  return { writeContract, ABI: NFTPoolFactoryABI };
};
