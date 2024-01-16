import { Button } from '@/components/button/Button';
import CreateThunderModal from '@/components/modal/CreateThunderModal';
import SelectTokenModal from '@/components/modal/SelectTokenModal';
import Notification from '@/components/notification/Notification';
import customToast from '@/components/notification/customToast';
import Select from '@/components/select';
import { useLoading } from '@/context/LoadingContext';
import { userNftPoolFactoryContractWrite } from '@/hooks/contract/userNftPoolFactoryContract';
import { allNftPoolsKey } from '@/hooks/useAllNftPoolsData';
import BNBICon from '@/icons/BNBIcon';
import DividerDown from '@/icons/DividerDown';
import LiquidityIcon from '@/icons/LiquidityIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import {
  ADDRESS_ZERO,
  APP_BASE_CHAIN,
  CHAINS_TOKENS_LIST,
  NFT_POOL_FACTORY_ADDRESS,
} from '@/utils/constants';
import * as erc20TokenContract from '@/utils/contract/erc20TokenContract';
import { handleError } from '@/utils/handleError';
import * as nftPoolFactoryContract from '@/utils/contract/nftPoolFactoryContract';
import * as routerContract from '@/utils/contract/routerContract';
import handleSwitchNetwork from '@/utils/switchNetwork';
import { waitForTransaction } from '@wagmi/core';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { Address, useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

enum ThunderPoolTypes {
  LP_V2 = 0,
  SINGLE_ASSET = 1,
}

const CreateThunderPool = () => {
  const { address: userAddress } = useAccount();
  const { startLoadingTx, stopLoadingTx } = useLoading();
  const { mutate } = useSWRConfig();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

  const [type, setType] = useState<ThunderPoolTypes>(ThunderPoolTypes.LP_V2);
  const [openCreateThunderModal, setOpenCreateThunderModal] = useState(false);
  const toggleOpenCreateThunderModal = () =>
    setOpenCreateThunderModal(!openCreateThunderModal);

  const [isOpenSelectTokenModal, setOpenSelectTokenModal] = useState(false);
  const toggleOpenSelectTokenModal = () =>
    setOpenSelectTokenModal(!isOpenSelectTokenModal);

  const [tokenBeingSelected, setTokenBeingSelected] = useState<number>(0);
  const [token1, setToken1] = useState<any>(null);
  const [token2, setToken2] = useState<any>(null);

  const [successful, setSuccessful] = useState(false);

  const [lpAddress, setLpAddress] = useState<Address | undefined>(undefined);
  const [lpTokenDecimals, setLpTokenDecimals] = useState(18);
  const [nftPoolAddress, setNftPoolAddress] = useState<Address | undefined>(
    undefined
  );

  const getPoolAddress = async () => {
    let lpAddress;
    if (type === ThunderPoolTypes.LP_V2) {
      if (!token1 || !token2) return;
      lpAddress = await routerContract.getPair(token1.address, token2.address);
      if (!lpAddress) return;
    } else {
      if (!token1) return;
      lpAddress = token1.address;
    }
    setLpAddress(lpAddress);
    const [decimals, address] = await Promise.all([
      erc20TokenContract.erc20Read(lpAddress, 'decimals', []),
      nftPoolFactoryContract.getPool(lpAddress),
    ]);
    setLpTokenDecimals(decimals || 18);
    setNftPoolAddress(address);
  };

  useEffect(() => {
    getPoolAddress();
  }, [type, token1, token2, successful]);

  const onSelectedToken = (token: any) => {
    if (tokenBeingSelected === 1) {
      if (token2?.address === token?.address) {
        setToken2(token1);
      }
      setToken1(token);
    } else if (tokenBeingSelected === 2) {
      if (token1?.address === token?.address) {
        setToken1(token2);
      }
      setToken2(token);
    }
  };

  const handleCreateThunderPool = async () => {
    try {
      if (chain?.id !== APP_BASE_CHAIN.id) {
        handleSwitchNetwork(switchNetwork);
        return;
      }

      if (!userAddress) {
        customToast({
          message: 'A wallet is not yet connected',
          type: 'error',
        });
        return;
      }

      if (!lpAddress) {
        customToast({
          message: 'Staking token address for spNFT pool is undefined',
          type: 'error',
        });
        return;
      }

      const nftPoolAddressOnFactory = await nftPoolFactoryContract.getPool(
        lpAddress
      );

      if (nftPoolAddressOnFactory && nftPoolAddressOnFactory === ADDRESS_ZERO) {
        startLoadingTx({
          tokenPairs: token1?.symbol + ' - ' + token2?.symbol,
          title: 'Creating spNFT pool ...',
          message: 'Confirming your transaction, please wait.',
        });

        const { writeContract: writeNftPoolFactoryContract, ABI } =
          userNftPoolFactoryContractWrite();

        const createPoolRes = await writeNftPoolFactoryContract({
          address: NFT_POOL_FACTORY_ADDRESS as Address,
          abi: ABI,
          functionName: 'createPool',
          args: [lpAddress!],
        });

        if (!createPoolRes) {
          stopLoadingTx();
          setSuccessful(false);
          return;
        }

        const hash = createPoolRes.hash;
        const txReceipt = await waitForTransaction({ hash });
        console.log({ txReceipt });

        mutate(allNftPoolsKey);
        stopLoadingTx();
        setSuccessful(true);
        customToast({
          message: 'Initialized spNFT pool successfully',
          type: 'success',
        });
      }

      setOpenCreateThunderModal(true);
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
  };

  const isFirstSpMinter = nftPoolAddress
    ? nftPoolAddress === ADDRESS_ZERO
    : undefined;

  return (
    <>
      <CreateThunderModal
        isOpen={openCreateThunderModal}
        toggleOpen={toggleOpenCreateThunderModal}
        nftPoolAddress={nftPoolAddress}
        token1Symbol={token1?.symbol}
        token2Symbol={token2?.symbol}
        lpTokenDecimals={lpTokenDecimals}
      />
      <SelectTokenModal
        isOpen={isOpenSelectTokenModal}
        toggleOpen={toggleOpenSelectTokenModal}
        selectValue={onSelectedToken}
      />
      <div className="max-w-[648px] w-[calc(100%-26px)] bg-dark rounded-lg h-auto my-[50px] lg:mt-[116px] lg:mb-[40px] mx-auto py-4 px-[24px]">
        <div className="text-2xl font-bold mx-auto w-fit flex items-center gap-3">
          <SwapLeftIcon />
          Create Thunder Pool
          <SwapRightIcon />
        </div>
        <div className="text-[#98A2B3] text-sm mt-3 mb-2 font-semibold text-center">
          Custom-built infrastructure for Linea native public sales
        </div>
        <div className="flex bg-darkBlue mt-3 rounded-lg">
          <button
            className={`w-1/2 text-center py-3  rounded-md focus:outline-none font-semibold ${
              type === ThunderPoolTypes.LP_V2
                ? 'bg-[#FFAF1D] border border-[#FFAF1D] text-black'
                : ''
            }`}
            onClick={() => setType(ThunderPoolTypes.LP_V2)}
          >
            LP V2
          </button>
          <button
            className={`w-1/2 text-center py-3  rounded-md focus:outline-none font-semibold ${
              type === ThunderPoolTypes.SINGLE_ASSET
                ? 'bg-[#FFAF1D] border border-[#FFAF1D] text-black'
                : ''
            }`}
            onClick={() => setType(ThunderPoolTypes.SINGLE_ASSET)}
          >
            Single Asset
          </button>
        </div>
        <div className="flex gap-4 items-center mt-5">
          {type === ThunderPoolTypes.LP_V2 ? (
            <>
              <div
                className="w-full justify-between lg:w-[260px]  rounded-md bg-[#150E39] px-2 py-2 flex items-center gap-2 text-sm lg:text-base "
                onClick={() => {
                  setTokenBeingSelected(1);
                  toggleOpenSelectTokenModal();
                }}
              >
                <Select
                  options={CHAINS_TOKENS_LIST}
                  value={{ value: token1?.address, label: token1?.symbol }}
                  icon={
                    token1?.logo_uri ? (
                      <Image
                        alt="logo"
                        src={token1.logo_uri}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <BNBICon />
                    )
                  }
                  disabled
                />
              </div>
              <div
                className="mx-auto w-fit cursor-pointer"
                // onClick={handleSwitchPair}
              >
                <LiquidityIcon />
              </div>
              <div
                className="w-full justify-between lg:w-[260px]  rounded-md bg-[#150E39] px-2 py-2 flex items-center gap-2 text-sm lg:text-base "
                onClick={() => {
                  setTokenBeingSelected(2);
                  toggleOpenSelectTokenModal();
                }}
              >
                <Select
                  options={CHAINS_TOKENS_LIST}
                  value={{ value: token2?.address, label: token2?.symbol }}
                  icon={
                    token2?.logo_uri ? (
                      <Image
                        alt="logo"
                        src={token2.logo_uri}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <BNBICon />
                    )
                  }
                  disabled
                />
              </div>
            </>
          ) : (
            <div
              className="w-full rounded-md bg-[#150E39] px-2 py-2 text-base "
              onClick={() => {
                setTokenBeingSelected(1);
                toggleOpenSelectTokenModal();
              }}
            >
              <Select
                options={CHAINS_TOKENS_LIST}
                value={{ value: token1?.address, label: token1?.symbol }}
                icon={
                  token1?.logo_uri ? (
                    <Image
                      alt="logo"
                      src={token1.logo_uri}
                      width={24}
                      height={24}
                    />
                  ) : (
                    <BNBICon />
                  )
                }
                disabled
              />
            </div>
          )}
        </div>
        {isFirstSpMinter && (
          <Notification
            message="The spNFT for this asset has not been created yet! You will need to initialize the spNFT contract first."
            type="info"
            className="mt-3 mb-6"
          />
        )}
        <Button
          onClick={handleCreateThunderPool}
          className="w-full justify-center mt-4 mb-2 px-[42px]"
          disabled={
            !userAddress ||
            (type === ThunderPoolTypes.LP_V2 ? !token1 || !token2 : !token1)
          }
        >
          {isFirstSpMinter ? 'Initialize' : 'Create Thunder'}
        </Button>
        <DividerDown />
      </div>
    </>
  );
};

export default CreateThunderPool;
