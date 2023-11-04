import ArrowRight from '@/icons/ArrowRight';
import BNBICon from '@/icons/BNBIcon';
import CloseIcon from '@/icons/CloseIcon';
import DividerDown from '@/icons/DividerDown';
import { Address } from 'viem';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';

import { useLoading } from '@/context/LoadingContext';
import { useNftPoolContractWrite } from '@/hooks/contract/useNftPoolContract';
import { handleError } from '@/utils/handleError';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import { useAccount, useBalance } from 'wagmi';
import customToast from '../notification/customToast';
import { handleSuccessTxMessageActionWithNoValue } from '../successTxMessage';
export interface LockPositionModalProps {
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

const LockPositionModal = ({
  toggleOpen,
  isOpen,
  lpAddress,
  nftPoolAddress,
  token1Data,
  token2Data,
  refetchData,
  spNFTTokenId,
  feeAPR,
  farmBaseAPR,
}: LockPositionModalProps) => {
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  const { address: userAddress } = useAccount();
  const { data: balanceLP } = useBalance({
    address: isOpen ? userAddress : undefined,
    token: lpAddress,
    watch: true,
  });
  const handleRenewLock = async () => {
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
        title: 'Renewing the lock of your stake position ...',
        message: 'Confirming your transaction, please wait.',
      });

      const { writeContract: writeNftPoolContract, ABI } =
        useNftPoolContractWrite();

      const txResult = await writeNftPoolContract({
        address: nftPoolAddress!,
        abi: ABI,
        functionName: 'renewLockPosition',
        args: [spNFTTokenId],
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
      toggleOpen();
      startSuccessTx(
        handleSuccessTxMessageActionWithNoValue({
          action: 'renew your lock',
          token1: token1Data.symbol,
          token2: token2Data.symbol,
          txHash: hash,
        })
      );
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
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
        <span className="text-[#E6B300] font-bold">Renew</span> the lock of your
        position
      </div>
      <div className="text-center text-secondary mb-5 text-sm">
        Provide long-tern liquidity to increase your yield
      </div>
      {/* <div className="p-2 bg-blue-opacity-50 text-sm">
        <div className="text-[#fff]">Settings</div>
      </div> */}

      <div className="text-right text-secondary text-sm">
        4.37% lock bonus (x1.04)
      </div>
      <div className="px-2 py-3 bg-blue-opacity-50 my-4 rounded-md text-sm">
        <div className="text-[#fff]">Estimates</div>
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
      <div className="flex justify-between my-3 text-sm">
        <div>Farm Base APR</div>
        <div> {farmBaseAPR.toFixed(2)}%</div>
      </div>
      <div className="flex justify-between my-3 text-sm">
        <div>Earned fees APR</div>
        <div className="flex items-center">
          <div className="text-secondary">{feeAPR.toFixed(2)}%</div>
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
          onClick={handleRenewLock}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
        >
          Renew
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default LockPositionModal;
