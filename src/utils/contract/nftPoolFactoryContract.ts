import { Address, getContract } from 'viem';
import { abi as NFTPoolFactoryABI } from '@/resources/abis/NFTPoolFactory.json';
import { publicClient, walletClient } from '../web3Clients';
import {
  NFT_POOL_FACTORY_ADDRESS
} from '../constants';
import { handleError } from '../handleError';

const nftPoolFactoryContract: any = getContract({
  address: NFT_POOL_FACTORY_ADDRESS as Address,
  abi: NFTPoolFactoryABI,
  publicClient,
});

export const poolsLength = async () => {
  try {
    const poolsLength = await nftPoolFactoryContract.read.poolsLength!([]);

    return Number(poolsLength);
  } catch (err: any) {
    console.log(err);
    return 0;
  }
};

export const getPoolByIndex = async (index: number) => {
  try {
    const poolAddress = await nftPoolFactoryContract.read.pools!([index]);

    return poolAddress as Address;
  } catch (err: any) {
    console.log('getPoolByIndex err:', err);
    return undefined;
  }
};

export const getPool = async (lpTokenAddress: string) => {
  try {
    const poolAddress = await nftPoolFactoryContract.read.getPool!([
      lpTokenAddress,
    ]);

    return poolAddress as Address;
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
};

export interface ICreatePoolParams {
  lpTokenAddress: Address;
}

export const createPool = async (
  account: Address,
  params: ICreatePoolParams,
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: NFT_POOL_FACTORY_ADDRESS as Address,
      abi: NFTPoolFactoryABI,
      functionName: 'createPool',
      args: Object.values(params),
      account,
    });
    const hash = await walletClient.writeContract(request);

    return { hash, result };
  } catch (err: any) {
    handleError(err);
    return undefined;
  }
};
