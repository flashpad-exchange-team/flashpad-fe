import { Button } from '@/components/button/Button';
import SelectTokenModal from '@/components/modal/SelectTokenModal';
import customToast from '@/components/notification/customToast';
import { handleSuccessTxMessageSwap } from '@/components/successTxMessage';
import { useLoading } from '@/context/LoadingContext';
import { allPairsKey, allPairsKeyForAll } from '@/hooks/useAllPairsData';
import DividerDown from '@/icons/DividerDown';
import QuestionIcon from '@/icons/QuestionIcon';
import ReloadIcon from '@/icons/ReloadIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import {
  ADDRESS_ZERO,
  ARTHUR_ROUTER_ADDRESS,
  K_5_MIN,
  MAX_UINT256,
} from '@/utils/constants';
import * as erc20TokenContract from '@/utils/erc20TokenContract';
import * as factoryContract from '@/utils/factoryContract';
import * as pairContract from '@/utils/pairContract';
import * as routerContract from '@/utils/routerContract';
import handleSwitchNetwork from '@/utils/switchNetwork';
import * as web3Helpers from '@/utils/web3Helpers';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { Address } from 'viem';
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi';
import { lineaTestnet } from 'wagmi/chains';
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
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { mutate } = useSWRConfig();

  const [isOpen, setOpen] = useState<boolean>(false);
  const [tokenBeingSelected, setTokenBeingSelected] = useState<number>(0);
  const [token1, setToken1] = useState<any>();
  const [token2, setToken2] = useState<any>();
  const [token1Amount, setToken1Amount] = useState<string>('0');
  const [token2Amount, setToken2Amount] = useState<string>('0');
  const [isStableSwap, setIsStableSwap] = useState(false);
  const [swapRate1To2, setSwapRate1To2] = useState('-');
  const [swapRate2To1, setSwapRate2To1] = useState('-');
  const [isFetchingRate, setIsFetchingRate] = useState<boolean>(false);
  const [isFirstLP, setIsFirstLP] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setToken2Amount('' + +token1Amount * +swapRate1To2);
  }, [token1Amount]);

  useEffect(() => {
    getLPInfo();
  }, [token1, token2, userAddress]);

  const resetInput = (isReload?: boolean) => {
    if (isReload) {
      setToken1(null);
      setToken2(null);
    }
    setToken1Amount('');
    setToken2Amount('');
    setTokenBeingSelected(0);
  };

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

  const toggleOpen = () => setOpen(!isOpen);

  const getPairAddress = async () => {
    if (!token1 || !token2) return;
    const address = await factoryContract.getPair(
      token1.address,
      token2.address
    );
    setIsFirstLP(!address || address === ADDRESS_ZERO);
  };

  useEffect(() => {
    getPairAddress();
  }, [token1, token2]);

  const onSelectedToken = (token: any) => {
    if (tokenBeingSelected === 1) {
      setToken1(token);
    } else if (tokenBeingSelected === 2) {
      setToken2(token);
    }
  };

  const handleSwap = async () => {
    if (chain?.id !== lineaTestnet.id) {
      handleSwitchNetwork(switchNetwork);
      return;
    }
    const bnToken1Amount = BigNumber(10)
      .pow(balanceToken1?.decimals!)
      .times(new BigNumber(token1Amount));
    const address: any = await routerContract.getPair(
      token1.address,
      token2.address
    );
    const startTime = await pairContract.read(address, 'startTime', []);
    const { timestamp } = await web3Helpers.getBlock();

    if (startTime > timestamp) {
      customToast({
        message:
          'Token swapping is currently unavailable due to a pool lock. Please wait for the lock to be lifted until ' +
          web3Helpers.getDateFormat(startTime),
        type: 'error',
      });
      return;
    }

    // const bnToken2Amount = BigNumber(10)
    //   .pow(balanceToken2?.decimals!)
    //   .times(new BigNumber(token2Amount));
    // const bnToken2Amount = BigNumber(10)
    //   .pow(balanceToken1?.decimals!)
    //   .times(new BigNumber(token1Amount))
    //   .times(swapRate1To2);
    const bnToken2Amount = new BigNumber(
      await pairContract.read(address, 'getAmountOut', [
        BigNumber(10)
          .pow(balanceToken1?.decimals!)
          .times(new BigNumber(token1Amount)),
        token1.address,
      ])
    );
    if (
      bnToken1Amount?.isNaN() ||
      bnToken2Amount?.isNaN() ||
      bnToken1Amount?.isZero() ||
      bnToken2Amount?.isZero()
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

    const token1Allowance = (await erc20TokenContract.erc20Read(
      token1.address,
      'allowance',
      [userAddress, ARTHUR_ROUTER_ADDRESS]
    )) as bigint;

    if (BigNumber(token1Allowance.toString()).isLessThan(bnToken1Amount)) {
      startLoadingTx({
        tokenPairs: token1?.symbol,
        title: `Approving ${token1?.symbol} Token ...`,
        message: 'Confirming your transaction, please wait.',
      });
      const approveRes = await erc20TokenContract.erc20Write(
        userAddress!,
        token1.address,
        'approve',
        [ARTHUR_ROUTER_ADDRESS, MAX_UINT256]
      );
      if (!approveRes) {
        stopLoadingTx();
        // setSuccessful(false);
        // setFailed(true);
        return;
      }

      const hash = approveRes.hash;
      const txReceipt = await waitForTransaction({ hash });
      stopLoadingTx();
      console.log({ txReceipt });
    }

    startLoadingTx({
      tokenPairs: token1?.symbol + ' - ' + token2?.symbol,
      title: 'Swapping tokens ...',
      message: 'Confirming your transaction, please wait.',
    });

    let txResult = undefined;
    if (token2?.symbol === 'ETH') {
      txResult = await routerContract.swapTokensForETH(userAddress!, {
        amountIn: bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN),
        amountOutMin: bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN),
        path: [token1.address, token2.address],
        to: userAddress!,
        referrer: ADDRESS_ZERO,
        deadline: timestamp + K_5_MIN + '',
      });
    } else if (token1?.symbol === 'ETH') {
      txResult = await routerContract.swapETHForTokens(
        userAddress!,
        bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN),
        {
          amountOutMin: bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN),
          path: [token1.address, token2.address],
          to: userAddress!,
          referrer: ADDRESS_ZERO,
          deadline: timestamp + K_5_MIN + '',
        }
      );
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
      stopLoadingTx();
      return;
    }

    const hash = txResult.hash;
    await waitForTransaction({ hash });
    mutate(allPairsKey, allPairsKeyForAll);

    startSuccessTx(
      handleSuccessTxMessageSwap({
        action: 'swapped',
        token1: token1.symbol,
        token2: token2.symbol,
        token1Amount,
        token2Amount,
        txHash: hash,
      })
    );

    resetInput();
    stopLoadingTx();
  };

  const handleSwitchPair = () => {
    setToken1(token2);
    setToken2(token1);
    setToken1Amount('');
    setToken2Amount('');
  };
  const getLPInfo = async () => {
    setIsFetchingRate(true);
    const token1Address = token1?.address;
    const token2Address = token2?.address;

    if (!token1Address || !token2Address) return;
    const address = await routerContract.getPair(token1Address, token2Address);
    if (address) {
      const stableSwap = await pairContract.read(address, 'stableSwap', []);
      setIsStableSwap(!!stableSwap);

      const amount1In = BigNumber(10).pow(
        BigNumber(balanceToken1?.decimals || 0)
      );
      const amount2In = BigNumber(10).pow(
        BigNumber(balanceToken2?.decimals || 0)
      );

      const amount2Out = await pairContract.read(address, 'getAmountOut', [
        amount1In,
        token1Address,
      ]);
      setSwapRate1To2(
        BigNumber(amount2Out).div(amount2In).toFixed(balanceToken2?.decimals!)
      );

      const amount1Out = await pairContract.read(address, 'getAmountOut', [
        amount2In,
        token2Address,
      ]);
      setSwapRate2To1(
        BigNumber(amount1Out).div(amount1In).toFixed(balanceToken1?.decimals!)
      );
    }
    setIsFetchingRate(false);
  };
  return (
    <>
      <SelectTokenModal
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        selectValue={onSelectedToken}
      />

      <div className="max-w-[648px] w-[calc(100%-26px)] bg-dark rounded-lg h-auto  my-[50px] lg:my-[96px] mx-auto py-4 px-[24px]">
        <div className="text-2xl font-bold mx-auto  w-fit flex items-center gap-3">
          <SwapLeftIcon />
          {title}
          <SwapRightIcon />
        </div>
        <div className=" flex items-center gap-2 mt-8 justify-between">
          <div className="text-primary font-semibold flex items-center gap-2 text-sm lg:text-base ">
            V2 MODE
            <QuestionIcon />
          </div>

          <div className="flex items-center gap-6 cursor-pointer">
            <ReloadIcon onClick={() => resetInput(true)} />
          </div>
        </div>
        <TokenForm
          openModal={() => {
            setTokenBeingSelected(1);
            toggleOpen();
          }}
          title={inputTitle1}
          tokenData={{
            symbol: token1 ? token1?.symbol! : '',
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
            symbol: token2 ? token2?.symbol! : '',
            balance: token2 ? balanceToken2?.formatted! : '?',
            logo: token2 ? token2?.logoURI : '',
            amount: token2Amount,
          }}
          setTokenAmount={(value) => setToken2Amount(value)}
        />
        {isFirstLP ? (
          <div className="bg-darkBlue rounded-lg my-2 mb-3 p-4 text-sm">
            There is currently no liquidity pool for the selected pair
          </div>
        ) : (
          <LiquidityPairInfo
            swapRate1To2={swapRate1To2}
            swapRate2To1={swapRate2To1}
            isStableSwap={isStableSwap}
            isFetchingRate={isFetchingRate}
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
        )}

        <Button
          onClick={() => handleSwap()}
          className="w-full justify-center mb-2 px-[42px]"
          disabled={
            !userAddress || !token1 || !token2 || !token1Amount || !token2Amount
          }
        >
          {buttonName}
        </Button>
        <DividerDown />
      </div>
    </>
  );
};

export default TradeForm;
