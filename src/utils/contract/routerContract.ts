import { abi as RouterABI } from '@/resources/abis/FlashpadRouter.json';
import BigNumber from 'bignumber.js';
import { Address, getContract } from 'viem';
import { FLASHPAD_ROUTER_ADDRESS } from '../constants';
import { handleError } from '../handleError';
import { publicClient, walletClient } from '../web3Clients';

const routerContract: any = getContract({
  address: FLASHPAD_ROUTER_ADDRESS as Address,
  abi: RouterABI,
  publicClient,
  walletClient,
});

export interface IAddLiquidityParams {
  tokenA: string;
  tokenB: string;
  amountADesired: string | BigNumber;
  amountBDesired: string | BigNumber;
  amountAMin: string | BigNumber;
  amountBMin: string | BigNumber;
  to: Address;
  deadline: string;
  timeLock: string;
  startTime: string;
}

export interface IAddLiquidityETHParams {
  token: string;
  amountTokenDesired: string;
  amountTokenMin: string;
  amountETHMin: string;
  to: string;
  deadline: string;
  timeLock: string;
  startTime: string;
}

export const addLiquidity = async (
  account: Address,
  params: IAddLiquidityParams
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: FLASHPAD_ROUTER_ADDRESS as Address,
      abi: RouterABI,
      functionName: 'addLiquidity',
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

export const addLiquidityETH = async (
  account: Address,
  params: IAddLiquidityETHParams
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: FLASHPAD_ROUTER_ADDRESS as Address,
      abi: RouterABI,
      functionName: 'addLiquidityETH',
      args: Object.values(params),
      account,
      value: params.amountETHMin,
    });
    const hash = await walletClient.writeContract(request);

    return { hash, result };
  } catch (err: any) {
    handleError(err);
    return undefined;
  }
};

export interface IRemoveLiquidityParams {
  tokenA: string;
  tokenB: string;
  liquidity: string;
  amountAMin: string;
  amountBMin: string;
  to: Address;
  deadline: string;
}

export const removeLiquidity = async (
  account: Address,
  params: IRemoveLiquidityParams
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: FLASHPAD_ROUTER_ADDRESS as Address,
      abi: RouterABI,
      functionName: 'removeLiquidity',
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

export interface IRemoveLiquidityETHParams {
  token: string;
  liquidity: string;
  amountTokenMin: string;
  amountETHMin: string;
  to: Address;
  deadline: string;
}

export const removeLiquidityETH = async (
  account: Address,
  params: IRemoveLiquidityETHParams
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: FLASHPAD_ROUTER_ADDRESS as Address,
      abi: RouterABI,
      functionName: 'removeLiquidityETH',
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

export const getPair = async (token1Address: string, token2Address: string) => {
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
};

/**
 * Get amounts out
 * @param amountIn amount sent in to be swapped
 * @param path array of ERC20 token addresses
 */
export const getAmountsOut = async (
  // amountIn: string,
  path: string[],
  token1Decimal: number,
  token2Decimal: number
) => {
  try {
    const result = await routerContract.read.getAmountsOut!([1, path]);
    const amountToken1 = BigNumber(result[result.length - 1])
      .times(BigNumber(10).pow(token1Decimal))
      .toNumber();
    const amountToken2 = BigNumber(result[0])
      .times(BigNumber(10).pow(token2Decimal))
      .toNumber();

    return amountToken1 / amountToken2;
  } catch (err: any) {
    console.log(err);
    return 0;
  }
};
export const getAmountsOutResult = async (
  amountIn: string,
  path: string[],
  token1Decimal: number,
  token2Decimal: number
) => {
  try {
    const result = await routerContract.read.getAmountsOut!([amountIn, path]);
    const amountToken1 = BigNumber(result[result.length - 1])
      .times(BigNumber(10).pow(token1Decimal))
      .toNumber();
    const amountToken2 = BigNumber(result[0])
      .times(BigNumber(10).pow(token2Decimal))
      .toNumber();

    return BigNumber(amountToken1 / amountToken2).toFixed(
      0,
      BigNumber.ROUND_DOWN
    );
  } catch (err: any) {
    console.log(err);
    return 0;
  }
};

export const quote = async (
  amountA: string,
  reserveA: string,
  reserveB: string
) => {
  try {
    const result = await routerContract.read.quote!([
      amountA,
      reserveA,
      reserveB,
    ]);
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
  params: ISwapTokensForTokensParams
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: FLASHPAD_ROUTER_ADDRESS as Address,
      abi: RouterABI,
      functionName: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
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

export const swapTokensForETH = async (
  account: Address,
  params: ISwapTokensForTokensParams
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: FLASHPAD_ROUTER_ADDRESS as Address,
      abi: RouterABI,
      functionName: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
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

export interface ISwapETHForTokensParams {
  amountOutMin: string;
  path: any[];
  to: Address;
  referrer: Address;
  deadline: string;
}

export const swapETHForTokens = async (
  account: Address,
  value: string,
  params: ISwapETHForTokensParams
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: FLASHPAD_ROUTER_ADDRESS as Address,
      abi: RouterABI,
      functionName: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
      args: Object.values(params),
      account,
      value,
    });
    const hash = await walletClient.writeContract(request);

    return { hash, result };
  } catch (err: any) {
    handleError(err);
    return undefined;
  }
};
