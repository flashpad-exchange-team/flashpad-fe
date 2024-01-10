import { useLoading } from '@/context/LoadingContext';
import { useERC20TokenContractWrite } from '@/hooks/contract/useErc20TokenContract';
import { usePositionHelperContractWrite } from '@/hooks/contract/userPositionHelperContract';
import ArrowDown from '@/icons/ArrowDown';
import ArrowUp from '@/icons/ArrowUp';
import BNBICon from '@/icons/BNBIcon';
import CloseIcon from '@/icons/CloseIcon';
import DividerDown from '@/icons/DividerDown';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import {
  APP_BASE_CHAIN,
  MAX_UINT256,
  POSITION_HELPER_ADDRESS,
  daysToSeconds,
  minutesToSeconds,
} from '@/utils/constants';
import * as erc20TokenContract from '@/utils/contract/erc20TokenContract';
import { handleError } from '@/utils/handleError';
import handleSwitchNetwork from '@/utils/switchNetwork';
import * as web3Helpers from '@/utils/web3Helpers';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { Button } from '../button/Button';
import customToast from '../notification/customToast';
import { handleSuccessTxMessageActionWithPair } from '../successTxMessage';
import CommonModal from './CommonModal';

export interface AddLiquidityAndCreatePositionModalProps {
  isOpen: boolean;
  toggleOpen: () => void;
  pairToken1: string;
  initialToken1Amount: string;
  initialToken2Amount: string;
  token1Address: Address;
  token2Address: Address;
  nftPoolAddress: Address;
  token1Symbol: string;
  token2Symbol: string;
  token1Logo: string;
  token2Logo: string;
  token1Decimals: number;
  token2Decimals: number;
  balanceToken1: string;
  balanceToken2: string;
  bnBalanceToken1: string;
  bnBalanceToken2: string;
  reserves: any[];
  timeLock: number;
  deadline: number;
  slippage: number;
}

