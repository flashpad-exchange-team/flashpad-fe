import { getContract } from 'viem';
import { abi as RouterABI } from '@/resources/abis/ArthurRouter.json';
import { publicClient, walletClient } from './web3Clients';

const routerContract = getContract({
  address:
    (process.env.ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET as `0x${string}`) ||
    '0x9F423958b0e02d6C60D1714a37bc627C23C7d048',
  abi: RouterABI,
  publicClient,
  walletClient,
});

const LINEA_TESTNET_TOKENS = {
  ERC20: '0x49084243271e63D087FDfEF94338F070102C940C',
  WETH: '0x451a32Fe376a699Ea25b6Cafc00E446ECC8452A9',
};

const SEPOLIA_TOKENS = {
  WETH: '0xc82f14458f68f076A4f2E756dB24B56A3C670bB4',
  ERC20: '0x764EcF27DF3df771D1c79f48A05aB18d2b6BBa10',
};

export const addLiquidity = async (
  tokenA: string,
  tokenB: string,
  amountADesired: string,
  amountBDesired: string,
  amountAMin: string,
  amountBMin: string,
  to: string | undefined,
  deadline: string,
  timeLock: string
) => {
  try {
    const { request, result } = await routerContract.simulate.addLiquidity!([
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline,
      timeLock,
    ]);

    return result;
    
    // const hash = await routerContract.write.addLiquidity!([]);
    // return hash;
  } catch (err: any) {
    console.log(err.message || err);
  }
};

/**
 * Get amounts out
 * @param amountIn amount sent in to be swapped
 * @param path array of ERC20 token addresses
 */
export const getAmountsOut = async (amountIn: string, path: string[]) => {
  const result = await routerContract.read.getAmountsOut!([amountIn, path]);

  console.log({ result });
  return result;
};
