import { Button } from '@/components/button/Button';
import LiquiditySettingModal, {
  ILiquiditySettings,
} from '@/components/modal/LiquiditySettingModal';
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
  // ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET,
  ARTHUR_ROUTER_ADDRESS_MUMBAI,
  DEFAULT_DEADLINE,
  DEFAULT_TIME_LOCK,
  MAX_UINT256,
  daysToSeconds,
  minutesToSeconds,
} from '@/utils/constants';
import * as erc20TokenContract from '@/utils/erc20TokenContract';
import * as factoryContract from '@/utils/factoryContract';
import * as routerContract from '@/utils/routerContract';
import * as web3Helpers from '@/utils/web3Helpers';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import { abi as ArthurPairABI } from '@/resources/abis/ArthurPair.json';
import LiquidityPairInfo from '../LiquidityPairInfo';
import TokenForm from '../TokenForm';
import customToast from '@/components/notification/customToast';
import LockManageIcon from '@/icons/LockManageIcon';
import LockManageModal from '@/components/modal/LockManageModal';

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
  const { startLoading, stopLoading } = useLoading();

  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenSetting, setOpenSetting] = useState<boolean>(false);
  const [isOpenLockManage, setOpenLockManage] = useState<boolean>(false);
  const [tokenBeingSelected, setTokenBeingSelected] = useState<number>(0);
  const [token1, setToken1] = useState<any>(null);
  const [token2, setToken2] = useState<any>(null);
  const [token1Amount, setToken1Amount] = useState<string>('0');
  const [token2Amount, setToken2Amount] = useState<string>('0');
  const [insufficient, setInsufficient] = useState(false);
  const [pairAddress, setPairAddress] = useState<Address | undefined>(
    undefined
  );
  const [isFirstLP, setIsFirstLP] = useState<boolean | undefined>(undefined);
  const [successful, setSuccessful] = useState(false);
  const [failed, setFailed] = useState(false);

  const [deadline, setDeadline] = useState<number>(Number(DEFAULT_DEADLINE));
  const [timeLock, setTimeLock] = useState<number>(Number(DEFAULT_TIME_LOCK));

  const { data: balanceToken1 } = useBalance({
    address: userAddress,
    token:
      token1 && token1.symbol != 'ETH'
        ? (token1.address as Address)
        : undefined,
    watch: true,
  });

  const { data: balanceToken2 } = useBalance({
    address: userAddress,
    token:
      token2 && token2.symbol != 'ETH'
        ? (token2.address as Address)
        : undefined,
    watch: true,
  });

  const { data: reserves } = useContractRead({
    address: pairAddress,
    abi: ArthurPairABI,
    functionName: 'getReserves',
  });

  const { data: pairToken1 } = useContractRead({
    address: pairAddress,
    abi: ArthurPairABI,
    functionName: 'token0',
  });

  const toggleOpen = () => setOpen(!isOpen);
  const toggleOpenSetting = () => setOpenSetting(!isOpenSetting);
  const toggleLockManage = () => setOpenLockManage(!isOpenLockManage);

  const resetInput = (isReload?: boolean) => {
    if (isReload) {
      setToken1(null);
      setToken2(null);
    }
    setToken1Amount('0');
    setToken2Amount('0');
    setTokenBeingSelected(0);
  };

  const saveSettings = ({ deadline }: ILiquiditySettings) => {
    setDeadline(deadline);
  };

  const getPairAddress = async () => {
    if (!token1 || !token2) return;
    const address = (await factoryContract.getPair(
      token1.address,
      token2.address
    )) as Address;
    console.log({ factoryPairAddress: address });
    setPairAddress(address && address != ADDRESS_ZERO ? address : undefined);
    setIsFirstLP(!address || address === ADDRESS_ZERO);
  };

  useEffect(() => {
    getPairAddress();
  }, [token1, token2, successful]);

  const onSelectedToken = (token: any) => {
    setIsFirstLP(undefined);
    setToken1Amount('0');
    setToken2Amount('0');
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

  const autoAdjustToken2Amount = async (token1Amount: any) => {
    const reserve1 = BigNumber(reserves ? (reserves as any)[0] : 0);
    const reserve2 = BigNumber(reserves ? (reserves as any)[1] : 0);
    if (reserve1.isZero() || reserve2.isZero()) return;
    const bnToken1Amount = BigNumber(10)
      .pow(balanceToken1?.decimals!)
      .times(BigNumber(token1Amount));
    let adjustedToken2Amount;
    if ((pairToken1 as string).toLowerCase() === token1.address.toLowerCase()) {
      adjustedToken2Amount = reserve2.div(reserve1).times(bnToken1Amount);
    } else {
      adjustedToken2Amount = reserve1.div(reserve2).times(bnToken1Amount);
    }
    setToken2Amount(
      adjustedToken2Amount
        .div(BigNumber(10).pow(balanceToken2?.decimals!))
        .toString()
    );
  };

  const autoAdjustToken1Amount = async (token2Amount: any) => {
    const reserve1 = BigNumber(reserves ? (reserves as any)[0] : 0);
    const reserve2 = BigNumber(reserves ? (reserves as any)[1] : 0);
    if (reserve1.isZero() || reserve2.isZero()) return;
    const bnToken2Amount = BigNumber(10)
      .pow(balanceToken2?.decimals!)
      .times(BigNumber(token2Amount));
    let adjustedToken1Amount;
    if ((pairToken1 as string).toLowerCase() === token1.address.toLowerCase()) {
      adjustedToken1Amount = reserve1.div(reserve2).times(bnToken2Amount);
    } else {
      adjustedToken1Amount = reserve2.div(reserve1).times(bnToken2Amount);
    }
    setToken1Amount(
      adjustedToken1Amount
        .div(BigNumber(10).pow(balanceToken1?.decimals!))
        .toString()
    );
  };

  const saveTimeLock = (value: number) => {
    setTimeLock(value);
  };

  const handleAddLiquidity = async () => {
    setSuccessful(false);
    const bnToken1Amount = BigNumber(10)
      .pow(balanceToken1?.decimals!)
      .times(BigNumber(token1Amount));

    const bnToken2Amount = BigNumber(10)
      .pow(balanceToken2?.decimals!)
      .times(BigNumber(token2Amount));

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
      bnToken1Amount.isGreaterThan(
        BigNumber(balanceToken1!.value.toString())
      ) ||
      bnToken2Amount.isGreaterThan(BigNumber(balanceToken2!.value.toString()))
    ) {
      customToast({
        message: 'Insufficient balance! ',
        type: 'error',
      });
      setInsufficient(true);
      return;
    }
    setInsufficient(false);

    startLoading();

    const token1AmountIn = bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN);
    const token2AmountIn = bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN);

    if (token1.symbol != 'ETH') {
      const token1Allowance = (await erc20TokenContract.erc20Read(
        token1.address,
        'allowance',
        [userAddress, ARTHUR_ROUTER_ADDRESS_MUMBAI]
      )) as bigint;
  
      if (BigNumber(token1Allowance.toString()).isLessThan(token1AmountIn)) {
        const approveRes = await erc20TokenContract.erc20Write(
          userAddress!,
          token1.address,
          'approve',
          [ARTHUR_ROUTER_ADDRESS_MUMBAI, MAX_UINT256]
        );
        if (!approveRes) {
          stopLoading();
          setSuccessful(false);
          setFailed(true);
          return;
        }
  
        const hash = approveRes.hash;
        const txReceipt = await waitForTransaction({ hash });
        console.log({ txReceipt });
      }
    }

    if (token2.symbol != 'ETH') {
      const token2Allowance = (await erc20TokenContract.erc20Read(
        token2.address,
        'allowance',
        [userAddress, ARTHUR_ROUTER_ADDRESS_MUMBAI]
      )) as bigint;
  
      if (BigNumber(token2Allowance.toString()).isLessThan(token2AmountIn)) {
        const approveRes = await erc20TokenContract.erc20Write(
          userAddress!,
          token2.address,
          'approve',
          [ARTHUR_ROUTER_ADDRESS_MUMBAI, MAX_UINT256]
        );
        if (!approveRes) {
          stopLoading();
          setSuccessful(false);
          setFailed(true);
          return;
        }
  
        const hash = approveRes.hash;
        const txReceipt = await waitForTransaction({ hash });
        console.log({ txReceipt });
      }
    }

    const { timestamp } = await web3Helpers.getBlock();
    let txResult: any;
    
    if (token1.symbol == 'ETH') {
      txResult = await routerContract.addLiquidityETH(userAddress!, {
        token: token2.address,
        amountTokenDesired: token2AmountIn,
        amountTokenMin: token2AmountIn,
        amountETHMin: token1AmountIn,
        to: userAddress!,
        deadline: (timestamp as bigint) + minutesToSeconds(deadline) + '',
        timeLock: (timestamp as bigint) + daysToSeconds(timeLock) + '',
      });
    } else if (token2.symbol == 'ETH') {
      txResult = await routerContract.addLiquidityETH(userAddress!, {
        token: token1.address,
        amountTokenDesired: token1AmountIn,
        amountTokenMin: token1AmountIn,
        amountETHMin: token2AmountIn,
        to: userAddress!,
        deadline: (timestamp as bigint) + minutesToSeconds(deadline) + '',
        timeLock: (timestamp as bigint) + daysToSeconds(timeLock) + '',
      });
    } else {
      txResult = await routerContract.addLiquidity(userAddress!, {
        tokenA: token1.address,
        tokenB: token2.address,
        amountADesired: token1AmountIn,
        amountBDesired: token2AmountIn,
        amountAMin: token1AmountIn,
        amountBMin: token2AmountIn,
        to: userAddress!,
        deadline: (timestamp as bigint) + minutesToSeconds(deadline) + '',
        timeLock: (timestamp as bigint) + daysToSeconds(timeLock) + '',
      });
    }

    if (!txResult) {
      stopLoading();
      setSuccessful(false);
      setFailed(true);
      return;
    }

    const hash = txResult.hash;
    const txReceipt = await waitForTransaction({ hash });
    console.log({ txReceipt });
    resetInput();
    stopLoading();
    setSuccessful(true);
    setFailed(false);
    customToast({
      message: 'Added liquidity successfully',
      type: 'success',
    });
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
        saveSettings={saveSettings}
        isOpen={isOpenSetting}
        toggleOpen={toggleOpenSetting}
      />
      <LockManageModal
        isOpen={isOpenLockManage}
        toggleOpen={toggleLockManage}
        saveTimeLock={saveTimeLock}
      />
      <div className="max-w-[648px] w-[calc(100%-26px)] bg-[#00000080] rounded-lg h-auto my-[50px] lg:my-[96px] mx-auto py-4 px-[24px]">
        <div className="text-[24px] font-bold mx-auto w-fit flex items-center gap-3">
          <SwapLeftIcon />
          {title}
          <SwapRightIcon />
        </div>
        <div className=" flex items-center gap-2 mt-8 justify-between">
          <div className="text-[#FFAF1D] font-semibold flex items-center gap-2 text-[14px] lg:text-[16px] ">
            V2 MODE
            <QuestionIcon />
          </div>

          <div className="flex items-center gap-3 cursor-pointer">
            <ReloadIcon onClick={() => resetInput(true)} />
            <LockManageIcon onClick={toggleLockManage} />
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
            symbol: token1 ? token1.symbol! : '',
            balance: token1 ? balanceToken1?.formatted! : '?',
            logo: token1 ? token1.logoURI : '',
          }}
          value={token1Amount}
          setTokenAmount={(value) => {
            setToken1Amount(value);
            autoAdjustToken2Amount(value);
          }}
        />
        <div
          className="mx-auto w-fit cursor-pointer"
          onClick={handleSwitchPair}
        >
          {dividerIcon}
        </div>{' '}
        <TokenForm
          openModal={() => {
            setTokenBeingSelected(2);
            toggleOpen();
          }}
          title={inputTitle2}
          tokenData={{
            symbol: token2 ? token2.symbol! : '',
            balance: token2 ? balanceToken2?.formatted! : '?',
            logo: token2 ? token2.logoURI : '',
          }}
          value={token2Amount}
          setTokenAmount={(value) => {
            setToken2Amount(value);
            autoAdjustToken1Amount(value);
          }}
        />
        <LiquidityPairInfo
          pairToken1={pairToken1 as Address}
          reserves={reserves as any}
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
        {!isConnected && (
          <Notification message="Please connect to a Wallet" type="error" />
        )}
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
