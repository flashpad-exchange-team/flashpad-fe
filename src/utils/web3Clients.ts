import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { lineaTestnet, polygonMumbai } from 'viem/chains'
import { LINEA_GOERLI_INFURA_RPC, MUMBAI_ALCHEMY_RPC } from './constants';

const publicClient: any = createPublicClient({
  chain: polygonMumbai,
  transport: http(MUMBAI_ALCHEMY_RPC),
});
const getWalletClient = () => {
  try {
    return createWalletClient({
      chain: polygonMumbai,
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