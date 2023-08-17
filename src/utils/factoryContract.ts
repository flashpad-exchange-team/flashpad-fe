import { getContract } from 'viem'
import { abi as ArthurFactoryABI } from '@/resources/abis/ArthurFactory.json';
import { publicClient, walletClient } from './web3Clients';

const factoryContract = getContract({
  address: process.env.ARTHUR_FACTORY_ADDRESS_LINEA_TESTNET as `0x${string}` || '0xAEa8dd2bA90de46170C5ABBbBE5A187acddF21E8',
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
    console.log(err.message || err);
  }
}