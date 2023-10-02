import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';
import {
  MAX_UINT256,
  X_ARTHUR_TOKEN_ADDRESS,
  YIELD_BOOSTER_ADDRESS,
} from '@/utils/constants';
import { Address } from 'viem';
import { useLoading } from '@/context/LoadingContext';
import { useAccount, useBalance } from 'wagmi';
import customToast from '../notification/customToast';
import * as xARTContract from '@/utils/xARTContract';
import { waitForTransaction } from '@wagmi/core';
import { handleSuccessTxMessageCreatePositionAndLiquidity } from '../successTxMessage';
import { useState } from 'react';
import BigNumber from 'bignumber.js';
import { encodeAbiParameters } from 'viem';
import Image from 'next/image';

export interface BoostPositionModalProps {
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
  spNFTTokenId: string | null;
}

const BoostPositionModal = ({
  toggleOpen,
  isOpen,
  nftPoolAddress,
  token1Data,
  token2Data,
  refetchData,
  spNFTTokenId,
}: BoostPositionModalProps) => {
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  const { address: userAddress } = useAccount();
  const [amount, setAmount] = useState('0');
  const [isBoost, setIsBoost] = useState(true);
  const toggleBoost = () => setIsBoost(!isBoost);

  const { data: balanceXART } = useBalance({
    address: isOpen ? userAddress : undefined,
    token: X_ARTHUR_TOKEN_ADDRESS as `0x${string}`,
    watch: true,
  });

  const handleBoost = async () => {
    if (!userAddress) {
      customToast({
        message: 'A wallet is not yet connected',
        type: 'error',
      });
      return;
    }

    if (!balanceXART) {
      customToast({
        message: 'Could not get LP balance info',
        type: 'error',
      });
    }

    if (amount == '0') {
      customToast({
        message: 'Please input valid amount',
        type: 'warning',
      });
      return;
    }

    const amountParsed = BigNumber(amount).times(
      BigNumber(10).pow((balanceXART as any)?.decimals!)
    );
    const usageAddress = YIELD_BOOSTER_ADDRESS;

    const usageAddressAllowance = (await xARTContract.read(
      X_ARTHUR_TOKEN_ADDRESS as `0x${string}`,
      'getUsageApproval',
      [userAddress, usageAddress]
    )) as bigint;

    if (BigNumber(usageAddressAllowance.toString()).isLessThan(amountParsed)) {
      startLoadingTx({
        tokenPairs: token1Data?.symbol + ' - ' + token2Data?.symbol,
        title: 'Approving Yield Booster ...',
        message: 'Confirming your transaction. Please wait.',
      });
      const approveRes = await xARTContract.write(
        userAddress!,
        X_ARTHUR_TOKEN_ADDRESS as `0x${string}`,
        'approveUsage',
        [usageAddress, MAX_UINT256]
      );
      if (!approveRes) {
        stopLoadingTx();
        return;
      }
      const approveHash = approveRes.hash;
      await waitForTransaction({ hash: approveHash });
    }

    startLoadingTx({
      tokenPairs: token1Data?.symbol + ' - ' + token2Data?.symbol,
      title: 'Boosting your stake position ...',
      message: 'Confirming your transaction. Please wait.',
    });
    const txResult = await xARTContract.write(
      userAddress,
      X_ARTHUR_TOKEN_ADDRESS as `0x${string}`,
      'allocate',
      [
        usageAddress,
        amountParsed.toString(),
        encodeAbiParameters(
          [
            { name: 'poolAddress', type: 'address' },
            { name: 'tokenId', type: 'uint256' },
          ],
          [nftPoolAddress as any, spNFTTokenId as any]
        ),
      ]
    );

    if (!txResult) {
      stopLoadingTx();
      return;
    }

    const hash = txResult.hash;
    const txReceipt = await waitForTransaction({ hash });
    console.log({ txReceipt });
    refetchData();
    stopLoadingTx();

    const usdValue = amount;

    startSuccessTx(
      handleSuccessTxMessageCreatePositionAndLiquidity({
        action: 'boost to position',
        token1: token1Data.symbol,
        token2: token2Data.symbol,
        txHash: hash,
        usdValue,
      })
    );
    setAmount('0');
  };

  const handleUnBoost = async () => {
    if (!userAddress) {
      customToast({
        message: 'A wallet is not yet connected',
        type: 'error',
      });
      return;
    }

    if (!balanceXART) {
      customToast({
        message: 'Could not get LP balance info',
        type: 'error',
      });
    }
    if (amount == '0') {
      customToast({
        message: 'Please input valid amount',
        type: 'error',
      });
      return;
    }

    startLoadingTx({
      tokenPairs: token1Data?.symbol + ' - ' + token2Data?.symbol,
      title: 'UnBoosting your stake position ...',
      message: 'Confirming your transaction. Please wait.',
    });

    const usageAddress = YIELD_BOOSTER_ADDRESS;
    const amountParsed = BigNumber(amount).times(
      BigNumber(10).pow((balanceXART as any)?.decimals!)
    );
    const txResult = await xARTContract.write(
      userAddress,
      X_ARTHUR_TOKEN_ADDRESS as `0x${string}`,
      'deallocate',
      [
        usageAddress,
        amountParsed.toString(),
        encodeAbiParameters(
          [
            { name: 'poolAddress', type: 'address' },
            { name: 'tokenId', type: 'uint256' },
          ],
          [nftPoolAddress as any, spNFTTokenId as any]
        ),
      ]
    );

    if (!txResult) {
      stopLoadingTx();
      return;
    }

    const hash = txResult.hash;
    const txReceipt = await waitForTransaction({ hash });
    console.log({ txReceipt });
    refetchData();
    stopLoadingTx();

    const usdValue = amount;

    startSuccessTx(
      handleSuccessTxMessageCreatePositionAndLiquidity({
        action: 'unboost from position',
        token1: token1Data.symbol,
        token2: token2Data.symbol,
        txHash: hash,
        usdValue,
      })
    );
    setAmount('0');
  };

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="550px">
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
      <div className="text-[15px] text-center text-[20px]">
        <span className="text-[#E6B300] font-bold">Boost</span> your position
      </div>
      <div className="text-center text-secondary mb-5 text-[12px]">
        Allocate xART to your spNFT for more yield
      </div>
      <div className="block lg:flex items-center gap-2">
        <Button
          onClick={toggleBoost}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
          type={isBoost ? '' : 'secondary'}
        >
          Boost
        </Button>
        <Button
          className="w-full justify-center mt-2 mb-2 px-[42px]"
          type={!isBoost ? '' : 'secondary'}
          onClick={toggleBoost}
        >
          Unboost
        </Button>
      </div>
      {/* <div className="p-2 my-4 mb-5 bg-blue-opacity-50 text-center text-[#E6B300]">
        Get max bonus
      </div> */}
      <div className="p-2 bg-blue-opacity-50  rounded-md text-sm">
        <div className="flex justify-between items-center">
          <div className="text-[#98A2B3] ">Amount</div>
          <input
            className="w-full bg-transparent border-none h-[auto] pl-3 text-sm  mb-2 mt-2 focus:outline-none placeholder-[#667085] text-right"
            placeholder="Enter value "
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            type="number"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[#fff]">
            Balance: {balanceXART?.formatted} xART
          </div>
          <Button
            className="w-[50px] h-[10px] rounded-none flex justify-center items-center text-xs"
            onClick={() => setAmount(balanceXART?.formatted || '0')}
          >
            Max
          </Button>
        </div>
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
          onClick={isBoost ? handleBoost : handleUnBoost}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
        >
          Submit
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default BoostPositionModal;
