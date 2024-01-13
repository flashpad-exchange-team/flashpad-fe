import { useLoading } from '@/context/LoadingContext';
import { useRouterContractWrite } from '@/hooks/contract/useRouterContract';
import { usePairContractWrite } from '@/hooks/contract/usePairContract';
import { allPairsKey, allPairsKeyForAll } from '@/hooks/useAllPairsData';
import CloseIcon from '@/icons/CloseIcon';
import DividerDown from '@/icons/DividerDown';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import {
  FLASHPAD_ROUTER_ADDRESS,
  DEFAULT_DEADLINE,
  MAX_UINT256,
  minutesToSeconds,
} from '@/utils/constants';
import * as erc20Contract from '@/utils/contract/erc20TokenContract';
import { handleError } from '@/utils/handleError';
import * as pairContract from '@/utils/contract/pairContract';
import * as web3Helpers from '@/utils/web3Helpers';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
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
  const { mutate } = useSWRConfig();

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
      BigNumber(userLpBalance).div(BigNumber(10).pow(lpTokenDecimals)).toFixed()
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
    try {
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
        message: 'Confirming your transaction, please wait.',
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
        [userAddress, FLASHPAD_ROUTER_ADDRESS]
      )) as bigint;

      if (BigNumber(lpTokenAllowance.toString()).isLessThan(bnAmountToRemove)) {
        startLoadingTx({
          tokenPairs: token1Symbol + ' - ' + token2Symbol,
          title: `Approving LP Token ...`,
          message: 'Confirming your transaction, please wait.',
        });

        const { writeContract: writePairContract, ABI } =
          usePairContractWrite();

        const approveRes = await writePairContract({
          address: pairAddress as Address,
          abi: ABI,
          functionName: 'approve',
          args: [FLASHPAD_ROUTER_ADDRESS, MAX_UINT256],
        });

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

      const { writeContract: writeRouterContract, ABI: RouterABI } =
        useRouterContractWrite();

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

        txResult = await writeRouterContract({
          account: userAddress,
          address: FLASHPAD_ROUTER_ADDRESS as Address,
          abi: RouterABI,
          functionName: 'removeLiquidityETH',
          args: [
            tokenAddress,
            bnAmountToRemove.toString(),
            amountTokenMin,
            amountETHMin,
            userAddress,
            (timestamp as bigint) + minutesToSeconds(nDeadline) + '',
          ],
        });
      } else {
        txResult = await writeRouterContract({
          account: userAddress,
          address: FLASHPAD_ROUTER_ADDRESS as Address,
          abi: RouterABI,
          functionName: 'removeLiquidity',
          args: [
            token1Address,
            token2Address,
            bnAmountToRemove.toString(),
            amount1.toString(),
            amount2.toString(),
            userAddress,
            (timestamp as bigint) + minutesToSeconds(nDeadline) + '',
          ],
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

      mutate(allPairsKey, allPairsKeyForAll);
      setSuccessful(true);
      stopLoadingTx();
      resetToDefault();
      customToast({
        message: 'Removed liquidity successfully',
        type: 'success',
      });
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
  };

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen}>
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          Remove Liquidity {token1Symbol} - {token2Symbol}
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-base font-semibold mb-3">
        Total Liquidity held:
        <span className="text-[#E6B300] text-lg font-semibold ml-2">
          {totalLiquidity} LP Tokens
        </span>
      </div>
      <div className="text-[15px]">Amount to remove</div>
      <div className="relative">
        <input
          className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
          placeholder="Enter value "
          value={amountToRemove}
          onChange={(e) => setAmountToRemove(e.target.value)}
        />
        <div
          className="text-xs font-semibold text-[#0C111D] bg-[#FFAF1D] flex items-center justify-center w-[42px] h-[18px] cursor-pointer absolute top-[20px] right-[20px]"
          onClick={() => setAmountToRemove(totalLiquidity)}
        >
          Max
        </div>
      </div>
      <div className="text-[15px]">Deadline (mins)</div>
      <input
        className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none  placeholder-[#667085]"
        placeholder="Enter value "
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <div className="block lg:flex items-center gap-2">
        <Button
          onClick={handleRemoveLiquidity}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
        >
          Remove Liquidity
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default RemoveLiquidityModal;
