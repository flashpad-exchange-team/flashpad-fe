import '../styles/global.css';

import type { AppProps } from 'next/app';
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
})
const MyApp = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig config={config}>

    <Component {...pageProps} />
  </WagmiConfig>

);

export default MyApp;
