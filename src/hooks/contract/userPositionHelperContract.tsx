import { writeContract } from '@wagmi/core';
import { abi as PositionHelperABI } from '@/resources/abis/PositionHelper.json';

export const usePositionHelperContractWrite = () => {
  return { writeContract, ABI: PositionHelperABI };
};
