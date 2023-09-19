import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';
import ArrowRight from '@/icons/ArrowRight';
import Error from '@/icons/Error';
import { Address } from 'viem';
import { useState } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { useAccount, useBalance } from 'wagmi';
import customToast from '../notification/customToast';
import BigNumber from 'bignumber.js';
import * as nftPoolContract from '@/utils/nftPoolContract';
import { waitForTransaction } from '@wagmi/core';
import { handleSuccessTxMessageCreatePositionAndLiquidity } from '../successTxMessage';

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
      message: 'Confirming your transaction. Please wait.',
    });

    const addAmountParse = BigNumber(addAmount).times(
      BigNumber(10).pow(balanceLP?.decimals!)
    );

    const txResult = await nftPoolContract.write(
      userAddress,
      nftPoolAddress!,
      'addToPosition',
      [spNFTTokenId, addAmountParse]
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

    const usdValue = addAmount;

    startSuccessTx(
      handleSuccessTxMessageCreatePositionAndLiquidity({
        action: 'add to position',
        token1: token1Data.symbol,
        token2: token2Data.symbol,
        txHash: hash,
        usdValue,
      })
    );
    setAddAmount('0');
  };
  const currentSPNFT = listSpNfts?.find(
    (item: any) => item.tokenId === spNFTTokenId
  );
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="600px">
      <div className="flex items-center justify-center w-full">
        <div className="text-sm mx-auto flex items-center justify-center">
          <div className="relative -mt-[30px]">
            <div className="absolute">
              <BNBICon size={34} />
            </div>
            <div className="absolute left-[25px]">
              <BNBICon size={34} />
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
          <div className="text-secondary">20.3%</div>
          <ArrowRight />
          <div className="text-primary">20.3%</div>
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
