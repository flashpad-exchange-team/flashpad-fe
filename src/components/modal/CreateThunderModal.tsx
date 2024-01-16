import { useLoading } from '@/context/LoadingContext';
import { useThunderPoolFactoryContractWrite } from '@/hooks/contract/useThunderPoolFactoryContract';
import BNBICon from '@/icons/BNBIcon';
import CloseIcon from '@/icons/CloseIcon';
import DividerDown from '@/icons/DividerDown';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import {
  ADDRESS_ZERO,
  CHAINS_TOKENS_LIST,
  THUNDER_POOL_FACTORY_ADDRESS,
  daysToSeconds,
} from '@/utils/constants';
import { handleError } from '@/utils/handleError';
import * as thunderPoolFactoryContract from '@/utils/contract/thunderPoolFactoryContract';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { add, getUnixTime, isSameDay } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { Address } from 'viem';
import { useAccount } from 'wagmi';
import { Button } from '../button/Button';
import customToast from '../notification/customToast';
import Select from '../select';
import { handleSuccessTxMessageActionWithNoValue } from '../successTxMessage';
import Switch from '../switch/Switch';
import CommonModal from './CommonModal';
import SelectTokenModal from './SelectTokenModal';

export interface CreateThunderModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  nftPoolAddress?: Address;
  token1Symbol: string;
  token2Symbol: string;
  lpTokenDecimals: number;
}

