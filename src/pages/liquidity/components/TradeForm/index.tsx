import { Button } from '@/components/button/Button';
import LiquiditySettingModal from '@/components/modal/LiquiditySettingModal';
import SelectTokenModal from '@/components/modal/SelectTokenModal';
import Notification from '@/components/notification/Notification';
import { useLoading } from '@/context/LoadingContext';
import ButtonStyle from '@/icons/ButtonStyle';
import QuestionIcon from '@/icons/QuestionIcon';
import ReloadIcon from '@/icons/ReloadIcon';
import SettingIcon from '@/icons/SettingIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import {
  ADDRESS_ZERO,
  ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET,
  K_1_DAY,
  K_5_MIN,
  MAX_UINT256,
} from '@/utils/constants';
import * as erc20TokenContract from '@/utils/erc20TokenContract';
import * as factoryContract from '@/utils/factoryContract';
import * as routerContract from '@/utils/routerContract';
import * as web3Helpers from '@/utils/web3Helpers';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Address } from 'viem';
import { useAccount, useBalance } from 'wagmi';
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
  const { address: userAddress } = useAccount();
  const { startLoading, stopLoading } = useLoading();

  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenSetting, setOpenSetting] = useState<boolean>(false);
  const [tokenBeingSelected, setTokenBeingSelected] = useState<number>(0);
  const [token1, setToken1] = useState<any>(null);
  const [token2, setToken2] = useState<any>(null);
  const [token1Amount, setToken1Amount] = useState<string>('0');
  const [token2Amount, setToken2Amount] = useState<string>('0');
  const [insufficient, setInsufficient] = useState(false);
  const [isFirstLP, setIsFirstLP] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [failed, setFailed] = useState(false);

  const { data: balanceToken1 } = useBalance({
    address: userAddress,
    token: token1 ? (token1.address as Address) : undefined,
    watch: true,
  });

  const { data: balanceToken2 } = useBalance({
    address: userAddress,
    token: token2 ? (token2.address as Address) : undefined,
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
      return;
    }
    setIsFirstLP(false);
  };

  useEffect(() => {
    getPairAddress();
  }, [token1, token2, successful]);

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

    const bnToken2Amount = BigNumber(10)
      .pow(balanceToken2?.decimals!)
      .times(new BigNumber(token2Amount));

    if (
      bnToken1Amount.isNaN() ||
      bnToken2Amount.isNaN() ||
      bnToken1Amount.isZero() ||
      bnToken2Amount.isZero()
    ) {
      toast.error('Please input valid amount');
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

    startLoading();

    const token1Allowance = (await erc20TokenContract.erc20Read(
      token1.address,
      'allowance',
      [userAddress, ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET]
    )) as bigint;
    console.log({ token1Allowance: token1Allowance.toString() });

    if (token1Allowance.toString() < MAX_UINT256) {
      const approveRes = await erc20TokenContract.erc20Write(
        userAddress!,
        token1.address,
        'approve',
        [ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET, MAX_UINT256]
      );
      if (!approveRes) {
        setSuccessful(false);
        setFailed(true);
        return;
      }

      const hash = approveRes.hash;
      const txReceipt = await waitForTransaction({ hash });
      console.log({ txReceipt });
    }

    const token2Allowance = (await erc20TokenContract.erc20Read(
      token2.address,
      'allowance',
      [userAddress, ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET]
    )) as bigint;
    console.log({ token2Allowance: token2Allowance.toString() });

    if (token2Allowance.toString() < MAX_UINT256) {
      const approveRes = await erc20TokenContract.erc20Write(
        userAddress!,
        token2.address,
        'approve',
        [ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET, MAX_UINT256]
      );
      if (!approveRes) {
        setSuccessful(false);
        setFailed(true);
        return;
      }

      const hash = approveRes.hash;
      const txReceipt = await waitForTransaction({ hash });
      console.log({ txReceipt });
    }

    const { timestamp } = await web3Helpers.getBlock();
    const txResult = await routerContract.addLiquidity(userAddress!, {
      tokenA: token1.address,
      tokenB: token2.address,
      amountADesired: bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN),
      amountBDesired: bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN),
      amountAMin: bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN),
      amountBMin: bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN),
      to: userAddress!,
      deadline: timestamp + K_5_MIN + '',
      timeLock: timestamp + K_1_DAY + '',
    });

    if (!txResult) {
      setSuccessful(false);
      setFailed(true);
      return;
    }

    const hash = txResult.hash;
    const txReceipt = await waitForTransaction({ hash });
    console.log({ txReceipt });

    stopLoading();
    setSuccessful(true);
    setFailed(false);
  };
  console.log({ token1 });

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

      <div className="max-w-[648px] w-[calc(100%-26px)] bg-[#00000080] rounded-lg h-auto  my-[50px] lg:my-[96px] mx-auto py-4 px-[24px]">
        <div className="text-[24px] text-bold mx-auto  w-fit flex items-center gap-3">
          <SwapLeftIcon />
          {title}
          <SwapRightIcon />
        </div>
        <div className=" flex items-center gap-2 mt-8 justify-between">
          <div className="text-[#FFAF1D] text-semibold flex items-center gap-2 text-[14px] lg:text-[16px] ">
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
            balance: token1 ? balanceToken1?.formatted! : '',
            logo: token1 ? token1.logoURI : '',
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
            logo: token2 ? token2.logoURI : '',
          }}
          setTokenAmount={(value) => setToken2Amount(value)}
        />
        <LiquidityPairInfo
          isFirstLP={isFirstLP}
          token1Data={{
            address: token1?.address,
            symbol: token1?.symbol,
            amountIn: token1Amount,
            decimals: balanceToken1?.decimals,
          }}
          token2Data={{
            address: token2?.address,
            symbol: token2?.symbol,
            amountIn: token2Amount,
            decimals: balanceToken2?.decimals,
          }}
        />
        {insufficient && (
          <Notification message="Error: Insufficient Balance" type="error" />
        )}
        {/* {isConnected && (
          <Notification message="Wallet connected" type="success" />
        )} */}
        {successful && (
          <Notification message="Add liquidity successfully" type="success" />
        )}
        {failed && <Notification message="Add liquidity failed" type="error" />}
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
          className="w-full justify-center  mb-2 px-[42px]"
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
