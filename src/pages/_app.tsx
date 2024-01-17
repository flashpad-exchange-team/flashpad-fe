import '../styles/global.css';

import LoadingIndicator from '@/components/loading/LoadingIndicator';
import { LoadingProvider } from '@/context/LoadingContext';
import { ModalProvider } from '@/context/ModalContext';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
// import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import '@swing.xyz/ui/theme.css';

import LoadingTx from '@/components/loading/LoadingTx';
import SuccessTx from '@/components/loading/SuccessTx';
import AppLayout from '@/layout/layouts/AppLayout';
import HomeLayout from '@/layout/layouts/HomeLayout';
import {
  ALCHEMY_MUMBAI_API_KEY,
  APP_BASE_CHAIN,
  INFURA_API_KEY,
} from '@/utils/constants';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { infuraProvider } from '@wagmi/core/providers/infura';
import { Open_Sans } from 'next/font/google';
import { useRouter } from 'next/router';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';
import { Meta } from '@/layout/Meta';
import { AppConfig } from '@/utils/AppConfig';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { Analytics } from '@vercel/analytics/react';
import 'react-datetime/css/react-datetime.css';

const { chains, publicClient } = configureChains(
  [APP_BASE_CHAIN],
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
  publicClient: publicClient({ chainId: APP_BASE_CHAIN.id }),
});
console.log({ config });

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains2 = [APP_BASE_CHAIN];
const wagmiConfig = defaultWagmiConfig({
  chains: chains2,
  projectId: '14f71914de6c8aae8a6b49b7ba15522f',
  metadata,
});
createWeb3Modal({
  wagmiConfig,
  projectId: '14f71914de6c8aae8a6b49b7ba15522f',
  chains: chains2,
});

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});
const MyApp = ({ Component, pageProps }: any) => {
  const router = useRouter();
  const Layout: any = router.pathname === '/' ? HomeLayout : AppLayout;
  return (
    <WagmiConfig config={wagmiConfig}>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Analytics />

      <ModalProvider>
        <LoadingProvider>
          <Layout>
            <main className={openSans.className}>
              <ToastContainer />
              <LoadingIndicator />
              <LoadingTx />
              <SuccessTx />
              <Component {...pageProps} />
            </main>
          </Layout>
        </LoadingProvider>
      </ModalProvider>
    </WagmiConfig>
  );
};

export default MyApp;
