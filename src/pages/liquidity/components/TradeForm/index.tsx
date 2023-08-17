import { Button } from '@/components/button/Button';
import SelectTokenModal from '@/components/modal/SelectTokenModal';
import ButtonStyle from '@/icons/ButtonStyle';
import QuestionIcon from '@/icons/QuestionIcon';
import ReloadIcon from '@/icons/ReloadIcon';
import SettingIcon from '@/icons/SettingIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { useEffect, useState } from 'react';
import LiquidityPairInfo from '../LiquidityPairInfo';
import TokenForm from '../TokenForm';
import Notification from '@/components/notification/Notification';
import LiquiditySettingModal from '@/components/modal/LiquiditySettingModal';
import BigNumber from 'bignumber.js';
import { useAccount, useBalance } from 'wagmi';
import * as routerContract from '@/utils/routerContract';
import * as factoryContract from '@/utils/factoryContract';
import * as web3Helpers from '@/utils/web3Helpers';
import { ADDRESS_ZERO, K_1_DAY, K_5_MIN } from '@/utils/constants';

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
  const { address: userAddress, isConnected } = useAccount();

  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenSetting, setOpenSetting] = useState<boolean>(false);
  const [tokenBeingSelected, setTokenBeingSelected] = useState<number>(0);
  const [token1, setToken1] = useState<any>(null);
  const [token2, setToken2] = useState<any>(null);
  const [token1Amount, setToken1Amount] = useState<string>('0');
  const [token2Amount, setToken2Amount] = useState<string>('0');
  const [insufficient, setInsufficient] = useState(false);
  const [isFirstLP, setIsFirstLP] = useState(false);

  const { data: balanceToken1 } = useBalance({
    address: userAddress,
    token: token1 ? (token1.address as `0x${string}`) : undefined,
    watch: true,
  });

  const { data: balanceToken2 } = useBalance({
    address: userAddress,
    token: token2 ? (token2.address as `0x${string}`) : undefined,
    watch: true,
  });

  const toggleOpen = () => setOpen(!isOpen);
  const toggleOpenSetting = () => setOpenSetting(!isOpenSetting);

  const getPairAddress = async () => {
    if (!token1 || !token2) return;
    const address = await factoryContract.getPair(
      token1.address,
      token2.address
    );
    console.log({ factoryPairAddress: address });
    if (!address || address === ADDRESS_ZERO) {
      setIsFirstLP(true);
    }
  };

  useEffect(() => {
    getPairAddress();
  }, [token1, token2]);

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

  const handleAddLiquidity = async () => {
    const bnToken1Amount = BigNumber(10)
      .pow(balanceToken1?.decimals!)
      .times(new BigNumber(token1Amount));
    // .toFixed(0, BigNumber.ROUND_DOWN);
    const bnToken2Amount = BigNumber(10)
      .pow(balanceToken2?.decimals!)
      .times(new BigNumber(token2Amount));
    // .toFixed(0, BigNumber.ROUND_DOWN);

    if (
      bnToken1Amount.isNaN() ||
      bnToken2Amount.isNaN() ||
      bnToken1Amount.isZero() ||
      bnToken2Amount.isZero()
    ) {
      alert('Please input valid amount');
      return;
    }

    if (
      bnToken1Amount.isGreaterThan(
        BigNumber(balanceToken1!.value.toString())
      ) ||
      bnToken2Amount.isGreaterThan(BigNumber(balanceToken2!.value.toString()))
    ) {
      setInsufficient(true);
      return;
    }
    setInsufficient(false);

    const { timestamp } = await web3Helpers.getBlock();
    const result = await routerContract.addLiquidity(
      token1.address,
      token2.address,
      bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN),
      bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN),
      bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN),
      bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN),
      userAddress,
      timestamp + K_5_MIN + '',
      timestamp + K_1_DAY + ''
    );
    console.log({ result });
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
            symbol: token1 ? balanceToken1?.symbol! : '',
            balance: token1 ? balanceToken1?.formatted! : '?',
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
            symbol: token2 ? balanceToken2?.symbol! : '',
            balance: token2 ? balanceToken2?.formatted! : '?',
          }}
          setTokenAmount={(value) => setToken2Amount(value)}
        />
        <LiquidityPairInfo
          isFirstLP={isFirstLP}
          token1Address={token1?.address}
          token2Address={token2?.address}
          token1Symbol={token1?.symbol}
          token2Symbol={token2?.symbol}
        />
        {insufficient && (
          <Notification message="Error: Insufficient Balance" type="error" />
        )}
        {isConnected && (
          <Notification message="Wallet connected" type="success" />
        )}
        {isFirstLP && (
          <Notification
            message="You are the first liquidity provider! The token ratio that you choose here will set the price on this pool."
            type="info"
          />
        )}
        {(token1?.symbol === 'AIDOGE' || token2?.symbol === 'AIDOGE') && (
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
        )}

        <Button
          onClick={() => handleAddLiquidity()}
          className="w-full justify-center  mb-2"
          disabled={!token1 || !token2}
        >
          {buttonName}
        </Button>
        <ButtonStyle />
      </div>
    </>
  );
};

export default TradeForm;
