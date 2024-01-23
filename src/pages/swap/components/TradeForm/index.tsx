import { Button } from '@/components/button/Button';
import SelectTokenModal from '@/components/modal/SelectTokenModal';
import customToast from '@/components/notification/customToast';
import { handleSuccessTxMessageSwap } from '@/components/successTxMessage';
import { useLoading } from '@/context/LoadingContext';
import { useERC20TokenContractWrite } from '@/hooks/contract/useErc20TokenContract';
import { useRouterContractWrite } from '@/hooks/contract/useRouterContract';
import { allPairsKey, allPairsKeyForAll } from '@/hooks/useAllPairsData';
import DividerDown from '@/icons/DividerDown';
import QuestionIcon from '@/icons/QuestionIcon';
import ReloadIcon from '@/icons/ReloadIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import {
  ADDRESS_ZERO,
  APP_BASE_CHAIN,
  FLASHPAD_ROUTER_ADDRESS,
  IERC20TokenMetadata,
  K_5_MIN,
  MAX_UINT256,
} from '@/utils/constants';
import * as erc20TokenContract from '@/utils/contract/erc20TokenContract';
import * as factoryContract from '@/utils/contract/factoryContract';
import { handleError } from '@/utils/handleError';
import * as pairContract from '@/utils/contract/pairContract';
import * as routerContract from '@/utils/contract/routerContract';
import handleSwitchNetwork from '@/utils/switchNetwork';
import * as web3Helpers from '@/utils/web3Helpers';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { Address } from 'viem';
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi';
import LiquidityPairInfo from '../LiquidityPairInfo';
import TokenForm from '../TokenForm';
import { Swap as Swing } from '@swing.xyz/ui';
import { useRouter } from 'next/router';
import { getTokensList } from '@/api/tokens-list';
interface TradeFormProps {
  title: string;
  buttonName: string;
  inputTitle1: string;
  inputTitle2: string;
  dividerIcon: React.ReactNode;
}
const FEATURE_PROPS: { [k: string]: any } = {
  Swap: {
    value: 'Swap',
    label: 'Swap',
  },
  Bridge: {
    value: 'Bridge',
    label: 'Bridge to Linea',
  },
};
const TradeForm = ({
  title,
  buttonName,
  inputTitle1,
  inputTitle2,
  dividerIcon,
}: TradeFormProps) => {
  const router = useRouter();
  const queryParams = router.query;
  let feat = 'Swap';
  if (queryParams?.feat === 'bridge') {
    feat = 'Bridge';
  }
  const { address: userAddress } = useAccount();
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { mutate } = useSWRConfig();

  const [feature, setFeature] = useState(feat);
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
  const [tokensList, setTokensList] = useState<IERC20TokenMetadata[]>([]);
  const fetchTokensList = async () => {
    const res = await getTokensList();
    setTokensList(res?.data);
  };
  useEffect(() => {
    fetchTokensList();
  }, []);
  useEffect(() => {
    getLPInfo(true);
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
    try {
      if (chain?.id !== APP_BASE_CHAIN.id) {
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
        [userAddress, FLASHPAD_ROUTER_ADDRESS]
      )) as bigint;

      if (BigNumber(token1Allowance.toString()).isLessThan(bnToken1Amount)) {
        startLoadingTx({
          tokenPairs: token1?.symbol,
          title: `Approving ${token1?.symbol} Token ...`,
          message: 'Confirming your transaction, please wait.',
        });
        const { writeContract, ABI: ERC20ABI } = useERC20TokenContractWrite();
        const { hash } = await writeContract({
          address: token1.address,
          abi: ERC20ABI,
          functionName: 'approve',
          args: [FLASHPAD_ROUTER_ADDRESS, MAX_UINT256],
        });
        if (!hash) {
          stopLoadingTx();
          // setSuccessful(false);
          // setFailed(true);
          return;
        } else {
          const txReceipt = await waitForTransaction({ hash });
          stopLoadingTx();
          console.log({ txReceipt });
        }
      }

      startLoadingTx({
        tokenPairs: token1?.symbol + ' - ' + token2?.symbol,
        title: 'Swapping tokens ...',
        message: 'Confirming your transaction, please wait.',
      });

      let txResult = undefined;
      const { writeContract, ABI } = useRouterContractWrite();
      if (token2?.symbol === 'ETH') {
        txResult = await writeContract({
          account: userAddress,
          address: FLASHPAD_ROUTER_ADDRESS as Address,
          abi: ABI,
          functionName: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
          args: [
            bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN),
            bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN),
            [token1.address, token2.address],
            userAddress!,
            ADDRESS_ZERO,
            timestamp + K_5_MIN + '',
          ],
        });
      } else if (token1?.symbol === 'ETH') {
        txResult = await writeContract({
          account: userAddress,
          address: FLASHPAD_ROUTER_ADDRESS as Address,
          abi: ABI,
          functionName: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
          args: [
            bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN),
            [token1.address, token2.address],
            userAddress!,
            ADDRESS_ZERO,
            timestamp + K_5_MIN + '',
          ],
          value: bnToken1Amount.toFixed(
            0,
            BigNumber.ROUND_DOWN
          ) as unknown as bigint,
        });
      } else {
        txResult = await writeContract({
          account: userAddress,
          address: FLASHPAD_ROUTER_ADDRESS as Address,
          abi: ABI,
          functionName: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
          args: [
            bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN),
            bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN),
            [token1.address, token2.address],
            userAddress!,
            ADDRESS_ZERO,
            timestamp + K_5_MIN + '',
          ],
        });
      }

      if (!txResult) {
        stopLoadingTx();
        return;
      }

      const hash = txResult.hash;
      await waitForTransaction({ hash });
      mutate(allPairsKey, allPairsKeyForAll);
      console.log({ token1Amount, token2Amount });
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
      getLPInfo();

      resetInput();
      stopLoadingTx();
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
  };

  const handleSwitchPair = () => {
    setToken1(token2);
    setToken2(token1);
    setToken1Amount('');
    setToken2Amount('');
  };
  const getLPInfo = async (isUpdateToken2?: boolean) => {
    setIsFetchingRate(true);
    const token1Address = token1?.address;
    const token2Address = token2?.address;

    if (!token1Address || !token2Address) return;
    const address = await routerContract.getPair(token1Address, token2Address);
    if (address) {
      const stableSwap = await pairContract.read(address, 'stableSwap', []);
      setIsStableSwap(!!stableSwap);

      const amount1In = BigNumber(10)
        .pow(balanceToken1?.decimals!)
        .times(
          new BigNumber(
            token1Amount === '0' || token1Amount === '' ? '1' : token1Amount
          )
        );

      const amount2In = BigNumber(10)
        .pow(balanceToken2?.decimals!)
        .times(
          new BigNumber(
            token2Amount === '0' || token2Amount === '' ? '1' : token2Amount
          )
        );
      const amount2Out = await pairContract.read(address, 'getAmountOut', [
        amount1In?.integerValue(),
        token1Address,
      ]);
      const rate1To2 = BigNumber(amount2Out)
        .div(amount1In?.integerValue())
        .toFixed(balanceToken2?.decimals!);

      setSwapRate1To2(rate1To2);
      if (isUpdateToken2) {
        setToken2Amount('' + +token1Amount * +rate1To2);
      }
      const amount1Out = await pairContract.read(address, 'getAmountOut', [
        amount2In?.integerValue(),
        token2Address,
      ]);
      const rate2To1 = BigNumber(amount1Out)
        .div(amount2In?.integerValue())
        .toFixed(balanceToken1?.decimals!);
      setSwapRate2To1(rate2To1);
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

      <div className="max-w-[648px] w-[calc(100%-26px)] bg-dark rounded-lg h-auto  my-[50px] lg:mt-[116px] lg:mb-[40px] mx-auto py-4 px-[24px]">
        <div className="text-2xl font-bold mx-auto  w-fit flex items-center gap-3">
          <SwapLeftIcon />
          {title}
          <SwapRightIcon />
        </div>

        <div className="flex bg-darkBlue mt-6 rounded-lg">
          {Object.keys(FEATURE_PROPS).map((key: string) => (
            <button
              className={`w-1/2 text-center py-3  rounded-md focus:outline-none font-semibold ${
                feature === key
                  ? 'bg-[#FFAF1D] border border-[#FFAF1D] text-black'
                  : ''
              }`}
              onClick={() => setFeature(FEATURE_PROPS[key].value)}
            >
              {FEATURE_PROPS[key].label}
            </button>
          ))}
        </div>
        {feature === 'Bridge' && (
          <div className="mt-8 mb-4">
            {' '}
            <Swing projectId="flashpad" />
          </div>
        )}
        {feature === 'Swap' && (
          <>
            {' '}
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
              tokensList={tokensList}
              title={inputTitle1}
              tokenData={{
                symbol: token1 ? token1?.symbol! : '',
                balance: token1 ? balanceToken1?.formatted! : '?',
                logo: token1 ? token1?.logo_uri : '',
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
              tokensList={tokensList}
              title={inputTitle2}
              tokenData={{
                symbol: token2 ? token2?.symbol! : '',
                balance: token2 ? balanceToken2?.formatted! : '?',
                logo: token2 ? token2?.logo_uri : '',
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
                !userAddress ||
                !token1 ||
                !token2 ||
                !token1Amount ||
                !token2Amount
              }
            >
              {buttonName}
            </Button>
            <DividerDown />
          </>
        )}
      </div>
    </>
  );
};

export default TradeForm;
