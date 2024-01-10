import { Address, getContract } from 'viem';
import { abi as FlashpadFactoryABI } from '@/resources/abis/FlashpadFactory.json';
import { publicClient, walletClient } from '../web3Clients';
import {
  FLASHPAD_FACTORY_ADDRESS,
} from '../constants';

const factoryContract: any = getContract({
  address: FLASHPAD_FACTORY_ADDRESS as Address,
  abi: FlashpadFactoryABI,
  publicClient,
  walletClient,
});

export const getPair = async (token1Address: string, token2Address: string) => {
  try {
    const pairAddress = await factoryContract.read.getPair!([
      token1Address,
      token2Address,
    ]);

    return pairAddress as Address;
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
};

export const getPairByIndex = async (index: number) => {
  try {
    const pairAddress = await factoryContract.read.allPairs!([index]);

    return pairAddress as any;
  } catch (err: any) {
    console.log('getPairByIndex err:', err);
    return undefined;
  }
};

export const allPairsLength = async () => {
  try {
    const length = await factoryContract.read.allPairsLength!([]);

    return Number(length);
  } catch (err: any) {
    console.log(err);
    return 0;
  }
};
