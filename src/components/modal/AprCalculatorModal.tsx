import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';
import DownloadIcon from '@/icons/DownloadIcon';
import Eligibility from '@/icons/Eligibility';

export interface LockManageModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
}

const AprCalculatorModal = ({ toggleOpen, isOpen }: LockManageModalProps) => {
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

        <div className="text-[15px] text-center text-2xl">
          $0.3 - <span className="text-[#E6B300]">1.43%</span> APR
        </div>
        <div className="text-center">
          This position has 0% pending farming rewards
        </div>
        <div className="flex px-10 py-2 justify-around">
          <div className="p-4 flex justify-center bg-blue-opacity-50">
            <DownloadIcon stroke={'#FFAF1D'} />
          </div>
          <div className="p-4 flex justify-center bg-blue-opacity-50">
            <DownloadIcon stroke={'#FFAF1D'} />
          </div>
          <div className="p-4 flex justify-center bg-blue-opacity-50">
            <DownloadIcon stroke={'#FFAF1D'} />
          </div>
          <div className="p-4 flex justify-center bg-blue-opacity-50">
            <DownloadIcon stroke={'#FFAF1D'} />
          </div>
          <div className="p-4 flex justify-center bg-blue-opacity-50">
            <DownloadIcon stroke={'#FFAF1D'} />
          </div>
        </div>
        <div className="text-center">More action</div>
        <div className="flex px-20 py-2 justify-around">
          <div className="p-4 ml-15 flex justify-center bg-blue-opacity-50">
            <DownloadIcon stroke={'#FFAF1D'} />
          </div>
          <div className="p-4 flex justify-center bg-blue-opacity-50">
            <DownloadIcon stroke={'#FFAF1D'} />
          </div>
          <div className="p-4 mr-15 flex justify-center bg-blue-opacity-50">
            <DownloadIcon stroke={'#FFAF1D'} />
          </div>
        </div>
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
            <div className="pl-2">No staked in a Nitro pool</div>
          </div>
          <div>-</div>
        </div>
        <div className="p-2 bg-blue-opacity-50 ">
          <div className="text-[#fff]">Data breakdown</div>
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div className="pl-2">Value</div>
          <div>-</div>
        </div>
        {/* <div className="flex justify-between items-center mt-2 bg-blue-opacity-50">
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
      </div> */}
        <div className="flex justify-between mt-2 items-center">
          <div className="pl-2">APR</div>
          <div>-</div>
        </div>
        {/* <div className="flex justify-between items-center bg-blue-opacity-50">
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
      </div> */}
        <div className="flex justify-between mt-2 items-center">
          <div className="pl-2">Pending rewards</div>
          <div>-</div>
        </div>
        {/* <div className="flex justify-between items-center bg-blue-opacity-50">
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
      </div> */}
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

export default AprCalculatorModal;
