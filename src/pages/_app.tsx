import '../styles/global.css';

import LoadingIndicator from '@/components/loading/LoadingIndicator';
import { LoadingProvider } from '@/context/LoadingContext';
import { ModalProvider } from '@/context/ModalContext';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { lineaTestnet } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [lineaTestnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '14f71914de6c8aae8a6b49b7ba15522f',
      },
    }),
  ],
  publicClient,
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig config={config}>
    <ModalProvider>
      <LoadingProvider>
        <ToastContainer />
        <LoadingIndicator />
        <Component {...pageProps} />
      </LoadingProvider>
    </ModalProvider>
  </WagmiConfig>
);

export default MyApp;
