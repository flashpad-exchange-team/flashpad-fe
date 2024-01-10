import { Address } from 'viem';
import { abi as ThunderPoolABI } from '@/resources/abis/ThunderPool.json';
import { publicClient, walletClient } from '../web3Clients';
import { handleError } from '../handleError';

export interface IThunderPoolSettings {
  startTime: BigInt;
  endTime: BigInt;
  harvestStartTime?: BigInt;
  depositEndTime?: BigInt;
  lockDurationReq?: BigInt;
  lockEndReq?: BigInt;
  depositAmountReq?: BigInt;
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
      abi: ThunderPoolABI,
      functionName,
      args,
    });
    return mapResultArrayToObj(functionName, result);
  } catch (err: any) {
    console.log(err);
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
      abi: ThunderPoolABI,
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

const rewardsTokenResultKeys = [
  'token',
  'amount',
  'remainingAmount',
  'accRewardsPerShare',
];

const pendingRewardsResultKeys = ['pending1', 'pending2'];

const settingsResultKeys = [
  'startTime',
  'endTime',
  'harvestStartTime',
  'depositEndTime',
  'lockDurationReq',
  'lockEndReq',
  'depositAmountReq',
  'whitelist',
  'description',
];

const userInfoResultKeys = [
  'totalDepositAmount',
  'rewardDebtToken1',
  'rewardDebtToken2',
  'pendingRewardsToken1',
  'pendingRewardsToken2',
];

const functionResultKeysMap: { [k: string]: string[] } = {
  rewardsToken1: rewardsTokenResultKeys,
  rewardsToken2: rewardsTokenResultKeys,
  pendingRewards: pendingRewardsResultKeys,
  settings: settingsResultKeys,
  userInfo: userInfoResultKeys,
};

const mapResultArrayToObj = (functionName: string, result: any) => {
  const props = functionResultKeysMap[functionName];
  if (!props) return result;
  const resObj: { [k: string]: any } = {};
  props.forEach((prop, i) => {
    resObj[prop] = result[i];
  });
  return resObj;
};
