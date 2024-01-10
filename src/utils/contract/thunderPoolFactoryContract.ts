import { Address } from 'viem';
import { abi as ThunderPoolFactoryABI } from '@/resources/abis/ThunderPoolFactory.json';
import { publicClient, walletClient } from '../web3Clients';
import { handleError } from '../handleError';
import { THUNDER_POOL_FACTORY_ADDRESS } from '../constants';

export interface ThunderPoolSettingsParams {
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
      abi: ThunderPoolFactoryABI,
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
  value?: string
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      account,
      address,
      abi: ThunderPoolFactoryABI,
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

export interface ICreateThunderPoolParams {
  nftPoolAddress: Address;
  rewardsToken1: Address;
  rewardsToken2: Address;
  settings: ThunderPoolSettingsParams;
}

export const createThunderPool = async (
  account: Address,
  params: ICreateThunderPoolParams
) => {
  const { nftPoolAddress, rewardsToken1, rewardsToken2, settings } = params;
  try {
    const { request, result } = await publicClient.simulateContract({
      address: THUNDER_POOL_FACTORY_ADDRESS as Address,
      abi: ThunderPoolFactoryABI,
      functionName: 'createThunderPool',
      args: [nftPoolAddress, rewardsToken1, rewardsToken2, settings],
      account,
    });
    const hash = await walletClient.writeContract(request);

    return { hash, result };
  } catch (err: any) {
    handleError(err);
    return undefined;
  }
};
