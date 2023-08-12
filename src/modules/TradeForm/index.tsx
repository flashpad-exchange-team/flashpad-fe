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
import Notification from '@/components/notification/Notification';
import LiquiditySettingModal from '@/components/modal/LiquiditySettingModal';

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
  const [isOpenSetting, setOpenSetting] = useState<boolean>(false);

  const toggleOpen = () => setOpen(!isOpen);
  const toggleOpenSetting = () => setOpenSetting(!isOpenSetting);

  return (
    <>
      <SelectTokenModal isOpen={isOpen} toggleOpen={toggleOpen} />
      <LiquiditySettingModal
        isOpen={isOpenSetting}
        toggleOpen={toggleOpenSetting}
      />

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
            <SettingIcon onClick={toggleOpenSetting} />
          </div>
        </div>
        <TokenForm openModal={toggleOpen} title={inputTitle1} />
        <div className="mx-auto w-fit">{dividerIcon}</div>
        <TokenForm openModal={toggleOpen} title={inputTitle2} />
        <LiquidityPairInfo />
        <Notification message="Error: Insufficient Balance" type="error" />
        <Notification message="Wallet connected" type="success" />
        <Notification
          message="You are the first liquidity provider! The token ratio that you choose here will set the price on this pool."
          type="info"
        />
        <Notification
          message={
            <div className="text-[#F04438]">
              The AIDOGE token has a custom transfer tax that can prevent you
              from swapping, you might need to significantly increase your
              slippage and only use the V2 swap mode.
            </div>
          }
          type="error"
          hideIcon
        />

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
