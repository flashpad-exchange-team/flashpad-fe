import { useLoading } from '@/context/LoadingContext';
import ButtonStyle from '@/icons/ButtonStyle';
import CloseIcon from '@/icons/CloseIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import {
  ARTHUR_ROUTER_ADDRESS,
  DEFAULT_DEADLINE,
  MAX_UINT256,
  minutesToSeconds,
} from '@/utils/constants';
import * as erc20Contract from '@/utils/erc20TokenContract';
import * as pairContract from '@/utils/pairContract';
import * as routerContract from '@/utils/routerContract';
import * as web3Helpers from '@/utils/web3Helpers';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { Address, useAccount } from 'wagmi';
import { Button } from '../button/Button';
import customToast from '../notification/customToast';
import CommonModal from './CommonModal';

export interface RemoveLiquidityModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  token1Symbol: string;
  token2Symbol: string;
  token1Address: string;
  token2Address: string;
  pairAddress: string;
  lpTokenDecimals: number;
}

const RemoveLiquidityModal = ({
  toggleOpen,
  isOpen,
  token1Symbol,
  token2Symbol,
  token1Address,
  token2Address,
  pairAddress,
  lpTokenDecimals,
}: RemoveLiquidityModalProps) => {
  const { address: userAddress } = useAccount();
  const { startLoadingTx, stopLoadingTx } = useLoading();

  const [amountToRemove, setAmountToRemove] = useState<string>('0');
  const [deadline, setDeadline] = useState<string>(DEFAULT_DEADLINE);
  const [totalLiquidity, setTotalLiquidity] = useState<string>('?');
  const [successful, setSuccessful] = useState<boolean | undefined>(undefined);

  const fetchTotalLiquidityHeld = async () => {
    if (!isOpen || !userAddress) return;

    const userLpBalance = await pairContract.read(
      pairAddress as Address,
      'balanceOf',
      [userAddress]
    );

    setTotalLiquidity(
      BigNumber(userLpBalance)
        .div(BigNumber(10).pow(lpTokenDecimals))
        .toString()
    );
  };

  useEffect(() => {
    fetchTotalLiquidityHeld();
  }, [userAddress, isOpen, successful]);

  const resetToDefault = () => {
    setAmountToRemove('0');
    setDeadline(DEFAULT_DEADLINE);
  };

  const handleRemoveLiquidity = async () => {
    if (!userAddress) {
      customToast({
        message: 'Please connect to a wallet',
        type: 'error',
      });
      return;
    }
    setSuccessful(undefined);

    const nAmountToRemove = Number(amountToRemove);
    const nDeadline = Number(deadline);

    if (
      Number.isNaN(nAmountToRemove) ||
      nAmountToRemove <= 0 ||
      Number.isNaN(nDeadline) ||
      !Number.isInteger(nDeadline) ||
      nDeadline <= 0
    ) {
      customToast({
        message: 'Please input valid numbers',
        type: 'error',
      });
      return;
    }

    const bnAmountToRemove = BigNumber(10)
      .pow(lpTokenDecimals)
      .times(BigNumber(nAmountToRemove));

    startLoadingTx({
      tokenPairs: token1Symbol + ' - ' + token2Symbol,
      title: 'Removing liquidity ...',
      message: 'Confirming your transaction. Please wait.',
    });
    const balance1 = await erc20Contract.erc20Read(
      token1Address as Address,
      'balanceOf',
      [pairAddress]
    );
    const balance2 = await erc20Contract.erc20Read(
      token2Address as Address,
      'balanceOf',
      [pairAddress]
    );
    const totalSupply = await pairContract.read(
      pairAddress as Address,
      'totalSupply',
      []
    );

    const amount1 = bnAmountToRemove
      .times(BigNumber(balance1))
      .dividedToIntegerBy(BigNumber(totalSupply));
    const amount2 = bnAmountToRemove
      .times(BigNumber(balance2))
      .dividedToIntegerBy(BigNumber(totalSupply));

    const lpTokenAllowance = (await pairContract.read(
      pairAddress as Address,
      'allowance',
      [userAddress, ARTHUR_ROUTER_ADDRESS]
    )) as bigint;

    if (BigNumber(lpTokenAllowance.toString()).isLessThan(bnAmountToRemove)) {
      const approveRes = await pairContract.write(
        userAddress!,
        pairAddress as Address,
        'approve',
        [ARTHUR_ROUTER_ADDRESS, MAX_UINT256]
      );
      if (!approveRes) {
        setSuccessful(false);
        stopLoadingTx();
        return;
      }

      const hash = approveRes.hash;
      const txReceipt = await waitForTransaction({ hash });
      console.log({ txReceipt });
    }

    const { timestamp } = await web3Helpers.getBlock();
    let txResult: any;

    if (
      token1Symbol == 'WFTM' ||
      token1Symbol == 'WETH' ||
      token2Symbol == 'WFTM' ||
      token2Symbol == 'WETH'
    ) {
      let tokenAddress;
      let amountTokenMin;
      let amountETHMin;
      if (token1Symbol == 'WFTM' || token1Symbol == 'WETH') {
        tokenAddress = token2Address;
        amountTokenMin = amount2.toString();
        amountETHMin = amount1.toString();
      } else {
        tokenAddress = token1Address;
        amountTokenMin = amount1.toString();
        amountETHMin = amount2.toString();
      }

      txResult = await routerContract.removeLiquidityETH(userAddress, {
        token: tokenAddress,
        liquidity: bnAmountToRemove.toString(),
        amountTokenMin,
        amountETHMin,
        to: userAddress,
        deadline: (timestamp as bigint) + minutesToSeconds(nDeadline) + '',
      });
    } else {
      txResult = await routerContract.removeLiquidity(userAddress, {
        tokenA: token1Address,
        tokenB: token2Address,
        liquidity: bnAmountToRemove.toString(),
        amountAMin: amount1.toString(),
        amountBMin: amount2.toString(),
        to: userAddress,
        deadline: (timestamp as bigint) + minutesToSeconds(nDeadline) + '',
      });
    }

    if (!txResult) {
      setSuccessful(false);
      stopLoadingTx();
      return;
    }

    const hash = txResult.hash;
    const txReceipt = await waitForTransaction({ hash });
    console.log({ txReceipt });

    setSuccessful(true);
    stopLoadingTx();
    resetToDefault();
    customToast({
      message: 'Removed liquidity successfully',
      type: 'success',
    });
  };

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} height="420px">
      <div className="flex items-center justify-between w-full">
        <div className="text-[24px] text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          Remove Liquidity {token1Symbol} - {token2Symbol}
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[16px] font-semibold mb-3">
        Total Liquidity held:
        <span className="text-[#E6B300] text-[18px] font-semibold ml-2">
          {totalLiquidity} LP Tokens
        </span>
      </div>
      <div className="text-[15px]">Amount to remove</div>
      <div className="relative">
        <input
          className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
          placeholder="Enter value "
          value={amountToRemove}
          onChange={(e) => setAmountToRemove(e.target.value)}
        />
        <div
          className="text-[12px] font-semibold text-[#0C111D] bg-[#FFAF1D] flex items-center justify-center w-[42px] h-[18px] cursor-pointer absolute top-[20px] right-[20px]"
          onClick={() => setAmountToRemove(totalLiquidity)}
        >
          Max
        </div>
      </div>
      <div className="text-[15px]">Deadline (mins)</div>
      <input
        className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none  placeholder-[#667085]"
        placeholder="Enter value "
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <div className="block lg:flex items-center gap-2">
        <Button
          onClick={handleRemoveLiquidity}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-[16px] px-[42px]"
        >
          Remove Liquidity
        </Button>
      </div>

      <ButtonStyle />
    </CommonModal>
  );
};

export default RemoveLiquidityModal;
