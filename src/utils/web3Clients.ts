import { createPublicClient, createWalletClient, custom, http } from 'viem';
import {
  APP_BASE_CHAIN,
  RPC_URL,
} from './constants';

const publicClient: any = createPublicClient({
  chain: APP_BASE_CHAIN,
  transport: http(RPC_URL),
});

const getWalletClient = () => {
  try {
    return createWalletClient({
      chain: APP_BASE_CHAIN,
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