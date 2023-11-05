import CloseIcon from '@/icons/CloseIcon';
import Coinbase from '@/icons/Coinbase';
import ConnectSuccess from '@/icons/ConnectSuccess';
import InfoIcon from '@/icons/InfoIcon';
import WalletConnect from '@/icons/WalletConnect';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { lineaTestnet } from 'wagmi/chains';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import Notification from '../notification/Notification';
interface ConnectWalletProps {
  toggleOpen: () => void;
}
const connectorWalletConnect = new WalletConnectConnector({
  chains: [lineaTestnet],
  options: {
    projectId: '14f71914de6c8aae8a6b49b7ba15522f',
  },
});

const ConnectWalletMobile = ({ toggleOpen }: ConnectWalletProps) => {
  const [isClick, setIsClick] = useState(false);
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { connect } = useConnect();
  useEffect(() => {
    if (isConnected && isClick) setTimeout(() => toggleOpen(), 1000);
  }, [isConnected, isClick]);
  return (
    <div className="block ">
      <div className="px-1">
        <div className="mt-2 font-bold flex items-center justify-between">
          {isConnected ? 'Connection Sucessful' : 'Available Wallets (2)'}

          <div className="cursor-pointer" onClick={toggleOpen}>
            <CloseIcon />
          </div>
        </div>
        {isConnected ? (
          <ConnectSuccess />
        ) : (
          <>
            <div className="block mt-4">
              {/* <div
                className="border rounded-lg border-[#1D2939] w-full mt-3 flex items-center p-2 cursor-pointer "
                onClick={() => {
                  // open({ view: 'All wallets' as any });
                  if (typeof window.ethereum !== 'undefined') {
                    connect({
                      connector: connectors[1],
                      chainId: lineaTestnet.id,
                    });
                  } else {
                    window.open(
                      'https://metamask.app.link/dapp/arthur.exchange/'
                    );
                  }
                  // // window.open(
                  // //   'https://link.trustwallet.com/open_url?coin_id=20000714&url=https://arthur.exchange/'
                  // // );
                  // window.open(
                  //   'https://metamask.app.link/dapp/arthur.exchange/'
                  // );
                }}
              >
                <Metamask />
                Metamask
              </div> */}
              <div
                className="border rounded-lg border-[#1D2939] w-full mt-3 flex items-center p-2 cursor-pointer "
                onClick={() => {
                  if (typeof window.ethereum !== 'undefined') {
                    connect({
                      chainId: lineaTestnet.id,
                    });
                  } else {
                    window.open(
                      'https://link.trustwallet.com/open_url?coin_id=20000714&url=https://arthur.exchange/'
                    );
                  }
                }}
              >
                <Coinbase />
                Trust
              </div>
              <div
                className="border rounded-lg border-[#1D2939] w-full mt-3 flex items-center p-2 cursor-pointer "
                onClick={() => {
                  setIsClick(true);
                  connect({
                    connector: connectorWalletConnect,
                    chainId: lineaTestnet.id,
                  });
                }}
              >
                <WalletConnect />
                WalletConnect
              </div>
            </div>
            <div className="bg-[#FF160080]  rounded-md px-3 py-2 mt-4 ">
              <div className="text-sm flex items-center justify-between ">
                Why don't I see my wallet? <InfoIcon />
              </div>
              <div className="text-sm text-primary mt-2">
                Click here to learn more
              </div>
            </div>
          </>
        )}
      </div>
      <div className="">
        <div className="mt-2 font-bold text-lg">
          {isConnected ? 'Connection successful' : 'Connect your wallet'}
        </div>
        <div className="mt-2 mb-2 text-sm font-semibold">
          {isConnected
            ? 'Your wallet is now connected to Arthur DEX'
            : 'Connecting your wallet is like “logging in” to Web3. Select your wallet form the options to get started.'}
        </div>
        <Notification message="I don't have a wallet" type="info" />
      </div>
    </div>
  );
};

export default ConnectWalletMobile;
