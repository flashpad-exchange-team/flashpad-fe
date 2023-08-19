import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { lineaTestnet } from 'viem/chains'
import { LINEA_GOERLI_INFURA_RPC } from './constants';

const publicClient: any = createPublicClient({
  chain: lineaTestnet,
  transport: http(LINEA_GOERLI_INFURA_RPC)
});

const walletClient = createWalletClient({
  chain: lineaTestnet,
  transport: typeof window !== 'undefined' ? custom((window as any).ethereum) : http(),
})

export {
  publicClient,
  walletClient,
};