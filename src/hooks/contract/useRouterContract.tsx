import { writeContract } from '@wagmi/core';
import { abi as RouterABI } from '@/resources/abis/FlashpadRouter.json';
import { publicClient } from '@/utils/web3Clients';

export const useRouterContractWrite = () => {
  const simulatedWriteContract = async (params: any) => {
    const { result } = await publicClient.simulateContract(params);
    const { hash } = await writeContract(params);
    return { hash, result };
  }
  return { writeContract: simulatedWriteContract, ABI: RouterABI };
};
