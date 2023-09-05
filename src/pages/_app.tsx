import '../styles/global.css';

import LoadingIndicator from '@/components/loading/LoadingIndicator';
import { LoadingProvider } from '@/context/LoadingContext';
import { ModalProvider } from '@/context/ModalContext';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';

import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { lineaTestnet, polygonMumbai } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { infuraProvider } from '@wagmi/core/providers/infura';
import { ALCHEMY_MUMBAI_API_KEY, INFURA_API_KEY } from '@/utils/constants';
import { Open_Sans } from 'next/font/google';
import LoadingTx from '@/components/loading/LoadingTx';
import SuccessTx from '@/components/loading/SuccessTx';

const { chains, publicClient } = configureChains(
  [lineaTestnet, polygonMumbai],
  [
    publicProvider(),
    alchemyProvider({
      apiKey: ALCHEMY_MUMBAI_API_KEY!,
    }),
    infuraProvider({
      apiKey: INFURA_API_KEY!,
    }),
  ]
  // [
  //   jsonRpcProvider({
  //     rpc: (chain) => ({
  //       http: 'https://polygon-mumbai-bor.publicnode.com',
  //     }),
  //   }),
  // ]
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

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});
const MyApp = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig config={config}>
    <ModalProvider>
      <LoadingProvider>
        <main className={openSans.className}>
          <ToastContainer />
          <LoadingIndicator />
          <LoadingTx />
          <SuccessTx />
          <Component {...pageProps} />
        </main>
      </LoadingProvider>
    </ModalProvider>
  </WagmiConfig>
);

export default MyApp;
