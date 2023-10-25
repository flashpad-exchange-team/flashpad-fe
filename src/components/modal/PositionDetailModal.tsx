import ArrowDown from '@/icons/ArrowDown';
import ArrowUp from '@/icons/ArrowUp';
import BNBICon from '@/icons/BNBIcon';
import ChartBreakoutIcon from '@/icons/ChartBreakoutIcon';
import CloseIcon from '@/icons/CloseIcon';
import DividerDown from '@/icons/DividerDown';
import DownloadIcon from '@/icons/DownloadIcon';
import Eligibility from '@/icons/Eligibility';
import LaunchPadIcon from '@/icons/LaunchpadIcon';
import Lock from '@/icons/Lock';
import WithdrawPositionIcon from '@/icons/StakeIcons/WithdrawPositionIcon';
import * as web3Helpers from '@/utils/web3Helpers';
import BigNumber from 'bignumber.js';
import { formatDistanceToNow, isFuture } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import StakeIntoMerlin from './StakeIntoMerlinModal';
import { useAccount } from 'wagmi';
import customToast from '../notification/customToast';
import { useLoading } from '@/context/LoadingContext';
import * as merlinPoolContract from '@/utils/merlinPoolContract';
import { waitForTransaction } from '@wagmi/core';
import { handleSuccessTxMessageActionWithPair } from '../successTxMessage';

export interface PositionDetailModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  lpAddress?: Address;
  nftPoolAddress?: Address;
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
  refetchData: () => void;
  spNFTTokenId: string;
  isSpNFTStakedToMerlin: boolean | undefined;
  listSpNfts: any[];
  toggleAddToPosition: () => void;
  toggleWithdrawPosition: () => void;
  toggleLockPosition: () => void;
  toggleBoostPosition: () => void;
  toggleHarvestPosition: () => void;
  poolInfo: any;
  publishedMerlinPoolsCount: number;
}

