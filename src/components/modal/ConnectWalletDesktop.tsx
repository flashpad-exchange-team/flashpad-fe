import CloseIcon from '@/icons/CloseIcon';
import Coinbase from '@/icons/Coinbase';
import ConnectSuccess from '@/icons/ConnectSuccess';
import InfoIcon from '@/icons/InfoIcon';
import Metamask from '@/icons/Metamask';
import ProgressBar from '@/icons/ProgressBar';
import WalletConnect from '@/icons/WalletConnect';
import { LogoVertical } from '@/templates/LogoVertical';
import Notification from '../notification/Notification';
import { useEffect, useState } from 'react';
import { useAccount, useConfig, useConnect } from 'wagmi';
import customToast from '../notification/customToast';
import { APP_BASE_CHAIN } from '@/utils/constants';
import { useWeb3Modal } from '@web3modal/wagmi/react';

interface ConnectWalletProps {
  toggleOpen: () => void;
}
const ConnectWalletDesktop = ({ toggleOpen }: ConnectWalletProps) => {
  const [isClick, setIsClick] = useState(false);
  const { isConnected } = useAccount();
  const { connectors } = useConfig();
  const { connect } = useConnect();
  const { open } = useWeb3Modal();

  const checkWalletInstalled = (type: string) => {
    if (type === 'Metamask') {
      if (typeof window.ethereum === 'undefined') {
        customToast({
          message:
            'You have not installed Metamask. We will redirect you to installing page...',
          type: 'error',
          autoClose: 2000,
        });
        setTimeout(() => {
          window.open('https://metamask.io/download.html', '_blank');
        }, 3000);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    }
  };
  useEffect(() => {
    if (isConnected && isClick) setTimeout(() => toggleOpen(), 1000);
  }, [isConnected, isClick]);
  return (
    <div className="flex flex-wrap ">
      <div className="w-1/2 border-r-[1px] pr-4">
        <LogoVertical xl />
        <div className="mt-2 font-bold text-lg">
          {isConnected ? 'Connection successful' : 'Connect your wallet'}
        </div>
        <div className="mt-2 mb-2 text-sm font-semibold">
          {isConnected
            ? 'Your wallet is now connected to Flashpad DEX'
            : 'Connecting your wallet is like “logging in” to Web3. Select your wallet form the options to get started.'}
        </div>
        <Notification message="I don't have a wallet" type="info" />
        <ProgressBar active={isConnected} />
      </div>
      <div className="w-1/2 pl-6 pr-4">
        <div className="mt-2 font-bold flex items-center justify-between">
          {isConnected ? 'Connection Sucessful' : 'Available Wallets (3)'}
          <div className="cursor-pointer" onClick={toggleOpen}>
            <CloseIcon />
          </div>
        </div>
        {isConnected ? (
          <ConnectSuccess />
        ) : (
          <>
            <div className="flex flex-wrap gap-2  mt-4">
              <div
                className="border rounded-lg border-[#1D2939] w-[180px] flex items-center p-2 cursor-pointer flex"
                onClick={() => {
                  open();
                  setIsClick(true);
                  // checkWalletInstalled('Metamask');
                  // connect({
                  //   connector: connectors[1],
                  //   chainId: APP_BASE_CHAIN.id,
                  // });
                }}
              >
                <Metamask />
                Metamask
              </div>
              <div
                className="border rounded-lg border-[#1D2939] w-[180px] flex items-center p-2 cursor-pointer "
                onClick={() => {
                  setIsClick(true);
                  checkWalletInstalled('Coinbase');
                  connect({
                    connector: connectors[2],
                    chainId: APP_BASE_CHAIN.id,
                  });
                }}
              >
                <Coinbase />
                Coinbase
              </div>
              <div
                className="border rounded-lg border-[#1D2939] w-[180px] flex items-center p-2 cursor-pointer "
                onClick={() => {
                  setIsClick(true);
                  connect({
                    connector: connectors[3],
                    chainId: APP_BASE_CHAIN.id,
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
    </div>
  );
};

export default ConnectWalletDesktop;
