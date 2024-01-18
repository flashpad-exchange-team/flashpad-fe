import { getTokensList } from '@/api/tokens-list';
import { Button } from '@/components/button/Button';
import AddLiquidityAndCreatePositionModal from '@/components/modal/AddLiquidityAndCreatePositionModal';
import LiquiditySettingModal, {
  ILiquiditySettings,
} from '@/components/modal/LiquiditySettingModal';
import LockManageModal from '@/components/modal/LockManageModal';
import SelectTokenModal from '@/components/modal/SelectTokenModal';
import Notification from '@/components/notification/Notification';
import customToast from '@/components/notification/customToast';
import { handleSuccessTxMessageActionWithPair } from '@/components/successTxMessage';
import { useLoading } from '@/context/LoadingContext';
import { useERC20TokenContractWrite } from '@/hooks/contract/useErc20TokenContract';
import { useRouterContractWrite } from '@/hooks/contract/useRouterContract';
import { userNftPoolFactoryContractWrite } from '@/hooks/contract/userNftPoolFactoryContract';
import { allNftPoolsKey } from '@/hooks/useAllNftPoolsData';
import { allPairsKey, allPairsKeyForAll } from '@/hooks/useAllPairsData';
import BackIcon from '@/icons/BackIcon';
import DividerDown from '@/icons/DividerDown';
import LockManageIcon from '@/icons/LockManageIcon';
import QuestionIcon from '@/icons/QuestionIcon';
import ReloadIcon from '@/icons/ReloadIcon';
import SettingIcon from '@/icons/SettingIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { abi as FlashpadPairABI } from '@/resources/abis/FlashpadPair.json';
import {
  ADDRESS_ZERO,
  APP_BASE_CHAIN,
  DEFAULT_DEADLINE,
  DEFAULT_SLIPPAGE,
  DEFAULT_TIME_LOCK,
  FLASHPAD_ROUTER_ADDRESS,
  IERC20TokenMetadata,
  MAX_UINT256,
  NFT_POOL_FACTORY_ADDRESS,
  daysToSeconds,
  minutesToSeconds,
} from '@/utils/constants';
import * as erc20TokenContract from '@/utils/contract/erc20TokenContract';
import * as factoryContract from '@/utils/contract/factoryContract';
import * as nftPoolFactoryContract from '@/utils/contract/nftPoolFactoryContract';
import * as routerContract from '@/utils/contract/routerContract';
import { handleError } from '@/utils/handleError';
import handleSwitchNetwork from '@/utils/switchNetwork';
import * as web3Helpers from '@/utils/web3Helpers';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import { Tooltip } from 'react-tooltip';
import { useSWRConfig } from 'swr';
import { Address } from 'viem';
import {
  useAccount,
  useBalance,
  useContractRead,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';
import LiquidityPairInfo from '../LiquidityPairInfo';
import TokenForm from '../TokenForm';

const FEATURE_PROPS: { [k: string]: any } = {
  'ADD LIQUIDITY': {
    value: 'ADD LIQUIDITY',
    label: 'Liquidity',
    buttonName: 'Add Liquidity',
  },
  'STAKE POSITION': {
    value: 'STAKE POSITION',
    label: 'spNFT',
    buttonName: 'Create Position',
  },
};

interface TradeFormProps {
  inputTitle1: string;
  inputTitle2: string;
  dividerIcon: React.ReactNode;
}

const TradeForm = ({
  inputTitle1,
  inputTitle2,
  dividerIcon,
}: TradeFormProps) => {
  const router = useRouter();
  const queryParams = router.query;
  let feat = 'ADD LIQUIDITY';
  if (queryParams?.feat === 'spnft') {
    feat = 'STAKE POSITION';
  }
  const [tokensList, setTokensList] = useState<IERC20TokenMetadata[]>([]);
  const initialToken1 = tokensList.find(
    (tk) =>
      tk.address.toLowerCase() ===
      (queryParams?.token1 as string)?.toLowerCase()
  );
  const initialToken2 = tokensList.find(
    (tk) =>
      tk.address.toLowerCase() ===
      (queryParams?.token2 as string)?.toLowerCase()
  );

  const [feature, setFeature] = useState(feat);
  const { address: userAddress } = useAccount();
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

  const { mutate } = useSWRConfig();

  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenSetting, setOpenSetting] = useState<boolean>(false);
  const [isOpenLockManage, setOpenLockManage] = useState<boolean>(false);

  const [isOpenAddLiquidityCreatePosition, setOpenAddLiquidityCreatePosition] =
    useState<boolean>(false);
  const toggleOpenAddLiquidityCreatePosition = () => {
    setOpenAddLiquidityCreatePosition(!isOpenAddLiquidityCreatePosition);
  };

  const [tokenBeingSelected, setTokenBeingSelected] = useState<number>(0);
  const [token1, setToken1] = useState<any>(initialToken1);
  const [token2, setToken2] = useState<any>(initialToken2);
  const [token1Amount, setToken1Amount] = useState<string>('0');
  const [token2Amount, setToken2Amount] = useState<string>('0');
  const [insufficient, setInsufficient] = useState(false);
  const [pairAddress, setPairAddress] = useState<Address | undefined>(
    undefined
  );
  const [nftPoolAddress, setNftPoolAddress] = useState<Address | undefined>(
    undefined
  );
  const [isFirstLP, setIsFirstLP] = useState<boolean | undefined>(undefined);

  const [successful, setSuccessful] = useState<boolean | undefined>(false);
  const [failed, setFailed] = useState<boolean | undefined>(false);

  const [deadline, setDeadline] = useState<number>(Number(DEFAULT_DEADLINE));
  const [slippage, setSlippage] = useState<number>(Number(DEFAULT_SLIPPAGE));
  const [timeLock, setTimeLock] = useState<number>(Number(DEFAULT_TIME_LOCK));

  const [lockDate, setLockDate] = useState<any>(moment());

  const fetchTokensList = async () => {
    const res = await getTokensList();
    setTokensList(res?.data);
  };
  useEffect(() => {
    fetchTokensList();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setSuccessful(false);
      setFailed(false);
      setInsufficient(false);
    }, 5000);
  }, [insufficient, failed, successful]);
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
    abi: FlashpadPairABI,
    functionName: 'getReserves',
  });

  const { data: pairToken1 } = useContractRead({
    address: pairAddress,
    abi: FlashpadPairABI,
    functionName: 'token0',
  });

  const handleViewPositions = () => {
    if (feature === 'ADD LIQUIDITY') {
      router.push('/lp-positions');
      return;
    }
    router.push('/spnft-positions');
  };

  const toggleOpen = () => setOpen(!isOpen);
  const toggleOpenSetting = () => setOpenSetting(!isOpenSetting);
  const toggleLockManage = () => setOpenLockManage(!isOpenLockManage);

  const resetInput = (isReload?: boolean) => {
    if (isReload) {
      // setToken1(null);
      // setToken2(null);
    }
    setToken1(null);
    setToken2(null);
    setToken1Amount('0');
    setToken2Amount('0');
    setTokenBeingSelected(0);
  };

  const saveSettings = ({ deadline, slippage }: ILiquiditySettings) => {
    setDeadline(deadline);
    setSlippage(slippage);
  };

  const getPairAddress = async () => {
    if (!token1 || !token2) return;
    const address = await factoryContract.getPair(
      token1.address,
      token2.address
    );
    setPairAddress(address && address != ADDRESS_ZERO ? address : undefined);
    setIsFirstLP(!address || address === ADDRESS_ZERO);
  };

  useEffect(() => {
    getPairAddress();
  }, [token1, token2, successful]);

  const getPoolAddress = async () => {
    if (!token1 || !token2) return;
    const lpAddress = await routerContract.getPair(
      token1.address,
      token2.address
    );
    if (!lpAddress) return;
    const address = await nftPoolFactoryContract.getPool(lpAddress);
    setNftPoolAddress(address);
  };

  useEffect(() => {
    getPoolAddress();
  }, [token1, token2, successful]);

  const isFirstSpMinter = nftPoolAddress
    ? nftPoolAddress === ADDRESS_ZERO
    : undefined;

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
    if (
      !pairToken1 ||
      (pairToken1 as string).toLowerCase() === token1.address.toLowerCase()
    ) {
      // adjustedToken2Amount = reserve2.times(bnToken1Amount).div(reserve1);
      adjustedToken2Amount = web3Helpers.bnQuote(
        bnToken1Amount,
        reserve1,
        reserve2
      );
    } else {
      // adjustedToken2Amount = reserve1.times(bnToken1Amount).div(reserve2);
      adjustedToken2Amount = web3Helpers.bnQuote(
        bnToken1Amount,
        reserve2,
        reserve1
      );
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
    if (
      !pairToken1 ||
      (pairToken1 as string).toLowerCase() === token1.address.toLowerCase()
    ) {
      // adjustedToken1Amount = reserve1.times(bnToken2Amount).div(reserve2);
      adjustedToken1Amount = web3Helpers.bnQuote(
        bnToken2Amount,
        reserve2,
        reserve1
      );
    } else {
      // adjustedToken1Amount = reserve2.times(bnToken2Amount).div(reserve1);
      adjustedToken1Amount = web3Helpers.bnQuote(
        bnToken2Amount,
        reserve1,
        reserve2
      );
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
    try {
      const { writeContract: writeERC20Contract, ABI: ERC20ABI } =
        useERC20TokenContractWrite();
      const { writeContract: writeRouterContract, ABI: RouterABI } =
        useRouterContractWrite();

      if (chain?.id !== APP_BASE_CHAIN.id) {
        handleSwitchNetwork(switchNetwork);
        return;
      }
      setSuccessful(undefined);
      const bnToken1Amount = BigNumber(10)
        .pow(balanceToken1?.decimals!)
        .times(BigNumber(token1Amount));

      const bnToken2Amount = BigNumber(10)
        .pow(balanceToken2?.decimals!)
        .times(BigNumber(token2Amount));
      if (
        bnToken1Amount.isNaN() ||
        bnToken2Amount.isNaN() ||
        bnToken1Amount.isLessThanOrEqualTo(0) ||
        bnToken2Amount.isLessThanOrEqualTo(0)
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
          message: 'Insufficient balance!',
          type: 'error',
        });
        setInsufficient(true);
        return;
      }
      setInsufficient(false);

      const token1AmountIn = bnToken1Amount.toFixed(0, BigNumber.ROUND_DOWN);
      const token2AmountIn = bnToken2Amount.toFixed(0, BigNumber.ROUND_DOWN);
      const token1AmountMin = bnToken1Amount
        .times(BigNumber(1).minus(BigNumber(slippage).div(100)))
        .toFixed(0, BigNumber.ROUND_DOWN);
      const token2AmountMin = bnToken2Amount
        .times(BigNumber(1).minus(BigNumber(slippage).div(100)))
        .toFixed(0, BigNumber.ROUND_DOWN);

      if (token1.symbol != 'ETH') {
        const token1Allowance = (await erc20TokenContract.erc20Read(
          token1.address,
          'allowance',
          [userAddress, FLASHPAD_ROUTER_ADDRESS]
        )) as bigint;

        if (BigNumber(token1Allowance.toString()).isLessThan(token1AmountIn)) {
          startLoadingTx({
            tokenPairs: token1?.symbol + ' - ' + token2?.symbol,
            title: `Approving ${token1?.symbol}...`,
            message: 'Confirming your transaction, please wait.',
          });

          const { hash } = await writeERC20Contract({
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
      }

      if (token2.symbol != 'ETH') {
        const token2Allowance = (await erc20TokenContract.erc20Read(
          token2.address,
          'allowance',
          [userAddress, FLASHPAD_ROUTER_ADDRESS]
        )) as bigint;

        if (BigNumber(token2Allowance.toString()).isLessThan(token2AmountIn)) {
          startLoadingTx({
            tokenPairs: token1?.symbol + ' - ' + token2?.symbol,
            title: `Approving ${token2?.symbol}...`,
            message: 'Confirming your transaction, please wait.',
          });

          const { hash } = await writeERC20Contract({
            address: token2.address,
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
      }
      startLoadingTx({
        tokenPairs: token1?.symbol + ' - ' + token2?.symbol,
        title: 'Adding Liquidity ...',
        message: 'Confirming your transaction, please wait.',
      });

      const { timestamp } = await web3Helpers.getBlock();
      const secondsDifference = lockDate?.diff(moment(), 'seconds');
      const startSwapTime = BigInt(secondsDifference) + timestamp + '';

      let txResult: any;

      if (token1.symbol == 'ETH') {
        txResult = await writeRouterContract({
          account: userAddress,
          address: FLASHPAD_ROUTER_ADDRESS as Address,
          abi: RouterABI,
          functionName: 'addLiquidityETH',
          args: [
            token2.address,
            token2AmountIn,
            token2AmountMin,
            token1AmountMin,
            userAddress!,
            (timestamp as bigint) + minutesToSeconds(deadline) + '',
            daysToSeconds(timeLock) + '',
            startSwapTime,
          ],
          value: token1AmountMin as unknown as bigint,
        });
      } else if (token2.symbol == 'ETH') {
        txResult = await writeRouterContract({
          account: userAddress,
          address: FLASHPAD_ROUTER_ADDRESS as Address,
          abi: RouterABI,
          functionName: 'addLiquidityETH',
          args: [
            token1.address,
            token1AmountIn,
            token1AmountMin,
            token2AmountMin,
            userAddress!,
            (timestamp as bigint) + minutesToSeconds(deadline) + '',
            daysToSeconds(timeLock) + '',
            startSwapTime,
          ],
          value: token2AmountMin as unknown as bigint,
        });
      } else {
        txResult = await writeRouterContract({
          account: userAddress,
          address: FLASHPAD_ROUTER_ADDRESS as Address,
          abi: RouterABI,
          functionName: 'addLiquidity',
          args: [
            token1.address,
            token2.address,
            token1AmountIn,
            token2AmountIn,
            token1AmountMin,
            token2AmountMin,
            userAddress!,
            (timestamp as bigint) + minutesToSeconds(deadline) + '',
            daysToSeconds(timeLock) + '',
            startSwapTime,
          ],
        });
      }

      console.log({ txResult });

      if (!txResult) {
        stopLoadingTx();
        setSuccessful(false);
        setFailed(true);
        return;
      }

      const hash = txResult.hash;
      const txReceipt = await waitForTransaction({ hash });
      console.log({ txReceipt });
      const result = txResult.result;

      resetInput();
      stopLoadingTx();
      setSuccessful(true);
      setFailed(false);
      customToast({
        message: 'Added liquidity successfully',
        type: 'success',
      });

      mutate(allPairsKey, allPairsKeyForAll);
      startSuccessTx(
        handleSuccessTxMessageActionWithPair({
          action: 'provided liquidity',
          token1: token1.symbol,
          token2: token2.symbol,
          txHash: hash,
          usdValue: result
            ? new BigNumber(result[2])
                .div(new BigNumber(10).pow(18))
                .toString(10)
            : '',
        })
      );
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
  };

  const handleAddLiquidityCreatePosition = async () => {
    try {
      const {
        writeContract: writeNftPoolFactoryContract,
        ABI: NFTPoolFactoryABI,
      } = userNftPoolFactoryContractWrite();
      setSuccessful(undefined);
      if (!userAddress) {
        customToast({
          message: 'A wallet is not yet connected',
          type: 'error',
        });
        return;
      }

      if (!nftPoolAddress || nftPoolAddress === ADDRESS_ZERO) {
        startLoadingTx({
          tokenPairs: token1?.symbol + ' - ' + token2?.symbol,
          title: 'Creating spNFT pool ...',
          message: 'Confirming your transaction, please wait.',
        });
        const lpAddress = await routerContract.getPair(
          token1.address,
          token2.address
        );

        const createPoolRes = await writeNftPoolFactoryContract({
          address: NFT_POOL_FACTORY_ADDRESS as Address,
          abi: NFTPoolFactoryABI,
          functionName: 'createPool',
          args: [lpAddress!],
        });

        if (!createPoolRes) {
          stopLoadingTx();
          setSuccessful(false);
          setFailed(true);
          return;
        }

        const hash = createPoolRes.hash;
        const txReceipt = await waitForTransaction({ hash });
        console.log({ txReceipt });

        stopLoadingTx();
        mutate(allNftPoolsKey);
        customToast({
          message: 'Initialized spNFT pool successfully',
          type: 'success',
        });
        setSuccessful(true);
        setFailed(false);
      }

      setOpenAddLiquidityCreatePosition(true);
    } catch (error) {
      stopLoadingTx();
      handleError(error);
    }
  };

  const handleSwitchPair = () => {
    setToken1(token2);
    setToken2(token1);
    setToken1Amount('0');
    setToken2Amount('0');
  };

  useEffect(() => {
    setToken1(initialToken1);
  }, [initialToken1]);
  useEffect(() => {
    setToken2(initialToken2);
  }, [initialToken2]);
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
      <AddLiquidityAndCreatePositionModal
        isOpen={isOpenAddLiquidityCreatePosition}
        toggleOpen={toggleOpenAddLiquidityCreatePosition}
        reserves={reserves as any[]}
        pairToken1={pairToken1 as Address}
        initialToken1Amount={token1Amount}
        initialToken2Amount={token2Amount}
        token1Address={token1?.address}
        token2Address={token2?.address}
        token1Symbol={token1?.symbol}
        token2Symbol={token2?.symbol}
        token1Logo={token1?.logo_uri}
        token2Logo={token2?.logo_uri}
        token1Decimals={balanceToken1?.decimals!}
        token2Decimals={balanceToken2?.decimals!}
        balanceToken1={balanceToken1?.formatted!}
        balanceToken2={balanceToken2?.formatted!}
        bnBalanceToken1={balanceToken1?.value! + ''}
        bnBalanceToken2={balanceToken2?.value! + ''}
        timeLock={timeLock}
        deadline={deadline}
        slippage={slippage}
        nftPoolAddress={nftPoolAddress!}
      />
      <div className="max-w-[648px] w-[calc(100%-26px)] bg-dark rounded-lg h-auto my-[50px] lg:mt-[116px] lg:mb-[40px] mx-auto py-4 px-[10px] md:px-[24px]">
        <div className="text-2xl font-bold mx-auto w-fit flex items-center gap-3">
          <SwapLeftIcon />
          {FEATURE_PROPS[feature].label}
          <SwapRightIcon />
        </div>
        <div className=" flex items-center gap-2 mt-8 justify-between">
          <div className="text-primary font-semibold flex items-center gap-2 text-sm lg:text-base ">
            V2 MODE
            <QuestionIcon />
          </div>

          <div className="flex items-center gap-3 cursor-pointer">
            <ReloadIcon onClick={() => resetInput(true)} />
            <LockManageIcon onClick={toggleLockManage} />
            <SettingIcon onClick={toggleOpenSetting} />
          </div>
        </div>
        <div className="flex bg-darkBlue mt-3 rounded-lg">
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
        <TokenForm
          openModal={() => {
            setTokenBeingSelected(1);
            toggleOpen();
          }}
          tokensList={tokensList}
          title={inputTitle1}
          tokenData={{
            symbol: token1 ? token1.symbol! : '',
            balance: token1 ? balanceToken1?.formatted! : '?',
            logo: token1 ? token1.logo_uri : '',
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
        </div>
        <TokenForm
          disabled={!isFirstLP}
          openModal={() => {
            setTokenBeingSelected(2);
            toggleOpen();
          }}
          tokensList={tokensList}
          title={inputTitle2}
          tokenData={{
            symbol: token2 ? token2.symbol! : '',
            balance: token2 ? balanceToken2?.formatted! : '?',
            logo: token2 ? token2.logo_uri : '',
          }}
          value={token2Amount}
          setTokenAmount={(value) => {
            // if (!isFirstLP || !isFirstSpMinter) {
            if (!isFirstLP) {
            } else {
              setToken2Amount(value);
              autoAdjustToken1Amount(value);
            }
          }}
        />
        {userAddress && (
          <LiquidityPairInfo
            pairToken1={pairToken1 as Address}
            reserves={reserves as any}
            isFirstLP={isFirstLP}
            isSpNFT={feature === 'STAKE POSITION'}
            token1Data={{
              address: token1?.address,
              symbol: token1?.symbol,
              decimals: balanceToken1?.decimals,
            }}
            token2Data={{
              address: token2?.address,
              symbol: token2?.symbol,
              decimals: balanceToken2?.decimals,
            }}
            token1Amount={token1Amount}
            token2Amount={token2Amount}
            nftPoolAddress={nftPoolAddress}
          />
        )}
        {insufficient && (
          <Notification message="Error: Insufficient Balance" type="error" />
        )}
        {/* {!isConnected && (
          <Notification message="Please connect to a Wallet" type="error" />
        )} */}
        {successful && (
          <Notification
            message={`${
              feature === 'STAKE POSITION' && isFirstSpMinter
                ? 'Initialized'
                : FEATURE_PROPS[feature].buttonName
            } successfully`}
            type="success"
          />
        )}
        {failed && (
          <Notification
            message={`${
              feature === 'STAKE POSITION' && isFirstSpMinter
                ? 'Initialized'
                : FEATURE_PROPS[feature].buttonName
            } failed`}
            type="error"
          />
        )}
        {isFirstLP && feature === 'ADD LIQUIDITY' && (
          <>
            <div className="text-sm mt-4 flex gap-2 items-center">
              Swap Lockup Until:
              <div
                data-tooltip-id="swapLockup"
                data-tooltip-content={
                  'The time which users must wait before they can start swapping their tokens.'
                }
                data-tooltip-place="right-start"
              >
                <QuestionIcon />
                <Tooltip id="swapLockup" />
              </div>
            </div>
            <Datetime value={lockDate} onChange={(date) => setLockDate(date)} />
          </>
        )}

        {isFirstLP && (
          <Notification
            message="You are the first liquidity provider! The token ratio that you choose here will set the price of this pool."
            type="info"
          />
        )}
        {feature === 'STAKE POSITION' && isFirstSpMinter && (
          <Notification
            message="You are the first spNFT minter for this asset! You will need to initialize the spNFT contract first."
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
        <div
          className="mx-auto w-fit mt-4 mb-4 hover:underline cursor-pointer flex items-center gap-2 text-[#98A2B3]"
          onClick={handleViewPositions}
        >
          <BackIcon /> View {feature === 'ADD LIQUIDITY' ? 'LP V2' : 'spNFT'}{' '}
          Positions
        </div>
        <Button
          onClick={() => {
            feature === 'ADD LIQUIDITY'
              ? handleAddLiquidity()
              : handleAddLiquidityCreatePosition();
          }}
          className="w-full justify-center mb-2 px-[42px]"
          disabled={
            !token1 ||
            !token2 ||
            !userAddress ||
            ((feature != 'STAKE POSITION' || !isFirstSpMinter) &&
              (!token1Amount || !token2Amount))
          }
        >
          {feature === 'STAKE POSITION' && isFirstSpMinter
            ? 'Initialize'
            : FEATURE_PROPS[feature]?.buttonName}
        </Button>
        <DividerDown />
      </div>
    </>
  );
};

export default TradeForm;