const PositionDetailModal = ({
  toggleOpen,
  isOpen,
  token1Data,
  token2Data,
  spNFTTokenId,
  isSpNFTStakedToMerlin,
  listSpNfts,
  toggleAddToPosition,
  toggleWithdrawPosition,
  toggleLockPosition,
  toggleBoostPosition,
  toggleHarvestPosition,
  nftPoolAddress,
  refetchData,
  publishedMerlinPoolsCount,
}: PositionDetailModalProps) => {
  const { address: userAddress } = useAccount();
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  // const [isOpenMoreAction, setIsOpenMoreAction] = useState(true);
  const [isOpenValue, setIsOpenValue] = useState(true);
  const [isOpenApr, setIsOpenApr] = useState(true);
  const [isOpenRewards, setIsOpenRewards] = useState(true);

  const [showThisModal, setShowThisModal] = useState(true);
  const [isOpenStakeToMerlinModal, setOpenStakeToMerlinModal] = useState(false);

  const currentSPNFT = listSpNfts?.find(
    (item: any) => item.tokenId == spNFTTokenId
  );
  const [currentTimestamp, setCurrentTimestamp] = useState(0);

  const lockDays =
    (+currentSPNFT?.stakingPosition?.startLockTime.toString() +
      +currentSPNFT?.stakingPosition?.lockDuration.toString() -
      +currentTimestamp) *
    1000;

  useEffect(() => {
    const fetchTimeStamp = async () => {
      const { timestamp } = await web3Helpers.getBlock();
      setCurrentTimestamp(timestamp.toString());
    };
    fetchTimeStamp();
  }, []);

  const handleOpenStakeToMerlinModal = () => {
    setOpenStakeToMerlinModal(!isOpenStakeToMerlinModal);
    setShowThisModal(!showThisModal);
  };

  const handleUnstakeFromMerlin = async () => {
    if (!userAddress) {
      customToast({
        message: 'A wallet is not yet connected',
        type: 'error',
      });
      return;
    }

    startLoadingTx({
      tokenPairs: token1Data?.symbol + ' - ' + token2Data?.symbol,
      title: 'Unstaking your spNFT from Merlin pool...',
      message: 'Confirming your transaction. Please wait.',
    });

    const merlinPoolAddress = currentSPNFT.owner;

    const withdrawSpNftTx = await merlinPoolContract.write(
      userAddress as Address,
      merlinPoolAddress as Address,
      'withdraw',
      [currentSPNFT?.token_id]
    );

    if (!withdrawSpNftTx) {
      stopLoadingTx();
      return;
    }

    const txHash = withdrawSpNftTx.hash;
    const txReceipt = await waitForTransaction({ hash: txHash });
    console.log({ txReceipt });

    toggleOpen();
    stopLoadingTx();
    refetchData();

    startSuccessTx(
      handleSuccessTxMessageActionWithPair({
        action: `unstaked position #ID-${spNFTTokenId} from Merlin pool`,
        token1: token1Data?.symbol,
        token2: token2Data?.symbol,
        txHash: txHash,
      })
    );
  };

  return (
    <>
      <StakeIntoMerlin
        toggleOpen={handleOpenStakeToMerlinModal}
        isOpen={isOpenStakeToMerlinModal}
        tokenId={spNFTTokenId}
        token1Data={token1Data}
        token2Data={token2Data}
        nftPoolAddress={nftPoolAddress}
        refetchData={refetchData}
        togglePositionDetailModal={toggleOpen}
      />
      <CommonModal
        isOpen={isOpen && showThisModal}
        onRequestClose={toggleOpen}
        width="550px"
      >
        <div className="text-sm">
          <div className="flex items-center justify-center w-full">
            <div className="text-sm mx-auto flex items-center justify-center">
              <div className="relative -mt-[30px]">
                <div className="absolute">
                  {token1Data?.logo ? (
                    <Image
                      alt="logo"
                      src={token1Data?.logo as any}
                      width={34}
                      height={34}
                      className="max-w-[unset]"
                    />
                  ) : (
                    <BNBICon size="34" />
                  )}
                </div>
                <div className="absolute left-[22px]">
                  {token2Data?.logo ? (
                    <Image
                      alt="logo"
                      src={token2Data?.logo as any}
                      width={34}
                      height={34}
                      className="max-w-[unset]"
                    />
                  ) : (
                    <BNBICon size="34" />
                  )}{' '}
                </div>
              </div>
              <div className="ml-[70px]">
                <div className="text-bold">
                  {token1Data.symbol} - {token2Data.symbol}
                </div>
                <div className="text-xs font-normal">#ID-{spNFTTokenId}</div>
              </div>
            </div>
            <div className="cursor-pointer pb-[20px]" onClick={toggleOpen}>
              <CloseIcon />
            </div>
          </div>

          <div className="text-center mb-3 mt-2">
            This position has {currentSPNFT?.pendingRewards} pending farming
            rewards
          </div>
          <div className="flex px-10 justify-center gap-6">
            <div>
              <div
                className="px-5 py-4 flex justify-center bg-blue-opacity-50 rounded-md h-[54px] items-center"
                onClick={toggleAddToPosition}
              >
                <DownloadIcon stroke={'#FFAF1D'} />
              </div>
              <div className="text-xs mt-2 text-center">Add</div>
            </div>
            <div>
              <div
                className="px-5 py-4 flex justify-center bg-blue-opacity-50 rounded-md h-[54px] items-center"
                onClick={() => {
                  if (!isSpNFTStakedToMerlin) {
                    toggleWithdrawPosition();
                  }
                }}
              >
                <WithdrawPositionIcon
                  message={
                    isSpNFTStakedToMerlin
                      ? 'This position is being staked in a Merlin Pool. Please withdraw it from the Merlin Pool first.'
                      : 'Withdraw position'
                  }
                  strokeColor={isSpNFTStakedToMerlin ? '#475467' : ''}
                />
              </div>
              <div className="text-xs mt-2 text-center">Withdraw</div>
            </div>
            <div>
              <div
                className="px-5 py-4 flex justify-center bg-blue-opacity-50 rounded-md h-[54px] items-center"
                onClick={toggleLockPosition}
              >
                <Lock />
              </div>
              <div className="text-xs mt-2 text-center">Lock</div>
            </div>
            <div>
              <div
                className="px-5 py-4 flex justify-center bg-blue-opacity-50  rounded-md h-[54px] items-center"
                onClick={toggleBoostPosition}
              >
                <LaunchPadIcon active={true} />
              </div>
              <div className="text-xs mt-2 text-center">Boost</div>
            </div>
            <div
              onClick={() => {
                if (!publishedMerlinPoolsCount) {
                  return;
                }
                if (!isSpNFTStakedToMerlin) {
                  handleOpenStakeToMerlinModal();
                  return;
                }
                handleUnstakeFromMerlin();
              }}
            >
              <div
                className="px-5 py-4 flex justify-center bg-blue-opacity-50 rounded-md h-[54px] items-center"
                title="Stake into Merlin"
              >
                {publishedMerlinPoolsCount > 0 ? (
                  isSpNFTStakedToMerlin ? (
                    //TODO: unstake icon
                    <ChartBreakoutIcon stroke="#FFAF1D" />
                  ) : (
                    <ChartBreakoutIcon stroke="#FFAF1D" />
                  )
                ) : (
                  //TODO: no merlin pools available icon
                  <ChartBreakoutIcon stroke="#FFAF1D" />
                )}
              </div>
              <div className="text-xs mt-2 text-center">
                {publishedMerlinPoolsCount > 0
                  ? isSpNFTStakedToMerlin
                    ? 'Unstake from Merlin'
                    : 'Stake into Merlin'
                  : 'No Merlin pools available'}
              </div>
            </div>
          </div>
          {/* <div
          className="flex justify-center gap-2 mb-3 mt-4 cursor-pointer"
          onClick={() => setIsOpenMoreAction(!isOpenMoreAction)}
        >
          <div>More action</div>
          {isOpenMoreAction ? (
            <ArrowUp stroke="#fff" />
          ) : (
            <ArrowDown stroke="#fff" />
          )}
        </div>
        {isOpenMoreAction && (
          <div className="flex px-20 py-2 justify-center gap-6 mb-3">
            <div className="px-5 py-4 rounded-md h-[54px] items-center ml-15 flex justify-center bg-blue-opacity-50">
              <CreditCardMerge />
            </div>
            <div className="px-5 py-4 rounded-md h-[54px] items-center flex justify-center bg-blue-opacity-50">
              <CreditCardSplit />
            </div>
            <div className="px-5 py-4 rounded-md h-[54px] items-center mr-15 flex justify-center bg-blue-opacity-50">
              <CreditCardMerge />
            </div>
          </div>
        )} */}
          <div className="p-3 bg-blue-opacity-50 rounded-md mt-3 ">
            <div className="text-[#fff]">Properties</div>
          </div>
          <div className="flex justify-between items-center my-2">
            <div className="flex">
              <Eligibility />
              <div className="pl-2">Non yield-bearing</div>
            </div>
            <div>-</div>
          </div>
          <div className="flex justify-between items-center my-2">
            <div className="flex items-center">
              <div>
                {lockDays && isFuture(lockDays) ? (
                  <Eligibility />
                ) : (
                  <CloseIcon />
                )}
              </div>

              <div className="pl-2">
                <div>
                  {lockDays && isFuture(lockDays) ? 'Locked' : 'No Lock'}
                </div>
                <div className="text-xs text-secondary">
                  {currentSPNFT?.stakingPosition?.lockMultiplier?.toString()}x
                  Multiplier
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div>
                {lockDays && isFuture(lockDays)
                  ? `${formatDistanceToNow(lockDays)}`
                  : '-'}
              </div>
              <div className="text-xs text-secondary">Remaining time</div>
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            <div className="flex items-center">
              {currentSPNFT?.stakingPosition?.boostPoints > 0 ? (
                <Eligibility />
              ) : (
                <CloseIcon />
              )}
              <div className="pl-2">
                {currentSPNFT?.stakingPosition?.boostPoints > 0
                  ? 'Boosted'
                  : 'Unboosted'}
              </div>
            </div>
            <div>
              {currentSPNFT?.stakingPosition?.boostPoints > 0
                ? new BigNumber(currentSPNFT?.stakingPosition?.boostPoints || 0)
                    .div(new BigNumber(10).pow(18))
                    .toString(10) + ' xART'
                : '-'}
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            {isSpNFTStakedToMerlin ? (
              <>
                <div className="flex items-center">
                  <Eligibility />
                  <div className="pl-2">Staked in a Merlin pool </div>
                </div>
                <div>-</div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <CloseIcon />
                  <div className="pl-2">Not staked in a Merlin pool </div>
                </div>
                <div>-</div>
              </>
            )}
          </div>
          <div className="p-2 bg-blue-opacity-50 ">
            <div className="text-[#fff]">Data breakdown</div>
          </div>
          <div
            className="flex justify-between mt-2 items-center cursor-pointer"
            onClick={() => setIsOpenValue(!isOpenValue)}
          >
            <div className="pl-2 flex">
              <div>Value</div>
              {isOpenValue ? (
                <ArrowDown stroke="#fff" />
              ) : (
                <ArrowUp stroke="#fff" />
              )}
            </div>
            <div>-</div>
          </div>
          {isOpenValue && (
            <>
              <div className="flex justify-between items-center mt-2 bg-blue-opacity-50">
                <div className="pl-2">Name</div>
                <div className="flex items-center ">
                  <div className="pl-1">($0.1)</div>
                  <div className="pl-1">0.1</div>
                  <div className="pl-1">
                    <BNBICon />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-blue-opacity-50">
                <div className="pl-2">Name</div>
                <div className="flex items-center ">
                  <div className="pl-1">($0.1)</div>
                  <div className="pl-1">0.1</div>
                  <div className="pl-1">
                    <BNBICon />
                  </div>
                </div>
              </div>
            </>
          )}
          <div
            className="flex justify-between mt-2 items-center cursor-pointer"
            onClick={() => setIsOpenApr(!isOpenApr)}
          >
            <div className="pl-2 flex">
              <div>APR</div>
              {isOpenApr ? (
                <ArrowDown stroke="#fff" />
              ) : (
                <ArrowUp stroke="#fff" />
              )}
            </div>
            <div>-</div>
          </div>
          {isOpenApr && (
            <>
              <div className="flex justify-between items-center bg-blue-opacity-50">
                <div className="pl-2">Name</div>
                <div className="flex items-center ">
                  <div className="pl-1">($0.1)</div>
                  <div className="pl-1">0.1</div>
                  <div className="pl-1">
                    <BNBICon />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-blue-opacity-50">
                <div className="pl-2">Name</div>
                <div className="flex items-center ">
                  <div className="pl-1">($0.1)</div>
                  <div className="pl-1">0.1</div>
                  <div className="pl-1">
                    <BNBICon />
                  </div>
                </div>
              </div>
            </>
          )}
          <div
            className="flex justify-between mt-2 items-center cursor-pointer"
            onClick={() => setIsOpenRewards(!isOpenRewards)}
          >
            <div className="pl-2 flex">
              <div>Pending rewards</div>
              {isOpenRewards ? (
                <ArrowDown stroke="#fff" />
              ) : (
                <ArrowUp stroke="#fff" />
              )}
            </div>
            <div>-</div>
          </div>
          {isOpenRewards && (
            <>
              <div className="flex justify-between items-center bg-blue-opacity-50">
                <div className="pl-2">Name</div>
                <div className="flex items-center ">
                  <div className="pl-1">($0.1)</div>
                  <div className="pl-1">0.1</div>
                  <div className="pl-1">
                    <BNBICon />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-blue-opacity-50">
                <div className="pl-2">Name</div>
                <div className="flex items-center ">
                  <div className="pl-1">($0.1)</div>
                  <div className="pl-1">0.1</div>
                  <div className="pl-1">
                    <BNBICon />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-between mt-2 items-center bg-blue-opacity-50">
            <div className="pl-2">Farm rewards</div>
            <div>-</div>
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
              className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
              onClick={toggleHarvestPosition}
            >
              Harvest
            </Button>
          </div>

          <DividerDown />
        </div>
      </CommonModal>
    </>
  );
};

export default PositionDetailModal;
