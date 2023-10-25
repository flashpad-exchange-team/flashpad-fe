import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';
import CurrencyDollar from '@/icons/CurrencyDollar';
import SaleIcon from '@/icons/SaleIcon';
import CalendarIcon from '@/icons/CalendarIcon';
import UnlockIcon from '@/icons/UnlockIcon';
import Image from 'next/image';
import useAllMerlinPoolsData from '@/hooks/useAllMerlinPoolsData';
import { Address, useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import customToast from '../notification/customToast';
import * as nftPoolContract from '@/utils/nftPoolContract';
import { ADDRESS_ZERO } from '@/utils/constants';
import { waitForTransaction } from '@wagmi/core';
import { useLoading } from '@/context/LoadingContext';
import { handleSuccessTxMessageActionWithPair } from '../successTxMessage';

export interface StakeIntoMerlinModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  tokenId: string;
  token1Data: {
    symbol: string;
    logo: string;
    [p: string]: any;
  };
  token2Data: {
    symbol: string;
    logo: string;
    [p: string]: any;
  };
  nftPoolAddress?: Address;
  refetchData: () => void;
  togglePositionDetailModal: () => void;
}

const StakeIntoMerlinModal = ({
  toggleOpen,
  isOpen,
  tokenId,
  token1Data,
  token2Data,
  nftPoolAddress,
  refetchData,
  togglePositionDetailModal,
}: StakeIntoMerlinModalProps) => {
  const { address: userAddress } = useAccount();
  const { data: listMerlinPools, isLoading } =
    useAllMerlinPoolsData(userAddress);
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();

  const [stakingMerlinPoolAddress, setStakingMerlinPoolAddress] =
    useState(ADDRESS_ZERO);

  const getMerlinPoolInfo = async () => {
    if (isLoading || !isOpen) return;

    const merlinPool = listMerlinPools?.find(
      (p) => p.nftPoolAddress.toLowerCase() === nftPoolAddress?.toLowerCase()
    );

    if (!merlinPool) {
      customToast({
        message: 'No Merlin pool for this spNFT pool found!',
        type: 'error',
      });
      return;
    }

    const merlinPoolAddr = merlinPool.poolAddress;
    if (merlinPoolAddr) {
      setStakingMerlinPoolAddress(merlinPoolAddr);
    }
  };

  useEffect(() => {
    getMerlinPoolInfo();
  }, [listMerlinPools, isLoading, isOpen]);

  const handleStakeToMerlinPool = async () => {
    if (!userAddress) {
      customToast({
        message: 'A wallet is not yet connected',
        type: 'error',
      });
      return;
    }

    startLoadingTx({
      tokenPairs: token1Data?.symbol + ' - ' + token2Data?.symbol,
      title: 'Staking your spNFT into Merlin pool...',
      message: 'Confirming your transaction. Please wait.',
    });

    const transferNftTx = await nftPoolContract.write(
      userAddress as Address,
      nftPoolAddress as Address,
      'safeTransferFrom',
      [userAddress, stakingMerlinPoolAddress, tokenId]
    );

    if (!transferNftTx) {
      stopLoadingTx();
      return;
    }

    const txHash = transferNftTx.hash;
    const txReceipt = await waitForTransaction({ hash: txHash });
    console.log({ txReceipt });

    toggleOpen();
    togglePositionDetailModal();
    stopLoadingTx();
    refetchData();

    startSuccessTx(
      handleSuccessTxMessageActionWithPair({
        action: 'staked into Merlin pool',
        token1: token1Data?.symbol,
        token2: token2Data?.symbol,
        txHash: txHash,
        usdValue: `?`,
      })
    );
  };

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="550px">
      <div className="flex items-center justify-end w-full">
        <div className="cursor-pointer pb-[20px]" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[15px] text-center text-2xl">
        <span className="text-[#E6B300] font-bold">Stake</span> into a Merlin
        pool
      </div>
      <div className="text-center text-secondary mb-3">
        Allocate TOKENS to your spNFT for more yield
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative mt-1">
            <div className="text-sm mx-auto flex items-center justify-center">
              <div className="relative -mt-[30px]">
                <div className="absolute">
                  {token1Data.logo ? (
                    <Image
                      alt="logo"
                      src={token1Data.logo as any}
                      width={32}
                      height={32}
                      className="max-w-[unset]"
                    />
                  ) : (
                    <BNBICon size="34" />
                  )}
                </div>
                <div className="absolute left-[25px]">
                  {token2Data.logo ? (
                    <Image
                      alt="logo"
                      src={token2Data.logo as any}
                      width={32}
                      height={32}
                      className="max-w-[unset]"
                    />
                  ) : (
                    <BNBICon size="34" />
                  )}
                </div>
              </div>
              <div className="ml-[70px]">
                <div className="text-bold">
                  {token1Data?.symbol} - {token2Data?.symbol}
                </div>
                <div className="text-s font-normal">#ID-{tokenId}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-[#E6B300] h-5 w-5"></div>
          <div className="text-secondary">Rewards</div>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="flex items-center">
          <CurrencyDollar />
          <div className="pl-1">$1.1M</div>
          <div className="pl-1 text-secondary">TVL</div>
        </div>
        <div className="flex items-center pl-5">
          <SaleIcon />
          <div className="pl-1">24.88%</div>
          <div className="pl-1 text-secondary">Bonus APR</div>
        </div>
      </div>
      <div className="flex my-4">
        <CalendarIcon />
        <div className="pl-2 text-secondary">Ends in 14 days</div>
      </div>
      <div className="flex my-4">
        <UnlockIcon />
        <div className="pl-2 text-secondary">No requirement</div>
      </div>
      <div className="block lg:flex items-center gap-2">
        <Button
          className="w-full justify-center mt-2 mb-2 px-[42px]"
          type="secondary"
          onClick={toggleOpen}
        >
          Cancel
        </Button>
        <Button
          onClick={handleStakeToMerlinPool}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
        >
          Stake
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default StakeIntoMerlinModal;
