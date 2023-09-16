import BNBICon from '@/icons/BNBIcon';
import CloseIcon from '@/icons/CloseIcon';
import DividerDown from '@/icons/DividerDown';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { useState } from 'react';
import DatePicker from 'tailwind-datepicker-react';
import { Button } from '../button/Button';
import Switch from '../switch/Switch';
import CommonModal from './CommonModal';
const options = {
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  theme: {
    background: 'dark:bg-gray-800',
    todayBtn: '',
    clearBtn: '',
    icons: '',
    text: '',
    disabledText: '',
    input:
      ' dark:bg-darkBlue dark:h-[44px] dark:rounded-md focus:outline-none border-none',
    inputIcon: '',
    selected: '',
  },
  datepickerClassNames: 'top-12',
  defaultDate: undefined,
  language: 'en',
};
export interface ICreateMerlins {
  slippage: number;
  deadline: number;
  maxHops: number;
}

export interface CreateMerlinModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
}

const CreateMerlinModal = ({ toggleOpen, isOpen }: CreateMerlinModalProps) => {
  const [show, setShow] = useState(false);
  const [isDepositEndTime, setDepositEndTime] = useState(false);

  const toggleIsDepositEndTime = () => setDepositEndTime(!isDepositEndTime);

  const handleChange = (selectedDate: Date) => {
    console.log(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen}>
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          Create Merlin Pool
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[15px]">General settings</div>
      <div className="flex gap-10 justify-center mt-2 mb-4">
        <div className="flex items-center gap-2">
          <BNBICon size="36" />
          Token 1
        </div>
        <div className="flex items-center gap-2">
          <BNBICon size="36" />
          Token 2
        </div>
      </div>
      <div className="flex items-center justify-between my-3">
        <div className="text-[15px] w-[180px]">Start time</div>
        <DatePicker
          onChange={handleChange}
          show={show}
          setShow={handleClose}
          options={options}
        />
      </div>
      <div className="flex items-center justify-between my-3">
        <div className="text-[15px] w-[180px]">End time</div>
        <DatePicker
          onChange={handleChange}
          show={show}
          setShow={handleClose}
          options={options}
        />
      </div>
      <div className="flex items-center justify-between my-3">
        <div className="text-[15px] w-[180px]">Harvest start time</div>
        <DatePicker
          onChange={handleChange}
          show={show}
          setShow={handleClose}
          options={options}
        />
      </div>
      <div className="flex items-center justify-between my-3">
        <div className="text-[15px] w-[180px]">Harvest end time</div>
        <DatePicker
          onChange={handleChange}
          show={show}
          setShow={handleClose}
          options={options}
        />
      </div>
      <div className="text-[15px] my-2">Description (max 255 char)</div>
      <textarea className="w-full rounded-md min-h-[100px] bg-darkBlue text-sm p-3" />
      <div className="flex items-center justify-between my-2">
        <div className="text-[15px] ">Deposit end time</div>
        <Switch toggle={toggleIsDepositEndTime} open={isDepositEndTime} />
      </div>
      {isDepositEndTime && (
        <>
          <div className="flex justify-between mb-2">
            <div className="text-[15px]">Lock duration</div>
            <div className="text-[#E6B300] text-sm">Set max</div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center bg-blue-opacity-50 justify-center px-6 py-2 mr-2">
              -
            </div>
            <div className="flex items-center bg-blue-opacity-50 w-[40%] justify-end px-6 py-2">
              <span className="text-[#E6B300] mr-4">0</span> Days
            </div>
            <div className="flex items-center bg-blue-opacity-50 w-[40%] justify-end px-6 py-2">
              <span className="text-[#E6B300] mr-4">0</span> Months
            </div>
            <div>
              <Button className="w-[60px] rounded-none flex justify-center items-center rounded-[4px]">
                +
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between my-3">
            <div className="text-[15px] w-[180px]">Min lock endtime</div>
            <DatePicker
              onChange={handleChange}
              show={show}
              setShow={handleClose}
              options={options}
            />
          </div>
          <div className="flex items-center justify-between my-3">
            <div className="text-[15px] w-[180px]">Min lock deposit amount</div>
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Enter value "
            />
          </div>
          <div className="flex items-center justify-between my-2">
            <div className="text-[15px] ">Whitelist only</div>
            <Switch toggle={toggleIsDepositEndTime} open={isDepositEndTime} />
          </div>
        </>
      )}
      <div className="block lg:flex items-center gap-2">
        <Button
          className="w-full justify-center mt-2 mb-2 px-[42px]"
          type="secondary"
        >
          Reset to default
        </Button>
        <Button className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]">
          Save settings
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default CreateMerlinModal;