const CreateThunderModal = ({
  toggleOpen,
  isOpen,
  nftPoolAddress,
  token1Symbol,
  token2Symbol,
  lpTokenDecimals,
}: CreateThunderModalProps) => {
  const { address: userAddress } = useAccount();
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();

  const [showOptionalRequirements, setShowOptionalRequirements] =
    useState(false);
  const toggleShowOptionalRequirements = () =>
    setShowOptionalRequirements(!showOptionalRequirements);

  const [showThisModal, setShowThisModal] = useState(true);
  const [isOpenSelectTokenModal, setOpenSelectTokenModal] = useState(false);

  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);
  const [harvestStartTime, setHarvestStartTime] = useState<any>(null);
  const [depositEndTime, setDepositEndTime] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [minLockDuration, setMinLockDuration] = useState('');
  const [minLockEndTime, setMinLockEndTime] = useState<any>(null);
  const [minDepositAmount, setMinDepositAmount] = useState('');
  const [isWhitelist, setWhitelist] = useState(false);

  const handleOpenSelectToken = () => {
    setOpenSelectTokenModal(!isOpenSelectTokenModal);
    setShowThisModal(!showThisModal);
  };

  const [tokenBeingSelected, setTokenBeingSelected] = useState<number>(0);
  const [token1, setToken1] = useState<any>(null);
  const [token2, setToken2] = useState<any>(null);

  const onSelectedToken = (token: any) => {
    if (tokenBeingSelected === 1) {
      if (token2?.address === token?.address) {
        setToken2(token1);
      }
      setToken1(token);
    } else if (tokenBeingSelected === 2) {
      if (token1?.address === token?.address) {
        setToken2(null);
        return;
      }
      setToken2(token);
    }
  };

  const handleClearToken2 = () => {
    setToken2(null);
  };

  const resetInput = () => {
    setToken1(null);
    setToken2(null);
    setStartTime(null);
    setEndTime(null);
    setHarvestStartTime(null);
    setDepositEndTime(null);
    setDescription('');
    setMinLockDuration('');
    setMinLockEndTime(null);
    setMinDepositAmount('');
    setWhitelist(false);
  };

  const handleCreateThunderPool = async () => {
    try {
      if (!userAddress) {
        customToast({
          message: 'A wallet is not yet connected',
          type: 'error',
        });
        return;
      }

      if (!token1) {
        customToast({
          message: 'Please select at least 1 incentive token for Thunder pool',
          type: 'error',
        });
        return;
      }

      if (!startTime || !endTime) {
        customToast({
          message: 'Start time & end time are required!',
          type: 'error',
        });
        return;
      }

      const rewardsToken1 = token1.address;
      const rewardsToken2 = token2?.address || ADDRESS_ZERO;

      const now = new Date();
      let dStartTime = new Date(startTime.startDate);
      if (isSameDay(now, dStartTime)) {
        dStartTime = add(now, { minutes: 10 });
      }
      const tsStartTime = getUnixTime(dStartTime);
      const tsEndTime = getUnixTime(new Date(endTime.startDate));

      const tsHarvestStartTime = harvestStartTime?.startDate
        ? getUnixTime(new Date(harvestStartTime.startDate))
        : 0;
      const tsDepositEndTime = depositEndTime?.startDate
        ? getUnixTime(new Date(depositEndTime.startDate))
        : 0;

      const settings: thunderPoolFactoryContract.ThunderPoolSettingsParams = {
        startTime: tsStartTime + '',
        endTime: tsEndTime + '',
        harvestStartTime: tsHarvestStartTime + '',
        depositEndTime: tsDepositEndTime + '',
        description,
      };

      if (showOptionalRequirements) {
        const nMinLockDuration = Number(minLockDuration);
        if (
          Number.isNaN(nMinLockDuration) ||
          !Number.isInteger(nMinLockDuration) ||
          nMinLockDuration <= 0
        ) {
          customToast({
            message: 'Please input valid min lock duration',
            type: 'error',
          });
          return;
        }

        const nMinDepositAmount = Number(minDepositAmount);
        if (Number.isNaN(nMinDepositAmount) || nMinDepositAmount < 0) {
          customToast({
            message: 'Please input valid min deposit amount',
            type: 'error',
          });
          return;
        }

        const tsMinLockEndTime = minLockEndTime?.startDate
          ? getUnixTime(new Date(minLockEndTime.startDate))
          : 0;

        settings.lockDurationReq = daysToSeconds(nMinLockDuration) + '';
        settings.lockEndReq = tsMinLockEndTime + '';
        settings.depositAmountReq = BigNumber(nMinDepositAmount)
          .times(BigNumber(10).pow(lpTokenDecimals))
          .toString();
        settings.whitelist = isWhitelist;
      } else {
        settings.lockDurationReq = '0';
        settings.lockEndReq = '0';
        settings.depositAmountReq = '0';
        settings.whitelist = false;
      }

      startLoadingTx({
        tokenPairs: token1Symbol + ' - ' + token2Symbol,
        title: 'Creating Thunder Pool ...',
        message: 'Confirming your transaction, please wait.',
      });

      const { writeContract, ABI } = useThunderPoolFactoryContractWrite();

      const txResult = await writeContract({
        address: THUNDER_POOL_FACTORY_ADDRESS as Address,
        abi: ABI,
        functionName: 'createThunderPool',
        args: [
          nftPoolAddress!,
          rewardsToken1 as Address,
          rewardsToken2 as Address,
          settings,
        ],
      });

      if (!txResult) {
        stopLoadingTx();
        return;
      }

      const hash = txResult.hash;
      const txReceipt = await waitForTransaction({ hash });
      console.log({ txReceipt });
      resetInput();
      stopLoadingTx();

      startSuccessTx(
        handleSuccessTxMessageActionWithNoValue({
          action: 'created a new Thunder pool',
          txHash: hash,
        })
      );
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
  };

  return (
    <>
      <SelectTokenModal
        isOpen={isOpenSelectTokenModal}
        toggleOpen={handleOpenSelectToken}
        selectValue={onSelectedToken}
      />
      <CommonModal isOpen={isOpen && showThisModal} onRequestClose={toggleOpen}>
        <div className="flex items-center justify-between w-full">
          <div className="text-2xl text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
            <SwapLeftIcon />
            Create Thunder Pool
            <SwapRightIcon />
          </div>
          <div className="cursor-pointer" onClick={toggleOpen}>
            <CloseIcon />
          </div>
        </div>
        <div className="text-[16px] font-bold">General settings</div>
        <div className="flex gap-10 justify-center mt-2 mb-4">
          <div className="w-full justify-between lg:w-[260px]  rounded-md bg-[#150E39] px-2 py-2 flex-col items-center gap-2 text-sm lg:text-base ">
            <div className="mb-2 pl-1">
              Incentive token #1 <span className="text-[red]">*</span>
            </div>
            <div
              onClick={() => {
                setTokenBeingSelected(1);
                handleOpenSelectToken();
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
                      width={36}
                      height={36}
                    />
                  ) : (
                    <BNBICon size="36" />
                  )
                }
                disabled
              />
            </div>
          </div>
          <div className="flex items-center">-</div>
          <div className="w-full justify-between lg:w-[260px]  rounded-md bg-[#150E39] px-2 py-2 flex-col items-center gap-2 text-sm lg:text-base ">
            <div className="mb-2 pl-1 flex justify-between">
              Incentive token #2
              <span
                className="text-[#FFAF1D] hover:underline cursor-pointer"
                onClick={handleClearToken2}
              >
                Clear
              </span>
            </div>
            <div
              onClick={() => {
                setTokenBeingSelected(2);
                handleOpenSelectToken();
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
                      width={36}
                      height={36}
                    />
                  ) : (
                    <BNBICon size="36" />
                  )
                }
                disabled
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <div className="text-[15px] w-[180px]">
            Start time<span className="text-[red]">*</span>
          </div>
          <Datepicker
            useRange={false}
            asSingle={true}
            value={startTime}
            minDate={new Date()}
            onChange={(newVal: any) => {
              setStartTime(newVal);
            }}
          />
        </div>
        <div className="flex items-center justify-between my-3">
          <div className="text-[15px] w-[180px]">
            End time<span className="text-[red]">*</span>
          </div>
          <Datepicker
            useRange={false}
            asSingle={true}
            value={endTime}
            minDate={
              startTime
                ? add(new Date((startTime as any).startDate), { days: 1 })
                : new Date()
            }
            onChange={(newVal: any) => {
              setEndTime(newVal);
            }}
          />
        </div>
        <div className="flex items-center justify-between my-3">
          <div className="text-[15px] w-[180px]">Harvest start time</div>
          <Datepicker
            useRange={false}
            asSingle={true}
            value={harvestStartTime}
            minDate={
              startTime
                ? add(new Date((startTime as any).startDate), { days: 1 })
                : new Date()
            }
            onChange={(newVal: any) => setHarvestStartTime(newVal)}
          />
        </div>
        <div className="flex items-center justify-between my-3">
          <div className="text-[15px] w-[180px]">Deposit end time</div>
          <Datepicker
            useRange={false}
            asSingle={true}
            value={depositEndTime}
            minDate={
              startTime
                ? add(new Date((startTime as any).startDate), { days: 1 })
                : new Date()
            }
            onChange={(newVal: any) => setDepositEndTime(newVal)}
          />
        </div>
        <div className="text-[15px] my-2">Description (max 255 char)</div>
        <textarea
          className="w-full rounded-md min-h-[100px] bg-darkBlue text-sm p-3"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <div className="flex items-center justify-between my-2">
          <div className="text-[16px] font-bold">Requirements</div>
          <Switch
            toggle={toggleShowOptionalRequirements}
            enabled={showOptionalRequirements}
          />
        </div>
        {showOptionalRequirements && (
          <>
            <div className="flex justify-between mb-2">
              <div className="flex text-[15px] items-center">
                Min lock duration
              </div>
              <div className="flex gap-3">
                <Button
                  className="flex rounded-md text-[white] justify-center bg-blue-opacity-50 items-center rounded-[4px] w-[52px]"
                  onClick={() => {
                    if (minLockDuration > '0') {
                      setMinLockDuration(Number(minLockDuration) - 1 + '');
                    }
                  }}
                >
                  -
                </Button>
                <input
                  className="w-[100px] bg-blue-opacity-50 rounded-mdh-[52px] pl-4 text-[15px] text-[#FFAF1D] font-semibold py-2 focus:outline-none placeholder-[#667085]"
                  placeholder="0"
                  value={minLockDuration}
                  onChange={(ev) => setMinLockDuration(ev.target.value)}
                />
                <div className="flex items-center rounded-md bg-blue-opacity-50 w-[80px] justify-end px-6 py-2">
                  <div>Days</div>
                </div>
                <Button
                  className="rounded-md flex justify-center items-center rounded-[4px] w-[52px]"
                  onClick={() => {
                    setMinLockDuration(Number(minLockDuration) + 1 + '');
                  }}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between my-3">
              <div className="text-[15px] w-[180px]">Min lock endtime</div>
              <Datepicker
                useRange={false}
                asSingle={true}
                value={minLockEndTime}
                minDate={
                  startTime
                    ? add(new Date((startTime as any).startDate), { days: 1 })
                    : new Date()
                }
                onChange={(newVal: any) => setMinLockEndTime(newVal)}
              />
            </div>
            <div className="flex items-center justify-between my-3">
              <div className="text-[15px] w-[180px]">Min deposit amount</div>
              <input
                className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
                placeholder="Enter value"
                value={minDepositAmount}
                onChange={(ev) => setMinDepositAmount(ev.target.value)}
              />
            </div>
            <div className="flex items-center justify-between my-2">
              <div className="text-[15px] ">Whitelist only</div>
              <Switch
                toggle={() => setWhitelist(!isWhitelist)}
                enabled={isWhitelist}
              />
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
            onClick={handleCreateThunderPool}
            disabled={!userAddress || !token1 || !startTime || !endTime}
          >
            Create
          </Button>
        </div>

        <DividerDown />
      </CommonModal>
    </>
  );
};

export default CreateThunderModal;
