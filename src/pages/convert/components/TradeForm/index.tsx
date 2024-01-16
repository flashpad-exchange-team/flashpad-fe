import { Button } from '@/components/button/Button';
import customToast from '@/components/notification/customToast';
import { useLoading } from '@/context/LoadingContext';
import { useXFlashContractWrite } from '@/hooks/contract/useXFlashContract';
import DividerDown from '@/icons/DividerDown';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import {
  APP_BASE_CHAIN,
  CHAINS_TOKENS_LIST,
  X_FLASH_TOKEN_ADDRESS,
} from '@/utils/constants';
import { handleError } from '@/utils/handleError';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi';
import TokenForm from '../TokenForm';
import { handleSuccessTxMessageActionSingleToken } from '@/components/successTxMessage';
import handleSwitchNetwork from '@/utils/switchNetwork';

const FEATURE_PROPS: { [k: string]: any } = {
  'Get xFLASH': {
    value: 'Get xFLASH',
    label: 'Get xFLASH',
    buttonName: 'Get xFLASH',
  },
  'Redeem FLASH': {
    value: 'Redeem FLASH',
    label: 'Redeem FLASH',
    buttonName: 'Redeem FLASH',
  },
};

interface TradeFormProps {
  title: string;
  buttonName: string;
  inputTitle1: string;
  inputTitle2: string;
  dividerIcon: React.ReactNode;
}

const TradeForm = ({
  buttonName,
  inputTitle1,
  inputTitle2,
  dividerIcon,
}: TradeFormProps) => {
  const FLASH_TOKEN = CHAINS_TOKENS_LIST.find(
    (token) => token.symbol === 'FLASH'
  );
  const XFLASH_TOKEN = CHAINS_TOKENS_LIST.find(
    (token) => token.symbol === 'xFLASH'
  );
  const { address: userAddress } = useAccount();
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const [isOpen, setOpen] = useState<boolean>(false);
  const [token1, setToken1] = useState<any>(FLASH_TOKEN);
  const [token2, setToken2] = useState<any>(XFLASH_TOKEN);
  const [token1Amount, setToken1Amount] = useState<string>('0');
  const [token2Amount, setToken2Amount] = useState<string>('0');

  const rate = 1;

  useEffect(() => {
    setToken2Amount('' + +token1Amount * rate);
  }, [token1Amount]);

  const resetInput = (isReload?: boolean) => {
    if (isReload) {
      setToken1(null);
      setToken2(null);
    }
    setToken1Amount('');
    setToken2Amount('');
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

  const getRate = async () => {
    // const rate = (await xARTContract.read(
    //   X_ARTHUR_TOKEN_ADDRESS as `0x${string}`,
    //   'redeem',
    //   [1, 100000000]
    // )) as bigint;
    // console.log(rate);
  };
  useEffect(() => {
    getRate();
  }, [userAddress]);

  const toggleOpen = () => setOpen(!isOpen);

  const handleConvert = async () => {
    try {
      if (chain?.id !== APP_BASE_CHAIN.id) {
        handleSwitchNetwork(switchNetwork);
        return;
      }
      if (!userAddress) {
        customToast({
          message: 'A wallet is not yet connected',
          type: 'error',
        });
        return;
      }

      if (token1Amount == '0') {
        customToast({
          message: 'Please input valid amount',
          type: 'error',
        });
        return;
      }

      startLoadingTx({
        tokenPairs: 'FLASH - xFLASH',
        title: 'Converting FLASH to xFLASH',
        message: 'Confirming your transaction, please wait.',
      });

      const amountParsed = BigNumber(token1Amount).times(BigNumber(10).pow(18));

      const { writeContract: writeXFlashContract, ABI: xFlashABI } =
        useXFlashContractWrite();

      const txResult = await writeXFlashContract({
        address: X_FLASH_TOKEN_ADDRESS as Address,
        abi: xFlashABI,
        functionName: 'convert',
        args: [amountParsed.toString()],
      });

      if (!txResult) {
        stopLoadingTx();
        return;
      }

      const hash = txResult.hash;
      await waitForTransaction({ hash });

      stopLoadingTx();

      startSuccessTx(
        handleSuccessTxMessageActionSingleToken({
          action: 'convert',
          token: 'xFLASH',
          txHash: hash,
          amount: token1Amount,
        })
      );
      resetInput();
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
  const [feature, setFeature] = useState('Get xFLASH');

  return (
    <>
      <div className="max-w-[648px] w-[calc(100%-26px)] bg-dark rounded-lg h-auto  my-[50px] lg:mt-[116px] lg:mb-[40px] mx-auto py-4 px-[24px]">
        <div className="text-2xl font-bold mx-auto  w-fit flex items-center gap-3">
          <SwapLeftIcon />
          Convert xFLASH/FLASH
          <SwapRightIcon />
        </div>
        <div className="flex bg-darkBlue mt-3 rounded-lg">
          {Object.keys(FEATURE_PROPS).map((key: string) => (
            <button
              className={`w-1/2 text-center py-3  rounded-md focus:outline-none font-semibold ${
                feature === key
                  ? 'bg-[#FFAF1D] border border-[#FFAF1D] text-black'
                  : ''
              }`}
              onClick={() => {
                setFeature(FEATURE_PROPS[key].value);
                handleSwitchPair();
              }}
            >
              {FEATURE_PROPS[key].label}
            </button>
          ))}
        </div>

        <div className="text-sm mt-4 pb-3">
          {feature === 'Get xFLASH'
            ? 'Unlock bonus rewards and exclusive benefits by converting your FLASH to xFLASH.'
            : 'Redeem your xFLASH back into FLASH over a vesting period of 15 days (1:0.5 ratio) to 6 months (1:1 ratio).'}
        </div>
        <TokenForm
          openModal={() => {
            toggleOpen();
          }}
          title={inputTitle1}
          tokenData={{
            symbol: token1 ? token1?.symbol! : '',
            balance: token1 ? balanceToken1?.formatted! : '?',
            logo: token1 ? token1?.logo_uri : '',
            amount: token1Amount,
          }}
          setTokenAmount={(value) => setToken1Amount(value)}
        />
        <div className="mx-auto w-fit cursor-pointer">{dividerIcon}</div>
        <TokenForm
          openModal={() => {
            toggleOpen();
          }}
          title={inputTitle2}
          tokenData={{
            symbol: token2 ? token2?.symbol! : '',
            balance: token2 ? balanceToken2?.formatted! : '?',
            logo: token2 ? token2?.logo_uri : '',
            amount: token2Amount,
          }}
          setTokenAmount={(value) => setToken2Amount(value)}
          disabled
        />
        <div className="bg-darkBlue rounded-lg my-2 mb-3 p-4 text-sm">
          The current rate for xFLASH/FLASH is 1:1
        </div>

        <Button
          onClick={() => handleConvert()}
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
