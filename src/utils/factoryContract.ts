import { Address, getContract } from 'viem'
import { abi as ArthurFactoryABI } from '@/resources/abis/ArthurFactory.json';
import { publicClient, walletClient } from './web3Clients';
import {
  // ARTHUR_FACTORY_ADDRESS_LINEA_TESTNET,
  ARTHUR_FACTORY_ADDRESS_MUMBAI
} from './constants';

const factoryContract: any = getContract({
  address: ARTHUR_FACTORY_ADDRESS_MUMBAI as Address,
  abi: ArthurFactoryABI,
  publicClient,
  walletClient,
});

export const getPair = async (
  token1Address: string,
  token2Address: string,
) => {
  try {
    const pairAddress = await factoryContract.read.getPair!([
      token1Address,
      token2Address,
    ]);

    return pairAddress as string;
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
}

export const getPairByIndex = async (index: number) => {
  try {
    const pairAddress = await factoryContract.read.allPairs!([index]);

    return pairAddress as any;
  } catch (err: any) {
    console.log('getPairByIndex err:', err);
    return undefined;
  }
}

export const allPairsLength = async () => {
  try {
    const length = await factoryContract.read.allPairsLength!([]);

    return Number(length);
  } catch (err: any) {
    console.log(err);
    return 0;
  }
}