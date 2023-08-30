import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { lineaTestnet, polygonMumbai } from 'viem/chains';
import {
  IS_LINEA,
  RPC_URL,
} from './constants';

const publicClient: any = createPublicClient({
  chain: IS_LINEA ? lineaTestnet : polygonMumbai,
  transport: http(RPC_URL),
});
const getWalletClient = () => {
  try {
    return createWalletClient({
      chain: IS_LINEA ? lineaTestnet : polygonMumbai,
      transport:
        typeof window !== 'undefined'
          ? custom((window as any).ethereum)
          : http(),
    });
  } catch (err) {
    console.log({ err });
    return {};
  }
};

const walletClient: any = getWalletClient();

export { publicClient, walletClient };