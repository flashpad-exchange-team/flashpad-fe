import QuestionIcon from '@/icons/QuestionIcon';
import ReloadIcon from '@/icons/ReloadIcon';
import SettingIcon from '@/icons/SettingIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import TokenForm from '../TokenForm';
import DividerIcon from '@/icons/DividerIcon';
import { Button } from '@/components/button/Button';
import ButtonStyle from '@/icons/ButtonStyle';
import LiquidityPairInfo from '../LiquidityPairInfo';
import { useState } from 'react';
import SelectTokenModal from '@/components/modal/SelectTokenModal';

const LiquidityForm = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!isOpen);
  return (
    <>
      <SelectTokenModal isOpen={isOpen} toggleOpen={toggleOpen} />
      <div className="w-[648px] bg-[#00000080] rounded-lg h-auto my-[96px] mx-auto py-4 px-[24px]">
        <div className="text-[24px] text-bold mx-auto ] w-fit flex items-center gap-3">
          <SwapLeftIcon />
          Liquidity
          <SwapRightIcon />
        </div>
        <div className=" flex items-center gap-2 mt-8 justify-between">
          <div className="text-[#FFAF1D] text-semibold flex items-center gap-2 ">
            V2 MODE
            <QuestionIcon />
          </div>

          <div className="flex items-center gap-6">
            <ReloadIcon />
            <SettingIcon />
          </div>
        </div>
        <TokenForm openModal={toggleOpen} />
        <div className="mx-auto w-fit">
          <DividerIcon />
        </div>
        <TokenForm openModal={toggleOpen} />
        <LiquidityPairInfo />

        <Button
          onClick={() => {}}
          className="w-full justify-center  mb-2"
          disabled
        >
          {' '}
          Add Liquidity
        </Button>
        <ButtonStyle />
      </div>
    </>
  );
};

export default LiquidityForm;
