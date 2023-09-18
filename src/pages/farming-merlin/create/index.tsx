import { Button } from '@/components/button/Button';
import CreateMerlinModal from '@/components/modal/CreateMerlinModal';
import SelectTokenModal from '@/components/modal/SelectTokenModal';
import Notification from '@/components/notification/Notification';
import Select from '@/components/select';
import BNBICon from '@/icons/BNBIcon';
import DividerDown from '@/icons/DividerDown';
import LiquidityIcon from '@/icons/LiquidityIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import Image from 'next/image';
import { CHAINS_TOKENS_LIST } from '@/utils/constants';
import { useState } from 'react';

enum MerlinPoolTypes {
  LP_V2 = 0,
  SINGLE_ASSET = 1,
}

const CreateMerlinPool = () => {
  const [type, setType] = useState<MerlinPoolTypes>(MerlinPoolTypes.LP_V2);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const [isOpenSelectTokenModal, setOpenSelectTokenModal] = useState(false);
  const toggleOpenSelectTokenModal = () => setOpenSelectTokenModal(!isOpenSelectTokenModal);

  const [tokenBeingSelected, setTokenBeingSelected] = useState<number>(0);
  const [token1, setToken1] = useState<any>(null);
  const [token2, setToken2] = useState<any>(null);

  // const handleOpenSelectTokenModal = () => {
  //   openModal ? openModal() : void 0;
  // };

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

  return (
    <>
      <CreateMerlinModal isOpen={open} toggleOpen={toggleOpen} />
      <SelectTokenModal
        isOpen={isOpenSelectTokenModal}
        toggleOpen={toggleOpenSelectTokenModal}
        selectValue={onSelectedToken}
      />
      <div className="max-w-[648px] w-[calc(100%-26px)] bg-dark rounded-lg h-auto my-[50px] lg:my-[96px] mx-auto py-4 px-[24px]">
        <div className="text-2xl font-bold mx-auto w-fit flex items-center gap-3">
          <SwapLeftIcon />
          Create Merlin Pool
          <SwapRightIcon />
        </div>
        <div className="text-[#98A2B3] text-sm mt-3 mb-2 font-semibold text-center">
          Custom-built infrastructure for Linea native public sales
        </div>
        <div className="flex bg-darkBlue mt-3 rounded-lg">
          <button
            className={`w-1/2 text-center py-3  rounded-md focus:outline-none font-semibold ${
              type === MerlinPoolTypes.LP_V2
                ? 'bg-[#FFAF1D] border border-[#FFAF1D] text-black'
                : ''
            }`}
            onClick={() => setType(MerlinPoolTypes.LP_V2)}
          >
            LP V2
          </button>
          <button
            className={`w-1/2 text-center py-3  rounded-md focus:outline-none font-semibold ${
              type === MerlinPoolTypes.SINGLE_ASSET
                ? 'bg-[#FFAF1D] border border-[#FFAF1D] text-black'
                : ''
            }`}
            onClick={() => setType(MerlinPoolTypes.SINGLE_ASSET)}
          >
            Single Asset
          </button>
        </div>
        <div className="flex gap-4 items-center mt-5">
          {type === MerlinPoolTypes.LP_V2 ? (
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
                  icon={token1?.logoURI ? (
                    <Image
                      alt="logo"
                      src={token1?.logoURI}
                      width={24}
                      height={24}
                    />
                  ) : (
                    <BNBICon />
                  )}
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
                  icon={token2?.logoURI ? (
                      <Image
                        alt="logo"
                        src={token2?.logoURI}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <BNBICon />
                    )}
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
                value={{ value: token1.address, label: token1.symbol }}
                icon={token1?.logoURI ? (
                  <Image
                    alt="logo"
                    src={token1?.logoURI}
                    width={24}
                    height={24}
                  />
                ) : (
                  <BNBICon />
                )}
                disabled
              />
            </div>
          )}
        </div>

        <Notification
          message="The spNFT for this asset has not been created yet! You will need to initialize the spNFT contact first."
          type="info"
          className="mt-3 mb-6"
        />
        <Button
          onClick={() => {
            toggleOpen();
          }}
          className="w-full justify-center  mb-2 px-[42px]"
          // disabled={
          //   !token1 || !token2 || !userAddress || !token1Amount || !token2Amount
          // }
        >
          Create Merlin
        </Button>
        <DividerDown />
      </div>
    </>
  );
};

export default CreateMerlinPool;
