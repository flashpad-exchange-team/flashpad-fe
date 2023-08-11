import { Button } from '@/components/button/Button';
import SelectTokenModal from '@/components/modal/SelectTokenModal';
import ButtonStyle from '@/icons/ButtonStyle';
import QuestionIcon from '@/icons/QuestionIcon';
import ReloadIcon from '@/icons/ReloadIcon';
import SettingIcon from '@/icons/SettingIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { useState } from 'react';
import LiquidityPairInfo from '../LiquidityPairInfo';
import TokenForm from '../TokenForm';

interface TradeFormProps {
  title: string;
  buttonName: string;
  inputTitle1: string;
  inputTitle2: string;
  dividerIcon: React.ReactNode;
}
const TradeForm = ({
  title,
  buttonName,
  inputTitle1,
  inputTitle2,
  dividerIcon,
}: TradeFormProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!isOpen);
  return (
    <>
      <SelectTokenModal isOpen={isOpen} toggleOpen={toggleOpen} />
      <div className="w-[648px] bg-[#00000080] rounded-lg h-auto my-[96px] mx-auto py-4 px-[24px]">
        <div className="text-[24px] text-bold mx-auto ] w-fit flex items-center gap-3">
          <SwapLeftIcon />
          {title}
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
        <TokenForm openModal={toggleOpen} title={inputTitle1} />
        <div className="mx-auto w-fit">{dividerIcon}</div>
        <TokenForm openModal={toggleOpen} title={inputTitle2} />
        <LiquidityPairInfo />

        <Button
          onClick={() => {}}
          className="w-full justify-center  mb-2"
          disabled
        >
          {buttonName}
        </Button>
        <ButtonStyle />
      </div>
    </>
  );
};

export default TradeForm;
