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
import BigNumber from 'bignumber.js';
import { useAccount, useBalance } from 'wagmi';
import * as routerContract from '@/utils/routerContract';

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
  const { address } = useAccount();

  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenSetting, setOpenSetting] = useState<boolean>(false);
  const [tokenBeingSelected, setTokenBeingSelected] = useState<number>(0);
  const [token1, setToken1] = useState<any>();
  const [token2, setToken2] = useState<any>();
  const [token1Amount, setToken1Amount] = useState<string>('0');
  const [token2Amount, setToken2Amount] = useState<string>('0');

  console.log({ token1Amount, token2Amount });

  const { data: balanceToken1 } = useBalance({
    address,
    token: token1 ? (token1.address as `0x${string}`) : undefined,
    watch: true,
    cacheTime: 5000,
    formatUnits: 'ether',
  });

  const { data: balanceToken2 } = useBalance({
    address,
    token: token2 ? (token2.address as `0x${string}`) : undefined,
    watch: true,
    cacheTime: 5000,
    formatUnits: 'ether',
  });

  const toggleOpen = () => setOpen(!isOpen);
  const toggleOpenSetting = () => setOpenSetting(!isOpenSetting);

  const onSelectedToken = (token: any) => {
    if (tokenBeingSelected === 1) {
      setToken1(token);
    } else if (tokenBeingSelected === 2) {
      setToken2(token);
    }
  };

  const handleAction = async () => {
    await routerContract.getPair('', '');
    const bnToken1Amount = BigNumber(10)
      .pow(balanceToken1?.decimals!)
      .times(new BigNumber(token1Amount))
      .toFixed(0, BigNumber.ROUND_DOWN);
    const bnToken2Amount = BigNumber(10)
      .pow(balanceToken2?.decimals!)
      .times(new BigNumber(token2Amount))
      .toFixed(0, BigNumber.ROUND_DOWN);
    console.log({ bnToken1Amount, bnToken2Amount });
  };

  return (
    <>
      <SelectTokenModal
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        selectValue={onSelectedToken}
      />
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
        <TokenForm
          openModal={() => {
            setTokenBeingSelected(1);
            toggleOpen();
          }}
          title={inputTitle1}
          tokenData={{
            symbol: balanceToken1?.symbol!,
            balance: balanceToken1?.value!,
          }}
          setTokenAmount={(value) => setToken1Amount(value)}
        />
        <div className="mx-auto w-fit">{dividerIcon}</div>
        <TokenForm
          openModal={() => {
            setTokenBeingSelected(2);
            toggleOpen();
          }}
          title={inputTitle2}
          tokenData={{
            symbol: balanceToken2?.symbol!,
            balance: balanceToken2?.value!,
          }}
          setTokenAmount={(value) => setToken2Amount(value)}
        />
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
          onClick={() => handleAction()}
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
