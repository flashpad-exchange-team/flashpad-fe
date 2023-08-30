import { createPublicClient, createWalletClient, custom, http } from 'viem'
import {
  lineaTestnet,
  polygonMumbai
} from 'viem/chains'
import {
  IS_LINEA,
  //  LINEA_GOERLI_INFURA_RPC,
  RPC
} from './constants';

const publicClient: any = createPublicClient({
  chain: IS_LINEA ? lineaTestnet : polygonMumbai,
  transport: http(RPC),
});
const getWalletClient = () => {
  try {
    return createWalletClient({
      chain: IS_LINEA ? lineaTestnet : polygonMumbai,
      transport: typeof window !== 'undefined' ? custom((window as any).ethereum) : http(),
    });
  }
  catch (err) {
    console.log({ err });
    return {};
  }
}
const walletClient: any = getWalletClient()

export {
  publicClient,
  walletClient,
};