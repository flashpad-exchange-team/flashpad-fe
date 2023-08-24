import CloseIcon from '@/icons/CloseIcon';
import Coinbase from '@/icons/Coinbase';
import ConnectSuccess from '@/icons/ConnectSuccess';
import InfoIcon from '@/icons/InfoIcon';
import Metamask from '@/icons/Metamask';
import ProgressBar from '@/icons/ProgressBar';
import WalletConnect from '@/icons/WalletConnect';
import { useEffect, useState } from 'react';
import { useAccount, useConfig, useConnect } from 'wagmi';
import { lineaTestnet } from 'wagmi/chains';
import Notification from '../notification/Notification';
interface ConnectWalletProps {
  toggleOpen: () => void;
}
const ConnectWalletMobile = ({ toggleOpen }: ConnectWalletProps) => {
  const [isClick, setIsClick] = useState(false);
  const { isConnected } = useAccount();
  const { connectors } = useConfig();
  const { connect } = useConnect();
  useEffect(() => {
    if (isConnected && isClick) setTimeout(() => toggleOpen(), 1000);
  }, [isConnected, isClick]);
  return (
    <div className="block ">
      <div className="px-1">
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
            {' '}
            <div className="block mt-4">
              <div
                className="border rounded-lg border-[#1D2939] w-full mt-3 flex items-center p-2 cursor-pointer "
                onClick={() => {
                  setIsClick(true);
                  connect({
                    connector: connectors[1],
                    chainId: lineaTestnet.id,
                  });
                }}
              >
                <Metamask />
                Metamask
              </div>
              <div
                className="border rounded-lg border-[#1D2939] w-full mt-3 flex items-center p-2 cursor-pointer "
                onClick={() => {
                  setIsClick(true);
                  connect({
                    connector: connectors[2],
                    chainId: lineaTestnet.id,
                  });
                }}
              >
                <Coinbase />
                Coinbase
              </div>
              <div
                className="border rounded-lg border-[#1D2939] w-full mt-3 flex items-center p-2 cursor-pointer "
                onClick={() => {
                  setIsClick(true);
                  connect({
                    connector: connectors[3],
                    chainId: lineaTestnet.id,
                  });
                }}
              >
                <WalletConnect />
                WalletConnect
              </div>
            </div>
            <div className="bg-[#FF160080]  rounded-md px-3 py-2 mt-4 ">
              <div className="text-[14px] flex items-center justify-between ">
                Why don't I see my wallet? <InfoIcon />
              </div>
              <div className="text-[14px] text-[#ffaf1d] mt-2">
                Click here to learn more
              </div>
            </div>
          </>
        )}
      </div>
      <div className="">
        <div className="mt-2 font-bold text-[18px]">
          {isConnected ? 'Connection successful' : 'Connect your wallet'}
        </div>
        <div className="mt-2 mb-2 text-[14px] font-semibold">
          {isConnected
            ? 'Your wallet is now connected to Arthur DEX'
            : 'Connecting your wallet is like “logging in” to Web3. Select your wallet form the options to get started.'}
        </div>
        <Notification message="I don't have a wallet" type="info" />
        <ProgressBar active={isConnected} />
      </div>
    </div>
  );
};

export default ConnectWalletMobile;
