import { Address } from 'viem';
import { abi as MerlinPoolFactoryABI } from '@/resources/abis/MerlinPoolFactory.json';
import { publicClient, walletClient } from './web3Clients';
import { handleError } from './handleError';
import { MERLIN_POOL_FACTORY_ADDRESS } from './constants';

export interface MerlinPoolSettings {
  startTime: string;
  endTime: string;
  harvestStartTime?: string;
  depositEndTime?: string;
  lockDurationReq?: string;
  lockEndReq?: string;
  depositAmountReq?: string;
  whitelist?: boolean;
  description: string;
}

export const read = async (
  address: Address,
  functionName: string,
  args: any[]
) => {
  try {
    const result = await publicClient.readContract({
      address,
      abi: MerlinPoolFactoryABI,
      functionName,
      args,
    });
    return result;
  } catch (err: any) {
    handleError(err);
    return undefined;
  }
};

export const write = async (
  account: Address,
  address: Address,
  functionName: string,
  args: any[],
  value?: string,
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      account,
      address,
      abi: MerlinPoolFactoryABI,
      functionName,
      args,
      value,
    });
    const hash = await walletClient.writeContract(request);
    return { hash, result };
  } catch (err: any) {
    handleError(err);
    return undefined;
  }
};

export interface ICreateMerlinPoolParams {
  nftPoolAddress: Address;
  rewardsToken1: Address;
  rewardsToken2: Address;
  settings: MerlinPoolSettings;
}

export const createMerlinPool = async (
  account: Address,
  params: ICreateMerlinPoolParams,
) => {
  console.log({params})
  const { nftPoolAddress, rewardsToken1, rewardsToken2, settings } = params;
  try {
    const { request, result } = await publicClient.simulateContract({
      address: MERLIN_POOL_FACTORY_ADDRESS as Address,
      abi: MerlinPoolFactoryABI,
      functionName: 'createMerlinPool',
      args: [
        nftPoolAddress,
        rewardsToken1,
        rewardsToken2,
        settings,
      ],
      account,
    });
    const hash = await walletClient.writeContract(request);

    return { hash, result };
  } catch (err: any) {
    handleError(err);
    return undefined;
  }
};
