import { Address, getContract } from 'viem';
import { abi as RouterABI } from '@/resources/abis/ArthurRouter.json';
import { publicClient, walletClient } from './web3Clients';
import {
  // ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET, 
  ARTHUR_ROUTER_ADDRESS_MUMBAI
} from './constants';
import BigNumber from 'bignumber.js';
import customToast from '@/components/notification/customToast';

const routerContract: any = getContract({
  address: ARTHUR_ROUTER_ADDRESS_MUMBAI as Address,
  abi: RouterABI,
  publicClient,
  walletClient,
});

// const LINEA_TESTNET_TOKENS = {
//   ERC20: '0x49084243271e63D087FDfEF94338F070102C940C',
//   WETH: '0x451a32Fe376a699Ea25b6Cafc00E446ECC8452A9',
// };

// const SEPOLIA_TOKENS = {
//   WETH: '0xc82f14458f68f076A4f2E756dB24B56A3C670bB4',
//   ERC20: '0x764EcF27DF3df771D1c79f48A05aB18d2b6BBa10',
// };

export interface IAddLiquidityParams {
  tokenA: string;
  tokenB: string;
  amountADesired: string;
  amountBDesired: string;
  amountAMin: string;
  amountBMin: string;
  to: Address;
  deadline: string;
  timeLock: string;
};

export interface IAddLiquidityETHParams {
  token: string;
  amountTokenDesired: string;
  amountTokenMin: string;
  amountETHMin: string;
  to: string;
  deadline: string;
  timeLock: string;
};

export const addLiquidity = async (
  account: Address,
  params: IAddLiquidityParams,
) => {
  console.log({ params })
  try {
    const { request, result } = await publicClient.simulateContract({
      address: ARTHUR_ROUTER_ADDRESS_MUMBAI as Address,
      abi: RouterABI,
      functionName: 'addLiquidity',
      args: Object.values(params),
      account
    });
    const hash = await walletClient.writeContract(request);

    return { hash, result };
  } catch (err: any) {
    console.log(err);
    customToast({
      message: err.message || err,
      type: 'error',
    });
    return undefined;
  }
};

export const addLiquidityETH = async (
  account: Address,
  params: IAddLiquidityETHParams,
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: ARTHUR_ROUTER_ADDRESS_MUMBAI as Address,
      abi: RouterABI,
      functionName: 'addLiquidityETH',
      args: Object.values(params),
      account
    });
    const hash = await walletClient.writeContract(request);

    return { hash, result };
  } catch (err: any) {
    console.log(err);
    customToast({
      message: err.message || err,
      type: 'error',
    });
    return undefined;
  }
};

export const getPair = async (
  token1Address: string,
  token2Address: string,
) => {
  try {
    const pairAddress = await routerContract.read.getPair!([
      token1Address,
      token2Address,
    ]);

    return pairAddress as Address;
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
}

/**
 * Get amounts out
 * @param amountIn amount sent in to be swapped
 * @param path array of ERC20 token addresses
 */
export const getAmountsOut = async (amountIn: string, path: string[], token1Decimal: number, token2Decimal: number) => {
  try {
    console.log({ amountIn, path, token1Decimal, token2Decimal })

    const result = await routerContract.read.getAmountsOut!([1, path]);
    const amountToken1 = (BigNumber(result[result.length - 1]).times(BigNumber(10)
      .pow(token1Decimal))).toNumber()
    const amountToken2 = (BigNumber(result[0]).times(BigNumber(10)
      .pow(token2Decimal))).toNumber()

    return amountToken1 / amountToken2;
  } catch (err: any) {
    console.log(err);
    return 0;
  }
};

export const quote = async (amountA: string, reserveA: string, reserveB: string) => {
  try {
    const result = await routerContract.read.quote!([amountA, reserveA, reserveB]);
    return BigNumber(result + '');
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
};

export interface ISwapTokensForTokensParams {
  amountIn: string;
  amountOutMin: string;
  path: any[];
  to: Address;
  referrer: Address;
  deadline: string;
}

export const swapTokensForTokens = async (
  account: Address,
  params: ISwapTokensForTokensParams,
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: ARTHUR_ROUTER_ADDRESS_MUMBAI as Address,
      abi: RouterABI,
      functionName: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      args: Object.values(params),
      account
    });
    const hash = await walletClient.writeContract(request);

    return { hash, result };
  } catch (err: any) {
    customToast({
      message: err.message || err,
      type: 'error',
    });
    return undefined;
  }
};


export const swapTokensForETH = async (
  account: Address,
  params: ISwapTokensForTokensParams,
) => {
  console.log({ params })
  try {
    const { request, result } = await publicClient.simulateContract({
      address: ARTHUR_ROUTER_ADDRESS_MUMBAI as Address,
      abi: RouterABI,
      functionName: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
      args: Object.values(params),
      account
    });
    const hash = await walletClient.writeContract(request);

    return { hash, result };
  } catch (err: any) {
    customToast({
      message: err.message || err,
      type: 'error',
    });
    return undefined;
  }
};