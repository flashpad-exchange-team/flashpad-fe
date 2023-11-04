import { useLoading } from '@/context/LoadingContext';
import { useNftPoolContractWrite } from '@/hooks/contract/useNftPoolContract';
import BNBICon from '@/icons/BNBIcon';
import CloseIcon from '@/icons/CloseIcon';
import DividerDown from '@/icons/DividerDown';
import { handleError } from '@/utils/handleError';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import { useState } from 'react';
import { Address } from 'viem';
import { useAccount, useBalance } from 'wagmi';
import { Button } from '../button/Button';
import customToast from '../notification/customToast';
import { handleSuccessTxMessageActionWithPair } from '../successTxMessage';
import CommonModal from './CommonModal';

export interface WithdrawPositionModalProps {
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
  listSpNfts: any[];
}

const WithdrawPositionModal = ({
  toggleOpen,
  isOpen,
  lpAddress,
  nftPoolAddress,
  token1Data,
  token2Data,
  refetchData,
  spNFTTokenId,
  listSpNfts,
}: WithdrawPositionModalProps) => {
  const [withdrawAmount, setWithdrawAmount] = useState('0');

  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  const { address: userAddress } = useAccount();
  const { data: balanceLP } = useBalance({
    address: isOpen ? userAddress : undefined,
    token: lpAddress,
    watch: true,
  });
  const handleWithdrawPosition = async () => {
    try {
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

      startLoadingTx({
        tokenPairs: token1Data?.symbol + ' - ' + token2Data?.symbol,
        title: 'Withdrawing your stake position ...',
        message: 'Confirming your transaction, please wait.',
      });

      const withdrawAmountParse = BigNumber(withdrawAmount).times(
        BigNumber(10).pow(balanceLP?.decimals!)
      );

      const { writeContract: writeNftPoolContract, ABI } =
        useNftPoolContractWrite();

      const txResult = await writeNftPoolContract({
        address: nftPoolAddress!,
        abi: ABI,
        functionName: 'withdrawFromPosition',
        args: [spNFTTokenId, withdrawAmountParse],
      });

      if (!txResult) {
        stopLoadingTx();
        return;
      }

      const hash = txResult.hash;
      const txReceipt = await waitForTransaction({ hash });
      console.log({ txReceipt });
      refetchData();
      stopLoadingTx();

      const usdValue = withdrawAmount;

      startSuccessTx(
        handleSuccessTxMessageActionWithPair({
          action: 'withdraw position',
          token1: token1Data.symbol,
          token2: token2Data.symbol,
          txHash: hash,
          usdValue,
        })
      );
      setWithdrawAmount('0');
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
  };
  const currentSPNFT = listSpNfts?.find(
    (item: any) => item.tokenId == spNFTTokenId
  );
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
              {' '}
              {token1Data.symbol} - {token2Data.symbol}
            </div>
            <div className="text-xs font-normal">#ID-{spNFTTokenId}</div>
          </div>
        </div>
        <div className="cursor-pointer pb-[20px]" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-center text-2xl">
        <span className="text-[#E6B300]">Withdraw</span> from your position
      </div>
      <div className="text-center text-secondary mb-5">
        Recover underlying tokens from a spNFT
      </div>
      <div className="p-2 bg-blue-opacity-50  rounded-md text-sm">
        <div className="flex justify-between items-center">
          <div className="text-[#98A2B3] ">Amount</div>
          <input
            className="w-full bg-transparent border-none h-[auto] pl-3 text-sm  mb-2 mt-2 focus:outline-none placeholder-[#667085] text-right"
            placeholder="Enter value "
            value={withdrawAmount}
            onChange={(event) => setWithdrawAmount(event.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[#fff]">
            Balance:{' '}
            {new BigNumber(currentSPNFT?.stakingPosition?.amount || 0)
              .div(new BigNumber(10).pow(18))
              .toFixed()}{' '}
            {token1Data.symbol} - {token2Data.symbol}
          </div>
          <Button
            className="w-[50px] h-[10px] rounded-none flex justify-center items-center text-xs"
            onClick={() =>
              setWithdrawAmount(
                new BigNumber(currentSPNFT?.stakingPosition?.amount || 0)
                  .div(new BigNumber(10).pow(18))
                  .toString(10)
              )
            }
          >
            Max
          </Button>
        </div>
      </div>

      {/* <div className="p-2 my-4 mb-5 bg-blue-opacity-50">Options</div>
      <div className="p-2 flex justify-between">
        <div>
          <div className="text-lg">LP auto-unbind</div>
          <div className="text-secondary text-sm">
            Auto unbind your underlying LP tokens
          </div>
        </div>
        <div className="flex">
          <Button
            className={`w-[50px]  rounded-none flex justify-center items-center ${
              isAutoUnBind && '!bg-[#000] !text-[#fff]'
            }`}
            onClick={toggleAutoUnBind}
          >
            On
          </Button>
          <Button
            className={`w-[50px]  rounded-none flex justify-center items-center ${
              isAutoUnBind || '!bg-[#000] !text-[#fff]'
            }`}
            onClick={toggleAutoUnBind}
          >
            OFF
          </Button>
        </div>
      </div>
      <div className="p-2 my-4 mb-5 bg-blue-opacity-50 text-xl">Estimates</div> */}

      <div className="p-2 flex justify-between text-sm">
        <div>Withdrawal amount</div>
        <div>{withdrawAmount}</div>
      </div>

      <div className="p-2 flex justify-between text-sm">
        <div>Remaining amount</div>
        <div>
          {new BigNumber(currentSPNFT?.stakingPosition?.amount || 0)
            .div(new BigNumber(10).pow(18))
            .minus(new BigNumber(withdrawAmount))
            ?.toFixed()}
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
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
          onClick={handleWithdrawPosition}
        >
          Withdraw
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default WithdrawPositionModal;
