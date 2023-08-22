import { Address, getContract } from 'viem';
import { abi as RouterABI } from '@/resources/abis/ArthurRouter.json';
import { publicClient, walletClient } from './web3Clients';
import { ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET } from './constants';
import { toast } from 'react-toastify';

const routerContract: any = getContract({
  address: ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET as Address,
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
}

export const addLiquidity = async (
  account: Address,
  params: IAddLiquidityParams,
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET as Address,
      abi: RouterABI,
      functionName: 'addLiquidity',
      args: Object.values(params),
      account
    });
    const hash = await walletClient.writeContract(request);

    return { hash, result };
  } catch (err: any) {
    console.log(err.message || err);
    toast.error(err.message || err);
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
    console.log(err.message || err);
    return undefined;
  }
}

/**
 * Get amounts out
 * @param amountIn amount sent in to be swapped
 * @param path array of ERC20 token addresses
 */
export const getAmountsOut = async (amountIn: string, path: string[]) => {
  try {
    const result = await routerContract.read.getAmountsOut!([amountIn, path]);

    console.log({ result });
    return result;
  } catch (err: any) {
    console.log(err.message || err);
    return undefined;
  }
};
