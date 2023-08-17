import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { lineaTestnet } from 'viem/chains'

const publicClient: any = createPublicClient({
  chain: lineaTestnet,
  transport: http()
});

const walletClient = createWalletClient({
  chain: lineaTestnet,
  transport: custom((window as any).ethereum),
})

export {
  publicClient,
  walletClient,
};