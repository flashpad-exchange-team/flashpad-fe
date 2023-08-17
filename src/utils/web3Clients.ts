import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { lineaTestnet } from 'viem/chains'

const publicClient: any = createPublicClient({
  chain: lineaTestnet,
  transport: http()
});

const walletClient = createWalletClient({
  chain: lineaTestnet,
  transport: typeof window !== 'undefined' ? custom((window as any).ethereum) : http(),
})

export {
  publicClient,
  walletClient,
};