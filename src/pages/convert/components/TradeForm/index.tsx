import { Button } from '@/components/button/Button';
import customToast from '@/components/notification/customToast';
import { handleSuccessTxMessageSwap } from '@/components/successTxMessage';
import { useLoading } from '@/context/LoadingContext';
import { useERC20TokenContractWrite } from '@/hooks/contract/useErc20TokenContract';
import { useRouterContractWrite } from '@/hooks/contract/useRouterContract';
import { allPairsKey, allPairsKeyForAll } from '@/hooks/useAllPairsData';
import DividerDown from '@/icons/DividerDown';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import {
  ADDRESS_ZERO,
  ARTHUR_ROUTER_ADDRESS,
  CHAINS_TOKENS_LIST,
  K_5_MIN,
  MAX_UINT256,
  X_ARTHUR_TOKEN_ADDRESS,
} from '@/utils/constants';
import * as erc20TokenContract from '@/utils/erc20TokenContract';
import { handleError } from '@/utils/handleError';
import * as pairContract from '@/utils/pairContract';
import * as routerContract from '@/utils/routerContract';
import handleSwitchNetwork from '@/utils/switchNetwork';
import * as web3Helpers from '@/utils/web3Helpers';
import * as xARTContract from '@/utils/xARTContract';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { Address } from 'viem';
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi';
import { lineaTestnet } from 'wagmi/chains';
import TokenForm from '../TokenForm';

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
  const ART_TOKEN = CHAINS_TOKENS_LIST.find((token) => token.symbol === 'ART');
  const XART_TOKEN = CHAINS_TOKENS_LIST.find(
    (token) => token.symbol === 'xART'
  );
  const { address: userAddress } = useAccount();
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { mutate } = useSWRConfig();

  const [isOpen, setOpen] = useState<boolean>(false);
  const [token1, setToken1] = useState<any>(ART_TOKEN);
  const [token2, setToken2] = useState<any>(XART_TOKEN);
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
    const rate = (await xARTContract.read(
      X_ARTHUR_TOKEN_ADDRESS as `0x${string}`,
      'redeem',
      [1, 100000000]
    )) as bigint;
    console.log(rate);
  };
  useEffect(() => {
    getRate();
  }, [userAddress]);

  const toggleOpen = () => setOpen(!isOpen);

  const handleConvert = async () => {
    try {
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
        const { writeContract, ABI: ERC20ABI } = useERC20TokenContractWrite();
        const { hash } = await writeContract({
          address: token1.address,
          abi: ERC20ABI,
          functionName: 'approve',
          args: [ARTHUR_ROUTER_ADDRESS, MAX_UINT256],
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
          address: ARTHUR_ROUTER_ADDRESS as Address,
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
          address: ARTHUR_ROUTER_ADDRESS as Address,
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
        console.log('trigger build');
        txResult = await writeContract({
          address: ARTHUR_ROUTER_ADDRESS as Address,
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

  return (
    <>
      <div className="max-w-[648px] w-[calc(100%-26px)] bg-dark rounded-lg h-auto  my-[50px] lg:mt-[96px] lg:mb-[40px] mx-auto py-4 px-[24px]">
        <div className="text-2xl font-bold mx-auto  w-fit flex items-center gap-3">
          <SwapLeftIcon />
          Convert xART/ART
          <SwapRightIcon />
        </div>

        <TokenForm
          openModal={() => {
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
          disabled
        />
        <div className="bg-darkBlue rounded-lg my-2 mb-3 p-4 text-sm">
          The current rate for xART/ART is 1:1
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
