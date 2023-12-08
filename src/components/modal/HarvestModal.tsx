import { useLoading } from '@/context/LoadingContext';
import { useNftPoolContractWrite } from '@/hooks/contract/useNftPoolContract';
import BNBICon from '@/icons/BNBIcon';
import CloseIcon from '@/icons/CloseIcon';
import DividerDown from '@/icons/DividerDown';
import { handleError } from '@/utils/handleError';
import { waitForTransaction } from '@wagmi/core';
import Image from 'next/image';
import { Address } from 'viem';
import { useAccount, useBalance } from 'wagmi';
import { Button } from '../button/Button';
import customToast from '../notification/customToast';
import { handleSuccessTxMessageActionWithNoValue } from '../successTxMessage';
import CommonModal from './CommonModal';

export interface HarvestModalProps {
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

const HarvestModal = ({
  toggleOpen,
  isOpen,
  lpAddress,
  nftPoolAddress,
  token1Data,
  token2Data,
  refetchData,
  spNFTTokenId,
}: HarvestModalProps) => {
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  const { address: userAddress } = useAccount();
  const { data: balanceLP } = useBalance({
    address: isOpen ? userAddress : undefined,
    token: lpAddress,
    watch: true,
  });
  const handleHarvestPosition = async () => {
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
        title: 'Harvesting your stake position ...',
        message: 'Confirming your transaction, please wait.',
      });

      const { writeContract: writeNftPoolContract, ABI } =
        useNftPoolContractWrite();

      const txResult = await writeNftPoolContract({
        address: nftPoolAddress!,
        abi: ABI,
        functionName: 'harvestPosition',
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

      startSuccessTx(
        handleSuccessTxMessageActionWithNoValue({
          action: 'harvest position',
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
        <span className="text-[#E6B300]">Harvest</span> from your position
      </div>
      <div className="text-center text-secondary mb-5">
        Recover underlying tokens from a spNFT
      </div>
      <div className="p-2 bg-blue-opacity-50">
        <div className="">All Rewards</div>
        <div className="text-secondary text-sm py-2">
          Harvest farming and Thunder rewards
        </div>
      </div>

      <div className="p-2 bg-blue-opacity-50 flex justify-between items-center mt-4">
        <div>
          <div className="">spNFT Rewards</div>
          <div className="text-secondary text-sm py-2">
            Harvest farming and Thunder rewards
          </div>
        </div>
        <div className="text-[#E6B300]">
          <span>0.00</span>
        </div>
      </div>
      {/* 
      <div className="p-2 my-4 mb-5 bg-blue-opacity-50 ">Rewards breakdown</div> */}

      {/* <div className="flex justify-between p-2 bg-blue-opacity-50">
        <div className="flex items-end">
          <div>Name</div>
          <div className="pl-2 text-secondary text-xs">Farm</div>
        </div>
        <div className="flex items-center">
          <div className="text-secondary pr-1">
            ($<span></span>0.01)
          </div>
          <div className="pr-1">&lt;0.0000001</div>
          <div>
            <BNBICon />
          </div>
        </div>
      </div>
      <div className="flex justify-between p-2 bg-blue-opacity-50">
        <div className="flex items-end">
          <div>Name</div>
          <div className="pl-2 text-secondary text-xs">Farm</div>
        </div>
        <div className="flex items-center">
          <div className="text-secondary pr-1">
            ($<span></span>0.01)
          </div>
          <div className="pr-1">&lt;0.0000001</div>
          <div>
            <BNBICon />
          </div>
        </div>
      </div> */}

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
          onClick={handleHarvestPosition}
        >
          Harvest
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default HarvestModal;
