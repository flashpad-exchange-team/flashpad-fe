import '../styles/global.css';

import LoadingIndicator from '@/components/loading/LoadingIndicator';
import { LoadingProvider } from '@/context/LoadingContext';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPublicClient, http } from 'viem';
import { WagmiConfig, createConfig, mainnet } from 'wagmi';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});
const MyApp = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig config={config}>
    <LoadingProvider>
      <ToastContainer />
      <LoadingIndicator />
      <Component {...pageProps} />
    </LoadingProvider>
  </WagmiConfig>
);

export default MyApp;
