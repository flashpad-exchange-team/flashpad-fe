import { getContract } from 'viem'
import { abi as RouterABI } from '@/resources/abis/ArthurRouter.json';
import { publicClient, walletClient } from './web3Clients';

const routerContract = getContract({
  address: process.env.ARTHUR_ROUTER_ADDRESS as `0x${string}` || '0x9F423958b0e02d6C60D1714a37bc627C23C7d048',
  abi: RouterABI,
  publicClient,
  walletClient,
});

const erc20Token = '0x49084243271e63D087FDfEF94338F070102C940C';
const wethToken = '0x451a32Fe376a699Ea25b6Cafc00E446ECC8452A9';

export const addLiquidity = async (
  tokenA: string,
  tokenB: string,
  amountADesired: string,
  amountBDesired: string,
  amountAMin: string,
  amountBMin: string,
  to: string,
  deadline: string,
  timeLock: string,
) => {
  const { request } = await routerContract.simulate.addLiquidity!([
    tokenA,
    tokenB,
    amountADesired,
    amountBDesired,
    amountAMin,
    amountBMin,
    to,
    deadline,
    timeLock
  ]);

  const hash = await routerContract.write.addLiquidity!(request.args as any);
  
}

export const getPair = async (
  token1: string,
  token2: string,
) => {
  const { request } = await routerContract.simulate.getPair!([
    erc20Token,
    wethToken,
  ]);

  const result = await routerContract.read.getPair!([
    erc20Token,
    wethToken,
  ]);

  console.log({request});
  console.log({result});
}