const AddLiquidityAndCreatePositionModal = ({
  isOpen,
  toggleOpen,
  pairToken1,
  initialToken1Amount,
  initialToken2Amount,
  token1Address,
  token2Address,
  token1Symbol,
  token2Symbol,
  token1Logo,
  token2Logo,
  token1Decimals,
  token2Decimals,
  balanceToken1,
  balanceToken2,
  bnBalanceToken1,
  bnBalanceToken2,
  reserves,
  nftPoolAddress,
  timeLock,
  deadline,
  slippage,
}: AddLiquidityAndCreatePositionModalProps) => {
  const { address: userAddress } = useAccount();
  const [token1Amount, setToken1Amount] = useState<string>('0');
  const [token2Amount, setToken2Amount] = useState<string>('0');
  const [merlinAutoStaking, setMerlinAutoStaking] = useState(false);
  const [lockDuration, setLockDuration] = useState('0');
  const [isOpenTotalApr, setIsOpenTotalApr] = useState(true);
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();

  const toggleMerlinAutoStaking = () => {
    setMerlinAutoStaking(!merlinAutoStaking);
  };

  const resetInput = () => {
    setToken1Amount('0');
    setToken2Amount('0');
  };

  useEffect(() => {
    setToken1Amount(initialToken1Amount);
    setToken2Amount(initialToken2Amount);
  }, [initialToken1Amount, initialToken2Amount]);

  const handleAddLiquidityAndCreatePosition = async () => {
    try {
      const { writeContract: writeERC20Contract, ABI: ERC20ABI } =
        useERC20TokenContractWrite();
      const {
        writeContract: writePositionHelperContract,
        ABI: PositionHelperABI,
      } = usePositionHelperContractWrite();

      if (chain?.id !== APP_BASE_CHAIN.id) {
        handleSwitchNetwork(switchNetwork);
        return;
      }
      const nLockDuration = Number(lockDuration);
      if (
        Number.isNaN(nLockDuration) ||
        !Number.isInteger(nLockDuration) ||
        nLockDuration < 0
      ) {
        customToast({
          message: 'Please input valid lock duration',
          type: 'error',
        });
        return;
      }

      const bnToken1Amount = BigNumber(10)
        .pow(token1Decimals)
        .times(BigNumber(token1Amount));

      const bnToken2Amount = BigNumber(10)
        .pow(token2Decimals!)
        .times(BigNumber(token2Amount));

      if (
        bnToken1Amount.isNaN() ||
        bnToken2Amount.isNaN() ||
        bnToken1Amount.isLessThanOrEqualTo(0) ||
        bnToken2Amount.isLessThanOrEqualTo(0)
      ) {
        customToast({
          message: 'Please input valid amount!',
          type: 'error',
        });
        return;
      }

      if (
        bnToken1Amount.isGreaterThan(BigNumber(bnBalanceToken1)) ||
        bnToken2Amount.isGreaterThan(BigNumber(bnBalanceToken2))
      ) {
        customToast({
          message: 'Insufficient balance!',
          type: 'error',
        });
        return;
      }

      startLoadingTx({
        tokenPairs: token1Symbol + ' - ' + token2Symbol,
        title: 'Adding liquidity and creating position...',
        message: 'Confirming your transaction, please wait.',
      });

      const token1AmountIn = bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN);
      const token2AmountIn = bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN);
      const token1AmountMin = bnToken1Amount
        .times(BigNumber(1).minus(BigNumber(slippage).div(100)))
        .toFixed(0, BigNumber.ROUND_DOWN);
      const token2AmountMin = bnToken2Amount
        .times(BigNumber(1).minus(BigNumber(slippage).div(100)))
        .toFixed(0, BigNumber.ROUND_DOWN);

      if (token1Symbol != 'ETH') {
        const token1Allowance = (await erc20TokenContract.erc20Read(
          token1Address,
          'allowance',
          [userAddress, POSITION_HELPER_ADDRESS]
        )) as bigint;

        if (BigNumber(token1Allowance.toString()).isLessThan(token1AmountIn)) {
          startLoadingTx({
            tokenPairs: token1Symbol,
            title: `Approving ${token1Symbol} Token ...`,
            message: 'Confirming your transaction, please wait.',
          });
          const { hash } = await writeERC20Contract({
            address: token1Address,
            abi: ERC20ABI,
            functionName: 'approve',
            args: [POSITION_HELPER_ADDRESS, MAX_UINT256],
          });

          if (!hash) {
            stopLoadingTx();
            // setSuccessful(false);
            // setFailed(true);
            return;
          } else {
            const txReceipt = await waitForTransaction({ hash });
            stopLoadingTx();
            console.log({ txReceipt });
          }
        }
      }

      if (token2Symbol != 'ETH') {
        const token2Allowance = (await erc20TokenContract.erc20Read(
          token2Address,
          'allowance',
          [userAddress, POSITION_HELPER_ADDRESS]
        )) as bigint;

        if (BigNumber(token2Allowance.toString()).isLessThan(token2AmountIn)) {
          startLoadingTx({
            tokenPairs: token2Symbol,
            title: `Approving ${token2Symbol} Token ...`,
            message: 'Confirming your transaction, please wait.',
          });
          const { hash } = await writeERC20Contract({
            address: token2Address,
            abi: ERC20ABI,
            functionName: 'approve',
            args: [POSITION_HELPER_ADDRESS, MAX_UINT256],
          });

          if (!hash) {
            stopLoadingTx();
            // setSuccessful(false);
            // setFailed(true);
            return;
          } else {
            const txReceipt = await waitForTransaction({ hash });
            stopLoadingTx();
            console.log({ txReceipt });
          }
        }
      }

      let txResult: any;
      const { timestamp } = await web3Helpers.getBlock();

      if (token1Symbol == 'ETH') {
        txResult = await writePositionHelperContract({
          address: POSITION_HELPER_ADDRESS as Address,
          abi: PositionHelperABI,
          functionName: 'addLiquidityETHAndCreatePosition',
          args: [
            token2Address,
            token2AmountIn,
            token2AmountMin,
            token1AmountMin,
            (timestamp as bigint) + minutesToSeconds(deadline) + '',
            daysToSeconds(timeLock) + '',
            userAddress,
            nftPoolAddress,
            nLockDuration,
            0,
          ],
          value: token1AmountIn as unknown as bigint,
        });
      } else if (token2Symbol == 'ETH') {
        txResult = await writePositionHelperContract({
          address: POSITION_HELPER_ADDRESS as Address,
          abi: PositionHelperABI,
          functionName: 'addLiquidityETHAndCreatePosition',
          args: [
            token1Address,
            token1AmountIn,
            token1AmountMin,
            token2AmountMin,
            (timestamp as bigint) + minutesToSeconds(deadline) + '',
            daysToSeconds(timeLock) + '',
            userAddress,
            nftPoolAddress,
            nLockDuration,
            0,
          ],
          value: token2AmountIn as unknown as bigint,
        });
      } else {
        txResult = await writePositionHelperContract({
          address: POSITION_HELPER_ADDRESS as Address,
          abi: PositionHelperABI,
          functionName: 'addLiquidityAndCreatePosition',
          args: [
            token1Address,
            token2Address,
            token1AmountIn,
            token2AmountIn,
            token1AmountMin,
            token2AmountMin,
            (timestamp as bigint) + minutesToSeconds(deadline) + '',
            userAddress,
            nftPoolAddress,
            nLockDuration,
            daysToSeconds(timeLock) + '',
            0,
          ],
        });
      }

      if (!txResult) {
        stopLoadingTx();
        return;
      }

      const hash = txResult.hash;
      const txReceipt = await waitForTransaction({ hash });
      console.log({ txReceipt });
      resetInput();
      stopLoadingTx();
      customToast({
        message: 'Added liquidity successfully',
        type: 'success',
      });

      startSuccessTx(
        handleSuccessTxMessageActionWithPair({
          action: 'provided liquidity',
          token1: token1Symbol,
          token2: token2Symbol,
          txHash: hash,
          usdValue: ` ${token1Amount} - ${token2Amount}`,
        })
      );
      toggleOpen();
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
  };

  const autoAdjustToken2Amount = async (token1Amount: any) => {
    const reserve1 = BigNumber(reserves ? (reserves as any)[0] : 0);
    const reserve2 = BigNumber(reserves ? (reserves as any)[1] : 0);
    if (reserve1.isZero() || reserve2.isZero()) return;
    const bnToken1Amount = BigNumber(10)
      .pow(token1Decimals)
      .times(BigNumber(token1Amount));
    let adjustedToken2Amount;
    if (
      !pairToken1 ||
      pairToken1.toLowerCase() === token1Address.toLowerCase()
    ) {
      adjustedToken2Amount = web3Helpers.bnQuote(
        bnToken1Amount,
        reserve1,
        reserve2
      );
    } else {
      adjustedToken2Amount = web3Helpers.bnQuote(
        bnToken1Amount,
        reserve2,
        reserve1
      );
    }
    setToken2Amount(
      adjustedToken2Amount.div(BigNumber(10).pow(token2Decimals)).toString()
    );
  };

  const autoAdjustToken1Amount = async (token2Amount: any) => {
    const reserve1 = BigNumber(reserves ? (reserves as any)[0] : 0);
    const reserve2 = BigNumber(reserves ? (reserves as any)[1] : 0);
    if (reserve1.isZero() || reserve2.isZero()) return;
    const bnToken2Amount = BigNumber(10)
      .pow(token2Decimals)
      .times(BigNumber(token2Amount));
    let adjustedToken1Amount;
    if (
      !pairToken1 ||
      (pairToken1 as string).toLowerCase() === token1Address.toLowerCase()
    ) {
      adjustedToken1Amount = web3Helpers.bnQuote(
        bnToken2Amount,
        reserve2,
        reserve1
      );
    } else {
      adjustedToken1Amount = web3Helpers.bnQuote(
        bnToken2Amount,
        reserve1,
        reserve2
      );
    }
    setToken1Amount(
      adjustedToken1Amount.div(BigNumber(10).pow(token1Decimals)).toString()
    );
  };

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="550px">
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          Add V2 liquidity
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[#98A2B3] text-sm mb-2 font-semibold ">
        Deposit assets on Flashpad and start earning yield.
      </div>
      <div className="p-2 flex items-center gap-4 text-[12px]">
        <div className="mb-5">
          {token1Logo ? (
            <Image alt="logo" src={token1Logo} width={25} height={25} />
          ) : (
            <BNBICon />
          )}
          {token1Symbol}
        </div>
        <div className="flex-col w-full">
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Enter value "
              value={token1Amount}
              onChange={(event) => {
                setToken1Amount(event.target.value);
                autoAdjustToken2Amount(event.target.value);
              }}
            />
            <div
              className="text-xs font-semibold text-[#0C111D] bg-[#FFAF1D] flex items-center justify-center w-[42px] h-[18px] cursor-pointer absolute top-[20px] right-[20px]"
              onClick={() => {
                setToken1Amount(balanceToken1 || '0');
                autoAdjustToken2Amount(balanceToken1);
              }}
            >
              Max
            </div>
          </div>
          <div className="text-[13px]">
            Balance: {balanceToken1 || '?'} {token1Symbol || 'tokens'}
          </div>
        </div>
      </div>
      <div className="p-2 flex items-center gap-4 text-[12px]">
        <div className="mb-5">
          {token2Logo ? (
            <Image alt="logo" src={token2Logo} width={25} height={25} />
          ) : (
            <BNBICon />
          )}
          {token2Symbol}
        </div>
        <div className="flex-col w-full">
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Enter value "
              value={token2Amount}
              onChange={(event) => {
                setToken2Amount(event.target.value);
                autoAdjustToken1Amount(event.target.value);
              }}
            />
            <div
              className="text-xs font-semibold text-[#0C111D] bg-[#FFAF1D] flex items-center justify-center w-[42px] h-[18px] cursor-pointer absolute top-[20px] right-[20px]"
              onClick={() => {
                setToken2Amount(balanceToken2 || '0');
                autoAdjustToken1Amount(balanceToken2);
              }}
            >
              Max
            </div>
          </div>
          <div className="text-[13px]">
            Balance: {balanceToken2 || '?'} {token2Symbol || 'tokens'}
          </div>
        </div>
      </div>
      {/* <div className="bg-blue-opacity-50 p-2 text-[14px] my-1">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div>1 ETH = 1.027,6289 TOKEN</div>
            <div className="text-[#344054]">($1,91)</div>
          </div>
          <ArrowDown />
        </div>
        <div className="flex gap-4">
          <div>1 AICODE = 0,001 ETH </div>
          <div className="text-[#344054]">($1,91)</div>
        </div>
      </div> */}
      <div className="bg-blue-opacity-50 p-3 text-sm mt-2 mb-1 rounded-md ">
        Boost options
      </div>
      <div className="p-3 flex items-center justify-between text-sm">
        <div className="">Lock duration</div>
        <div className="flex gap-2">
          <Button
            type="secondary"
            className="w-[60px] flex justify-center items-center rounded-[4px]"
            onClick={() => {
              if (lockDuration > '0') {
                setLockDuration(Number(lockDuration) - 1 + '');
              }
            }}
          >
            -
          </Button>
          <div className="flex items-center bg-blue-opacity-50 justify-end px-6 py-2 text-sm">
            <input
              type="text"
              placeholder="0"
              className="bg-blue-opacity-50 w-[40px] h-[32px] text-[15px] font-semibold focus:outline-none text-[#FFAF1D] placeholder-[#667085]"
              value={lockDuration}
              onChange={(ev) => setLockDuration(ev.target.value)}
            />
            <div>Days</div>
          </div>
          <Button
            className="w-[60px] flex justify-center items-center rounded-[4px]"
            onClick={() => setLockDuration(Number(lockDuration) + 1 + '')}
          >
            +
          </Button>
        </div>
      </div>
      <div className="text-right text-secondary text-sm mb-2">
        4.37% lock bonus (x1.04)
      </div>

      <div className="p-2 flex justify-between bg-blue-opacity-50">
        <div>
          <div className="text-md">Thunder auto-staking</div>
          <div className="text-secondary text-sm">
            Auto unbind your underlying LP tokens
          </div>
        </div>
        <div className="flex">
          <Button
            className={`w-[50px] ${
              merlinAutoStaking ? '' : '!bg-[#000] text-[#fff]'
            } rounded-[2px] !text-[12px] flex justify-center items-center`}
            onClick={toggleMerlinAutoStaking}
          >
            ON
          </Button>
          <Button
            className={`w-[50px] ${
              !merlinAutoStaking ? '' : '!bg-[#000] text-[#fff]'
            } rounded-[2px] !text-[12px] flex justify-center items-center`}
            onClick={toggleMerlinAutoStaking}
          >
            OFF
          </Button>
        </div>
      </div>

      <div className="bg-blue-opacity-50 p-2 text-[16px] my-1">Estimates</div>
      {/* <div className="flex justify-between my-5">
        <div>Deposit value</div>
        <div>$0</div>
      </div> */}
      <div className="flex justify-between mb-5 mt-3 pl-2 text-[12px]">
        <div
          className="flex items-center"
          onClick={() => setIsOpenTotalApr(!isOpenTotalApr)}
        >
          <div>Total APR</div> {isOpenTotalApr ? <ArrowUp /> : <ArrowDown />}
        </div>
        <div className="text-secondary">20.3%</div>
      </div>
      {isOpenTotalApr && (
        <>
          <div className="flex justify-between my-3 text-[12px] pl-2">
            <div>Swap fees APR</div>
            <div>0</div>
          </div>
          <div className="flex justify-between my-3 text-[12px] pl-2">
            <div>Farm base APR</div>
            <div>0</div>
          </div>
          <div className="flex justify-between my-3 text-[12px] pl-2">
            <div>Lock bonus APR</div>
            <div>0</div>
          </div>
        </>
      )}

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
          onClick={handleAddLiquidityAndCreatePosition}
        >
          Create Position
        </Button>
      </div>
      <DividerDown />
    </CommonModal>
  );
};

export default AddLiquidityAndCreatePositionModal;
