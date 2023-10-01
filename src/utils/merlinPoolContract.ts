import { Address } from 'viem';
import { abi as MerlinPoolABI } from '@/resources/abis/MerlinPool.json';
import { publicClient, walletClient } from './web3Clients';
import { handleError } from './handleError';

export const read = async (
  address: Address,
  functionName: string,
  args: any[]
) => {
  try {
    const result = await publicClient.readContract({
      address,
      abi: MerlinPoolABI,
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
  value?: string,
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      account,
      address,
      abi: MerlinPoolABI,
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

const pendingRewardsResultKeys = [
  'pending1',
  'pending2',
]

const functionResultKeysMap: { [k: string]: string[] } = {
  'rewardsToken1': rewardsTokenResultKeys,
  'rewardsToken2': rewardsTokenResultKeys,
  'pendingRewards': pendingRewardsResultKeys,
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
