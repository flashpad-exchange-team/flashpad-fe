import { useLoading } from '@/context/LoadingContext';
import { useNftPoolContractWrite } from '@/hooks/contract/useNftPoolContract';
import ArrowRight from '@/icons/ArrowRight';
import BNBICon from '@/icons/BNBIcon';
import CloseIcon from '@/icons/CloseIcon';
import DividerDown from '@/icons/DividerDown';
import Error from '@/icons/Error';
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

export interface AddToPositionModalProps {
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
  feeAPR: BigNumber;
  farmBaseAPR: BigNumber;
}

const AddToPositionModal = ({
  toggleOpen,
  isOpen,
  lpAddress,
  nftPoolAddress,
  token1Data,
  token2Data,
  refetchData,
  spNFTTokenId,
  listSpNfts,
  feeAPR,
  farmBaseAPR,
}: AddToPositionModalProps) => {
  const [addAmount, setAddAmount] = useState('0');

  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  const { address: userAddress } = useAccount();
  const { data: balanceLP } = useBalance({
    address: isOpen ? userAddress : undefined,
    token: lpAddress,
    watch: true,
  });
  const handleAddToPosition = async () => {
    try {
      const { writeContract: writeNftPoolContract, ABI: NftPoolABI } =
        useNftPoolContractWrite();

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
      }

      startLoadingTx({
        tokenPairs: token1Data?.symbol + ' - ' + token2Data?.symbol,
        title: 'Adding to your stake position ...',
        message: 'Confirming your transaction, please wait.',
      });

      const addAmountParse = BigNumber(addAmount).times(
        BigNumber(10).pow(balanceLP?.decimals!)
      );

      const txResult = await writeNftPoolContract({
        address: nftPoolAddress!,
        abi: NftPoolABI,
        functionName: 'addToPosition',
        args: [spNFTTokenId, addAmountParse],
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

      const usdValue = addAmount;

      startSuccessTx(
        handleSuccessTxMessageActionWithPair({
          action: 'add to position',
          token1: token1Data.symbol,
          token2: token2Data.symbol,
          txHash: hash,
          usdValue,
        })
      );
      setAddAmount('0');
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
  };
  const currentSPNFT = listSpNfts?.find(
    (item: any) => item.tokenId == spNFTTokenId
  );
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="600px">
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
      <div className="text-[15px] text-center text-2xl">
        <span className="text-[#E6B300] font-bold">Add</span> to your position
      </div>
      <div className="text-center text-secondary mb-5">
        Deposit more into this spNFT to increase your yield.
      </div>
      <div className="text-sm my-4">
        You need to own {token1Data.symbol} - {token2Data.symbol} LP tokens to
        directly add more liquidity to this position. If that’s not the case,
        head to the liquidity page that.
      </div>
      <div className="p-2 bg-blue-opacity-50  rounded-md text-sm">
        <div className="flex justify-between items-center">
          <div className="text-[#98A2B3] ">Amount</div>
          <input
            className="w-full bg-transparent border-none h-[auto] pl-3 text-sm  mb-2 mt-2 focus:outline-none placeholder-[#667085] text-right"
            placeholder="Enter value "
            value={addAmount}
            onChange={(event) => setAddAmount(event.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[#fff]">
            Balance: {balanceLP?.formatted} {token1Data.symbol} -{' '}
            {token2Data.symbol}
          </div>
          <Button
            className="w-[50px] h-[10px] rounded-none flex justify-center items-center text-xs"
            onClick={() => setAddAmount(balanceLP?.formatted || '0')}
          >
            Max
          </Button>
        </div>
      </div>
      {/* <div className="py-2 bg-blue-opacity-50">
        <div className="text-[#fff]">Estimates</div>
      </div> */}
      <div className="flex justify-between my-5 text-sm">
        <div>Current deposit</div>
        <div>
          {new BigNumber(currentSPNFT?.stakingPosition?.amount || 0)
            .div(new BigNumber(10).pow(18))
            .toFixed()}
        </div>
      </div>
      <div className="flex justify-between mb-5 text-sm">
        <div>Total APR</div>
        <div className="flex items-center">
          <div className="text-secondary">
            {' '}
            {farmBaseAPR.plus(feeAPR).toFixed(2)}%
          </div>
          <ArrowRight />
          <div className="text-primary">
            {farmBaseAPR.plus(feeAPR).times(3).toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="px-2 py-4 flex items-center bg-blue-opacity-50 text-sm">
        <Error stroke="#fff" />
        <div className="text-sm pl-2">
          By making a new deposit on this position, you will renew its lock for
          4 days from now
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
          onClick={handleAddToPosition}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
        >
          Add to Position
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default AddToPositionModal;
