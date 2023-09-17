import BNBICon from '@/icons/BNBIcon';
import CloseIcon from '@/icons/CloseIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { useState } from 'react';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import Image from 'next/image';
import { Address } from 'viem';
import { useAccount, useBalance } from 'wagmi';
import { waitForTransaction } from '@wagmi/core';
import { DEFAULT_TIME_LOCK, MAX_UINT256 } from '@/utils/constants';
import BigNumber from 'bignumber.js';
import customToast from '../notification/customToast';
import * as pairContract from '@/utils/pairContract';
import * as nftPoolContract from '@/utils/nftPoolContract';
import { daysToSeconds } from '@/utils/web3Helpers';
import { useLoading } from '@/context/LoadingContext';
import { handleSuccessTxMessageCreatePositionAndLiquidity } from '@/components/successTxMessage';
import DividerDown from '@/icons/DividerDown';

export interface CreatePositionModalProps {
  isOpen: boolean;
  toggleOpen: () => void;
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
}

enum LockTimeOptions {
  TWO_WEEKS,
  ONE_MONTH,
  THREE_MONTHS,
  CUSTOM,
}

const CreatePositionModal = ({
  toggleOpen,
  isOpen,
  lpAddress,
  nftPoolAddress,
  token1Data,
  token2Data,
}: CreatePositionModalProps) => {
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();

  const { address: userAddress } = useAccount();
  const [lockTime, setLockTime] = useState(DEFAULT_TIME_LOCK);
  const [lockTimeOption, setLockTimeOption] = useState<LockTimeOptions>(
    LockTimeOptions.TWO_WEEKS
  );
  const [stakeAmount, setStakeAmount] = useState('0');

  const is2WeeksSelected = lockTimeOption == LockTimeOptions.TWO_WEEKS;
  const is1MonthSelected = lockTimeOption == LockTimeOptions.ONE_MONTH;
  const is3MonthsSelected = lockTimeOption == LockTimeOptions.THREE_MONTHS;
  const isCustomSelected = lockTimeOption == LockTimeOptions.CUSTOM;

  const { data: balanceLP } = useBalance({
    address: isOpen ? userAddress : undefined,
    token: lpAddress,
    watch: true,
  });

  const resetInput = () => {
    setStakeAmount('0');
    setLockTime('14');
    setLockTimeOption(LockTimeOptions.TWO_WEEKS);
  };

  const handleCreatePosition = async () => {
    if (!userAddress) {
      customToast({
        message: 'A wallet is not yet connected',
        type: 'error',
      });
      return;
    }

    if (!balanceLP) {
      customToast({
        message: 'Could not get LP balance info',
        type: 'error',
      });
      // return;
    }

    let bnStakeAmount = BigNumber(stakeAmount);
    const nLockTime = Number(lockTime);
    if (bnStakeAmount.isGreaterThan(balanceLP?.formatted!)) {
      customToast({
        message: 'Not enough LP Balance',
        type: 'error',
      });
      return;
    }
    if (
      bnStakeAmount.isNaN() ||
      bnStakeAmount.isLessThanOrEqualTo(0) ||
      Number.isNaN(nLockTime) ||
      !Number.isInteger(nLockTime) ||
      nLockTime <= 0
    ) {
      customToast({
        message: 'Please input valid amount and lock time',
        type: 'error',
      });
      return;
    }

    const bnStakeAmountParsed = bnStakeAmount.times(
      BigNumber(10).pow(balanceLP?.decimals!)
    );
    console.log(1);
    startLoadingTx({
      tokenPairs: token1Data?.symbol + ' - ' + token2Data?.symbol,
      title: 'Creating Stake Position ...',
      message: 'Confirming your transaction. Please wait.',
    });
    console.log(2);

    const lpAllowance = (await pairContract.read(lpAddress!, 'allowance', [
      userAddress,
      nftPoolAddress,
    ])) as bigint;

    if (BigNumber(lpAllowance.toString()).isLessThan(bnStakeAmountParsed)) {
      const approveRes = await pairContract.write(
        userAddress!,
        lpAddress!,
        'approve',
        [nftPoolAddress, MAX_UINT256]
      );
      if (!approveRes) {
        stopLoadingTx();
        return;
      }

      const approveHash = approveRes.hash;
      const txReceipt = await waitForTransaction({ hash: approveHash });
      console.log({ txReceipt });
    }

    const txResult = await nftPoolContract.write(
      userAddress,
      nftPoolAddress!,
      'createPosition',
      [bnStakeAmountParsed, daysToSeconds(nLockTime) + '']
    );

    if (!txResult) {
      stopLoadingTx();
      return;
    }

    const hash = txResult.hash;
    const txReceipt = await waitForTransaction({ hash });
    console.log({ txReceipt });
    resetInput();
    stopLoadingTx();

    startSuccessTx(
      handleSuccessTxMessageCreatePositionAndLiquidity({
        action: 'created staking position',
        token1: token1Data.symbol,
        token2: token2Data.symbol,
        txHash: hash,
        usdValue: bnStakeAmount.toString(),
      })
    );
  };

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen}>
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          Create position
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-base font-semibold mb-3 flex items-center gap-2 w-fit mx-auto">
        {token1Data.logo ? (
          <Image alt="logo" src={token1Data.logo} width={54} height={54} />
        ) : (
          <BNBICon size={54} />
        )}
        <div>
          <div className="text-sm">Token</div>
          <div className="text-[22px] flex items-center gap-2">
            {token1Data.symbol}
          </div>
        </div>

        <div className="text-[22px] ml-3 mr-3">-</div>

        {token2Data.logo ? (
          <Image alt="logo" src={token2Data.logo} width={54} height={54} />
        ) : (
          <BNBICon size={54} />
        )}
        <div>
          <div className="text-sm">Token</div>
          <div className="text-[22px] flex items-center gap-2">
            {token2Data.symbol}
          </div>
        </div>
      </div>
      <div className="text-[15px]">Amount</div>
      <div className="relative">
        <input
          className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
          placeholder="Enter value "
          value={stakeAmount}
          onChange={(event) => setStakeAmount(event.target.value)}
        />
        <div
          className="text-xs font-semibold text-[#0C111D] bg-[#FFAF1D] flex items-center justify-center w-[42px] h-[18px] cursor-pointer absolute top-[20px] right-[20px]"
          onClick={() => setStakeAmount(balanceLP?.formatted || '0')}
        >
          Max
        </div>
      </div>
      <div className=" mb-3 text-[15px]">
        Balance: {balanceLP?.formatted || '?'} LP tokens
      </div>
      <div className="text-[15px]">Lock duration (days)</div>
      <div className="flex gap-2 items-center my-2">
        <div
          className={`p-2 text-center bg-darkBlue cursor-pointer border-[${
            is2WeeksSelected ? '#E6B300' : '#150E3980'
          }] hover:border-[#E6B300] border w-1/4 text-sm`}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.TWO_WEEKS);
            setLockTime('14');
          }}
        >
          2 WEEKS
        </div>
        <div
          className={`p-2 text-center bg-darkBlue cursor-pointer border-[${
            is1MonthSelected ? '#E6B300' : '#150E3980'
          }] hover:border-[#E6B300] border w-1/4 text-sm`}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.ONE_MONTH);
            setLockTime('30');
          }}
        >
          1 MONTH
        </div>
        <div
          className={`p-2 text-center bg-darkBlue cursor-pointer border-[${
            is3MonthsSelected ? '#E6B300' : '#150E3980'
          }] hover:border-[#E6B300] border w-1/4 text-sm`}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.THREE_MONTHS);
            setLockTime('90');
          }}
        >
          3 MONTHS
        </div>
        <div
          className={`p-2 text-center bg-darkBlue cursor-pointer border-[${
            isCustomSelected ? '#E6B300' : '#150E3980'
          }] hover:border-[#E6B300] border w-1/4 text-sm`}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.CUSTOM);
          }}
        >
          CUSTOM
        </div>
      </div>
      <input
        className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
        value={lockTime}
        disabled={!isCustomSelected}
        onChange={(e) => setLockTime(e.target.value)}
        placeholder="Enter the number of lock days "
      />
      <div className="text-base font-semibold mt-2">Estimates</div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm mt-1 ">Deposit value</div>
          <div className="text-sm mt-1 ">Total APR</div>
          <div className="text-sm mt-1 ">Farm base APR</div>
          <div className="text-sm mt-1 ">Farm bonus APR</div>
          <div className="text-sm mt-1 ">Earned fees APR</div>
        </div>
        <div>
          <div className="text-sm mt-1 text-right ">0</div>
          <div className="text-sm mt-1 text-right text-primary ">0%</div>
          <div className="text-sm mt-1 text-right ">0%</div>
          <div className="text-sm mt-1 text-right ">0%</div>
          <div className="text-sm mt-1 text-right ">0%</div>
        </div>
      </div>
      <div className="block lg:flex items-center gap-2">
        <Button
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
          onClick={handleCreatePosition}
        >
          Create
        </Button>
      </div>
      <DividerDown />
    </CommonModal>
  );
};

export default CreatePositionModal;
