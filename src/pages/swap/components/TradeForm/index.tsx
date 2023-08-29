import { Button } from '@/components/button/Button';
import LiquiditySettingModal from '@/components/modal/LiquiditySettingModal';
import SelectTokenModal from '@/components/modal/SelectTokenModal';
import customToast from '@/components/notification/customToast';
import { useLoading } from '@/context/LoadingContext';
import ButtonStyle from '@/icons/ButtonStyle';
import QuestionIcon from '@/icons/QuestionIcon';
import ReloadIcon from '@/icons/ReloadIcon';
import SettingIcon from '@/icons/SettingIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import {
  ADDRESS_ZERO,
  // ADDRESS_ZERO,
  // ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET,
  ARTHUR_ROUTER_ADDRESS_MUMBAI,
  K_5_MIN,
  MAX_UINT256,
} from '@/utils/constants';
import * as erc20TokenContract from '@/utils/erc20TokenContract';
import * as routerContract from '@/utils/routerContract';
import * as web3Helpers from '@/utils/web3Helpers';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
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
  const [token1, setToken1] = useState<any>();
  const [token2, setToken2] = useState<any>();
  const [token1Amount, setToken1Amount] = useState<string>('0');
  const [token2Amount, setToken2Amount] = useState<string>('0');
  const [rate, setRate] = useState(1);
  const calculateToken2Value = async () => {
    return routerContract.getAmountsOut(
      token1Amount,
      [token1?.address, token2?.address],
      balanceToken1?.decimals!,
      balanceToken2?.decimals!
    );
  };
  useEffect(() => {
    setToken2Amount('' + +token1Amount * rate);
  }, [token1Amount]);

  useEffect(() => {
    const fetchRate = async () => {
      const value = await calculateToken2Value();
      setRate(value);
    };

    fetchRate();
  }, [token1, token2]);

  const resetInput = (isReload?: boolean) => {
    if (isReload) {
      setToken1(null);
      setToken2(null);
    }
    setToken1Amount('0');
    setToken2Amount('0');
    setTokenBeingSelected(0);
  };

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

  const onSelectedToken = (token: any) => {
    if (tokenBeingSelected === 1) {
      setToken1(token);
    } else if (tokenBeingSelected === 2) {
      setToken2(token);
    }
  };

  const handleSwap = async () => {
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
      customToast({
        message: 'Please input valid amount! ',
        type: 'error',
      });
      return;
    }
    if (
      bnToken1Amount.isGreaterThan(BigNumber(balanceToken1!.value.toString()))
    ) {
      customToast({
        message: 'Insufficient balance! ',
        type: 'error',
      });
      return;
    }

    startLoading();

    const token1Allowance = (await erc20TokenContract.erc20Read(
      token1.address,
      'allowance',
      [userAddress, ARTHUR_ROUTER_ADDRESS_MUMBAI]
    )) as bigint;

    if (token1Allowance.toString() < MAX_UINT256) {
      const approveRes = await erc20TokenContract.erc20Write(
        userAddress!,
        token1.address,
        'approve',
        [ARTHUR_ROUTER_ADDRESS_MUMBAI, MAX_UINT256]
      );
      if (!approveRes) {
        // stopLoading();
        // setSuccessful(false);
        // setFailed(true);
        return;
      }

      const hash = approveRes.hash;
      const txReceipt = await waitForTransaction({ hash });
      console.log({ txReceipt });
    }

    // const token2Allowance = (await erc20TokenContract.erc20Read(
    //   token2.address,
    //   'allowance',
    //   [userAddress, ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET]
    // )) as bigint;
    // console.log({
    //   token2Allowance: token2Allowance.toString(),
    //   bnToken2Amount: bnToken2Amount.toString(),
    //   ok: bnToken2Amount.comparedTo(new BigNumber(token2Allowance.toString())),
    // });

    // if (token2Allowance.toString() < MAX_UINT256) {
    //   const approveRes = await erc20TokenContract.erc20Write(
    //     userAddress!,
    //     token2.address,
    //     'approve',
    //     [ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET, MAX_UINT256]
    //   );
    //   if (!approveRes) {
    //     // stopLoading();
    //     // setSuccessful(false);
    //     // setFailed(true);
    //     return;
    //   }

    // const hash = approveRes.hash;
    // const txReceipt = await waitForTransaction({ hash });
    // console.log({ txReceipt });
    // }

    const { timestamp } = await web3Helpers.getBlock();
    let txResult = undefined;
    if (token2?.symbol === 'ETH') {
      console.log({
        bnToken1Amount: bnToken1Amount.toString(),
        token1Amount,
      });
      txResult = await routerContract.swapTokensForETH(userAddress!, {
        amountIn: bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN),
        amountOutMin: bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN),
        path: [token1.address, token2.address],
        to: userAddress!,
        referrer: ADDRESS_ZERO,
        deadline: timestamp + K_5_MIN + '',
      });
    } else {
      txResult = await routerContract.swapTokensForTokens(userAddress!, {
        amountIn: bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN),
        amountOutMin: bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN),
        path: [token1.address, token2.address],
        to: userAddress!,
        referrer: ADDRESS_ZERO,
        deadline: timestamp + K_5_MIN + '',
      });
    }

    if (!txResult) {
      stopLoading();
      // setSuccessful(false);
      // setFailed(true);
      return;
    }

    const hash = txResult.hash;
    // const txReceipt =
    await waitForTransaction({ hash });
    customToast({
      message: `Swap ${token1Amount} ${token1.symbol} to ${token2Amount} ${token2.symbol} successfully`,
      type: 'success',
    });
    resetInput();
    stopLoading();
  };

  const handleSwitchPair = () => {
    setToken1(token2);
    setToken2(token1);
    setToken1Amount('0');
    setToken2Amount('0');
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

      <div className="max-w-[648px] w-[calc(100%-26px)] bg-[#00000080] rounded-lg h-auto  my-[50px] lg:my-[96px] mx-auto py-4 px-[24px]">
        <div className="text-[24px] font-bold mx-auto  w-fit flex items-center gap-3">
          <SwapLeftIcon />
          {title}
          <SwapRightIcon />
        </div>
        <div className=" flex items-center gap-2 mt-8 justify-between">
          <div className="text-[#FFAF1D] font-semibold flex items-center gap-2 text-[14px] lg:text-[16px] ">
            V2 MODE
            <QuestionIcon />
          </div>

          <div className="flex items-center gap-6 cursor-pointer">
            <ReloadIcon onClick={() => resetInput(true)} />
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
            logo: token1 ? token1?.logoURI : '',
            amount: token1Amount,
          }}
          setTokenAmount={(value) => setToken1Amount(value)}
        />
        <div
          className="mx-auto w-fit cursor-pointer"
          onClick={handleSwitchPair}
        >
          {dividerIcon}
        </div>
        <TokenForm
          openModal={() => {
            setTokenBeingSelected(2);
            toggleOpen();
          }}
          title={inputTitle2}
          tokenData={{
            symbol: token2 ? balanceToken2?.symbol! : '',
            balance: token2 ? balanceToken2?.formatted! : '?',
            logo: token2 ? token2?.logoURI : '',
            amount: token2Amount,
          }}
          setTokenAmount={(value) => setToken2Amount(value)}
        />
        <LiquidityPairInfo
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
          rate={rate}
        />
        {/* <Notification message="Error: Insufficient Balance" type="error" />
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
        /> */}

        <Button
          onClick={() => handleSwap()}
          className="w-full justify-center mb-2 px-[42px]"
          // disabled
        >
          {buttonName}
        </Button>
        <ButtonStyle />
      </div>
    </>
  );
};

export default TradeForm;
