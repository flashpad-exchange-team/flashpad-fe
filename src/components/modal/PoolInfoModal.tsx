import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';
import DownloadIcon from '@/icons/DownloadIcon';
import Eligibility from '@/icons/Eligibility';
import Withdrawal from '@/icons/Withdrawal';
import Lock from '@/icons/Lock';
import LaunchPadIcon from '@/icons/LaunchpadIcon';
import ChartBreakoutIcon from '@/icons/ChartBreakoutIcon';
import CreditCardMerge from '@/icons/CreditCardMerge';
import CreditCardSplit from '@/icons/CreditCardSplit';
import ArrowDown from '@/icons/ArrowDown';
import ArrowUp from '@/icons/ArrowUp';
import { useState } from 'react';

export interface PoolInfoModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
}

const PoolInfoModal = ({ toggleOpen, isOpen }: PoolInfoModalProps) => {
  const [isOpenMoreAction, setIsOpenMoreAction] = useState(true);
  const [isOpenValue, setIsOpenValue] = useState(true);
  const [isOpenApr, setIsOpenApr] = useState(true);
  const [isOpenRewards, setIsOpenRewards] = useState(true);
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="550px">
      <div className="text-sm">
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
              <div className="text-bold">Token A - Token B</div>
              <div className="text-xs font-normal">#ID-1644</div>
            </div>
          </div>
          <div className="cursor-pointer pb-[20px]" onClick={toggleOpen}>
            <CloseIcon />
          </div>
        </div>

        <div className="text-[24px] text-center text-2xl mb-2">
          $0.3 - <span className="text-[#E6B300]">1.43%</span> APR
        </div>
        <div className="text-center mb-2">
          This position has 0% pending farming rewards
        </div>
        <div className="flex px-10 py-2 justify-around">
          <div className="p-4 flex justify-center bg-blue-opacity-50 items-center">
            <DownloadIcon stroke={'#FFAF1D'} />
          </div>
          <div className="p-4 flex justify-center bg-blue-opacity-50 items-center">
            <Withdrawal />
          </div>
          <div className="p-4 flex justify-center bg-blue-opacity-50 items-center">
            <Lock />
          </div>
          <div className="p-4 flex justify-center bg-blue-opacity-50 items-center">
            <LaunchPadIcon active={true} />
          </div>
          <div className="p-4 flex justify-center bg-blue-opacity-50 items-center">
            <ChartBreakoutIcon stroke="#FFAF1D" />
          </div>
        </div>
        <div
          className="flex justify-center gap-2 mb-2 cursor-pointer"
          onClick={() => setIsOpenMoreAction(!isOpenMoreAction)}
        >
          <div>More action</div>
          {isOpenMoreAction ? (
            <ArrowDown stroke="#fff" />
          ) : (
            <ArrowUp stroke="#fff" />
          )}
        </div>
        {isOpenMoreAction && (
          <div className="flex px-20 py-2 justify-around mb-2">
            <div className="p-4 ml-15 flex justify-center bg-blue-opacity-50">
              <CreditCardMerge />
            </div>
            <div className="p-4 flex justify-center bg-blue-opacity-50">
              <CreditCardSplit />
            </div>
            <div className="p-4 mr-15 flex justify-center bg-blue-opacity-50">
              <CreditCardMerge />
            </div>
          </div>
        )}
        <div className="p-2 bg-blue-opacity-50 ">
          <div className="text-[#fff]">Properties</div>
        </div>
        <div className="flex justify-between items-center my-2">
          <div className="flex">
            <Eligibility />
            <div className="pl-2">Non yeild-bearing</div>
          </div>
          <div>-</div>
        </div>
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center">
            <Eligibility />
            <div className="pl-2">
              <div>Locked</div>
              <div className="text-xs text-secondary">1.61x Multiplier</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div>110D 21D 26min 35s</div>
            <div className="text-xs text-secondary">Remaining time</div>
          </div>
        </div>
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center">
            <CloseIcon />
            <div className="pl-2">Unboosted</div>
          </div>
          <div>-</div>
        </div>
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center">
            <CloseIcon />
            <div className="pl-2">No staked in a Merlin pool</div>
          </div>
          <div>-</div>
        </div>
        <div className="p-2 bg-blue-opacity-50 ">
          <div className="text-[#fff]">Data breakdown</div>
        </div>
        <div
          className="flex justify-between mt-2 items-center cursor-pointer"
          onClick={() => setIsOpenValue(!isOpenValue)}
        >
          <div className="pl-2 flex">
            <div>Value</div>
            {isOpenValue ? (
              <ArrowDown stroke="#fff" />
            ) : (
              <ArrowUp stroke="#fff" />
            )}
          </div>
          <div>-</div>
        </div>
        {isOpenValue && (
          <>
            <div className="flex justify-between items-center mt-2 bg-blue-opacity-50">
              <div className="pl-2">Name</div>
              <div className="flex items-center ">
                <div className="pl-1">($0.1)</div>
                <div className="pl-1">0.1</div>
                <div className="pl-1">
                  <BNBICon />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-blue-opacity-50">
              <div className="pl-2">Name</div>
              <div className="flex items-center ">
                <div className="pl-1">($0.1)</div>
                <div className="pl-1">0.1</div>
                <div className="pl-1">
                  <BNBICon />
                </div>
              </div>
            </div>
          </>
        )}
        <div
          className="flex justify-between mt-2 items-center cursor-pointer"
          onClick={() => setIsOpenApr(!isOpenApr)}
        >
          <div className="pl-2 flex">
            <div>APR</div>
            {isOpenApr ? (
              <ArrowDown stroke="#fff" />
            ) : (
              <ArrowUp stroke="#fff" />
            )}
          </div>
          <div>-</div>
        </div>
        {isOpenApr && (
          <>
            <div className="flex justify-between items-center bg-blue-opacity-50">
              <div className="pl-2">Name</div>
              <div className="flex items-center ">
                <div className="pl-1">($0.1)</div>
                <div className="pl-1">0.1</div>
                <div className="pl-1">
                  <BNBICon />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-blue-opacity-50">
              <div className="pl-2">Name</div>
              <div className="flex items-center ">
                <div className="pl-1">($0.1)</div>
                <div className="pl-1">0.1</div>
                <div className="pl-1">
                  <BNBICon />
                </div>
              </div>
            </div>
          </>
        )}
        <div
          className="flex justify-between mt-2 items-center cursor-pointer"
          onClick={() => setIsOpenRewards(!isOpenRewards)}
        >
          <div className="pl-2 flex">
            <div>Pending rewards</div>
            {isOpenRewards ? (
              <ArrowDown stroke="#fff" />
            ) : (
              <ArrowUp stroke="#fff" />
            )}
          </div>
          <div>-</div>
        </div>
        {isOpenRewards && (
          <>
            <div className="flex justify-between items-center bg-blue-opacity-50">
              <div className="pl-2">Name</div>
              <div className="flex items-center ">
                <div className="pl-1">($0.1)</div>
                <div className="pl-1">0.1</div>
                <div className="pl-1">
                  <BNBICon />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-blue-opacity-50">
              <div className="pl-2">Name</div>
              <div className="flex items-center ">
                <div className="pl-1">($0.1)</div>
                <div className="pl-1">0.1</div>
                <div className="pl-1">
                  <BNBICon />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-between mt-2 items-center bg-blue-opacity-50">
          <div className="pl-2">Farm rewards</div>
          <div>-</div>
        </div>

        <div className="block lg:flex items-center gap-2">
          <Button
            className="w-full justify-center mt-2 mb-2 px-[42px]"
            type="secondary"
            onClick={toggleOpen}
          >
            Cancel
          </Button>
          <Button className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]">
            Harvest
          </Button>
        </div>

        <DividerDown />
      </div>
    </CommonModal>
  );
};

export default PoolInfoModal;
