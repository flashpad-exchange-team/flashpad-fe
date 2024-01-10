import { Button } from '@/components/button/Button';
import customToast from '@/components/notification/customToast';
import { handleSuccessTxMessageActionWithPair } from '@/components/successTxMessage';
import { useLoading } from '@/context/LoadingContext';
import { useThunderPoolContractWrite } from '@/hooks/contract/useThunderPoolContract';
import useAllThunderPoolsData from '@/hooks/useAllThunderPoolsData';
import useWindowWidth from '@/hooks/useWindowWidth';
import BNBICon from '@/icons/BNBIcon';
import DownloadIcon from '@/icons/DownloadIcon';
import LayerIcon from '@/icons/LayerIcon';
import Link from '@/icons/Link';
import SaleIcon from '@/icons/SaleIcon';
import WalletIcon from '@/icons/WalletIcon';
import { ADDRESS_ZERO, CHAIN_EXPLORER_URL } from '@/utils/constants';
import * as erc20TokenContract from '@/utils/contract/erc20TokenContract';
import { handleError } from '@/utils/handleError';
import * as thunderPoolContract from '@/utils/contract/thunderPoolContract';
import * as nftPoolContract from '@/utils/contract/nftPoolContract';
import { waitForTransaction } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Address, useAccount } from 'wagmi';
import TableDetail from './components/TableDetail';
import TableDetailSp from './components/TableDetailSp';
import { getThunderPoolInfo as getThunderPoolInfoApi } from '@/api/thunder-pool';

const FarmThunderDetail = () => {
  const router = useRouter();
  const {
    thunderPool,
    //...queryParams,
  } = router.query;

  const { address: userAddress } = useAccount();
  const { startLoadingTx, stopLoadingTx, startSuccessTx } = useLoading();
  const { data: allThunderPools, isLoading } =
    useAllThunderPoolsData(userAddress);

  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 768;

  const [thunderPoolAddress, setThunderPoolAddress] = useState(ADDRESS_ZERO);
  const [lpTokenAddress, setLpTokenAddress] = useState(ADDRESS_ZERO);

  const [token1Symbol, setToken1Symbol] = useState('');
  const [token2Symbol, setToken2Symbol] = useState('');
  const [token1Logo, setToken1Logo] = useState<string | undefined>('');
  const [token2Logo, setToken2Logo] = useState<string | undefined>('');
  const [rewardsToken1Info, setRewardsToken1Info] = useState<any>(undefined);
  const [rewardsToken2Info, setRewardsToken2Info] = useState<any>(undefined);
  const [rewardsToken1Symbol, setRewardsToken1Symbol] = useState('');
  const [rewardsToken2Symbol, setRewardsToken2Symbol] = useState('');
  const [rewardsToken1Logo, setRewardsToken1Logo] = useState<
    string | undefined
  >('');
  const [rewardsToken2Logo, setRewardsToken2Logo] = useState<
    string | undefined
  >('');
  const [rewardsToken1Decimals, setRewardsToken1Decimals] = useState(18);
  const [rewardsToken2Decimals, setRewardsToken2Decimals] = useState(18);
  const [pendingRewards1, setPendingRewards1] = useState('0');
  const [pendingRewards2, setPendingRewards2] = useState('0');
  const [totalDeposited, setTotalDeposited] = useState('0');
  const [thunderPoolSettings, setThunderPoolSettings] = useState<any>(undefined);
  const [tvl, setTvl] = useState(0);
  const [apr, setApr] = useState(0);

  const getThunderPoolInfo = async () => {
    if (isLoading) return;

    const thunderPoolData = allThunderPools?.find(
      (p) => p.poolAddress.toLowerCase() === (thunderPool + '').toLowerCase()
    );
    if (!thunderPoolData) {
      router.push('/not-found');
      return;
    }

    setThunderPoolAddress(thunderPool as Address);
    const nftPoolAddr = thunderPoolData.nftPoolAddress;
    if (nftPoolAddr) {
      const nftPoolInfo = await nftPoolContract.read(
        nftPoolAddr,
        'getPoolInfo',
        []
      );
      const lpTokenAddr = nftPoolInfo?.lpToken;
      if (lpTokenAddr) {
        setLpTokenAddress(lpTokenAddr);
      }
    }

    setToken1Symbol(thunderPoolData.token1);
    setToken2Symbol(thunderPoolData.token2);
    setToken1Logo(thunderPoolData.token1Logo);
    setToken2Logo(thunderPoolData.token2Logo);

    setRewardsToken1Info(thunderPoolData.rewardsToken1Info);
    setRewardsToken2Info(thunderPoolData.rewardsToken2Info);
    setRewardsToken1Symbol(thunderPoolData.rewardsToken1Symbol);
    setRewardsToken2Symbol(thunderPoolData.rewardsToken2Symbol);
    setRewardsToken1Logo(thunderPoolData.rewardsToken1Logo);
    setRewardsToken2Logo(thunderPoolData.rewardsToken2Logo);

    setPendingRewards1(thunderPoolData.pendingRewards?.pending1 || '0');
    setPendingRewards2(thunderPoolData.pendingRewards?.pending2 || '0');

    setThunderPoolSettings(thunderPoolData.settings);

    const [userInfo, rwdToken1Decimals, rwdToken2Decimals] = await Promise.all([
      thunderPoolContract.read(thunderPool as Address, 'userInfo', [userAddress]),
      erc20TokenContract.erc20Read(
        thunderPoolData.rewardsToken1Info.token,
        'decimals',
        []
      ),
      erc20TokenContract.erc20Read(
        thunderPoolData.rewardsToken2Info.token,
        'decimals',
        []
      ),
    ]);

    setTotalDeposited(
      BigNumber(userInfo?.totalDepositAmount || 0).div(BigNumber(10).pow(18)) +
        ''
    );
    setRewardsToken1Decimals(
      rwdToken1Decimals ? Number(rwdToken1Decimals) : 18
    );
    setRewardsToken2Decimals(
      rwdToken2Decimals ? Number(rwdToken2Decimals) : 18
    );

    const { data } = await getThunderPoolInfoApi(thunderPool + '');
    if (data.data) {
      setTvl(data.data.tvl || 0);
      setApr(data.data.apr || 0);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!thunderPool) {
      router.push('/not-found');
      return;
    }

    getThunderPoolInfo();
  }, [allThunderPools, isLoading]);

  const handleClickBtnContract = () => {
    if (thunderPoolAddress !== ADDRESS_ZERO) {
      window.open(`${CHAIN_EXPLORER_URL}/address/${thunderPoolAddress}`);
    } else {
      customToast({
        message: 'The Thunder pool contract address is undefined',
        type: 'warning',
      });
    }
  };

  const handleHarvest = async () => {
    try {
      if (thunderPoolAddress === ADDRESS_ZERO) return;

      if (!userAddress) {
        customToast({
          message: 'A wallet is not yet connected',
          type: 'error',
        });
        return;
      }

      startLoadingTx({
        tokenPairs: token1Symbol + ' - ' + token2Symbol,
        title: 'Harvesting staked position in Thunder pool...',
        message: 'Confirming your transaction, please wait.',
      });

      const { writeContract: writeThunderPoolContract, ABI } =
        useThunderPoolContractWrite();

      const harvestTx = await writeThunderPoolContract({
        address: thunderPoolAddress,
        abi: ABI,
        functionName: 'harvest',
        args: [],
      });

      if (!harvestTx) {
        stopLoadingTx();
        return;
      }

      const txHash = harvestTx.hash;
      const txReceipt = await waitForTransaction({ hash: txHash });
      console.log({ txReceipt });

      stopLoadingTx();

      startSuccessTx(
        handleSuccessTxMessageActionWithPair({
          action: 'harvested position in Thunder pool',
          token1: token1Symbol,
          token2: token2Symbol,
          txHash: txHash,
          usdValue: `?`,
        })
      );
    } catch (error) {
      stopLoadingTx();

      handleError(error);
    }
  };

  return (
    <div className="max-w-[1096px] w-full mx-auto mb-20 mt-28 px-2">
      <div className="flex flex-col md:flex-row text-2xl font-bold gap-4 justify-between">
        <div>
          <div className="relative">
            <div className="absolute">
              {token1Logo ? (
                <Image
                  alt="logo"
                  src={token1Logo as any}
                  width={40}
                  height={40}
                  className="max-w-[unset]"
                />
              ) : (
                <BNBICon size="40" />
              )}
            </div>
            <div className="absolute left-[25px]">
              {token1Logo != token2Logo &&
                (token2Logo ? (
                  <Image
                    alt="logo"
                    src={token2Logo as any}
                    width={40}
                    height={40}
                    className="max-w-[unset]"
                  />
                ) : (
                  <BNBICon size="40" />
                ))}
            </div>
          </div>
          <div className="ml-16 pl-4">
            {token1Symbol}
            {token1Symbol != token2Symbol && ' - ' + token2Symbol}
          </div>
        </div>
        <div className="flex flex-wrap">
          <Button
            className="px-2 hidden md:!flex order-1 h-[52px] w-[100%] mr-2 md:w-[172px] justify-center"
            onClick={handleClickBtnContract}
          >
            <Link />
            Contract
          </Button>
          {/* <Button className="px-2 h-[52px] w-[100%] order-3 md:order-2 mr-2 md:w-[210px] flex justify-center">
            <CalculatorIcon />
            APY Calculator
          </Button> */}
        </div>
      </div>
      {isSmallScreen ? (
        <TableDetailSp
          data={{
            tvl: tvl.toString(),
            apr: apr.toString(),
            rewardsToken1Info,
            rewardsToken2Info,
            rewardsToken1Symbol,
            rewardsToken2Symbol,
            rewardsToken1Decimals,
            rewardsToken2Decimals,
            totalDeposited,
            settings: thunderPoolSettings,
          }}
        />
      ) : (
        <TableDetail
          data={{
            tvl: tvl.toString(),
            apr: apr.toString(),
            rewardsToken1Info,
            rewardsToken2Info,
            rewardsToken1Symbol,
            rewardsToken2Symbol,
            rewardsToken1Decimals,
            rewardsToken2Decimals,
            totalDeposited,
            settings: thunderPoolSettings,
          }}
        />
      )}
      <div className="flex flex-wrap justify-between items-center mt-6">
        <div className="text-2xl font-bold ">Staked positions</div>
        <div className="flex items-center gap-2">
          <Button
            className="px-6 flex gap-3 order-3 md:order-2 w-full md:w-[147px] md:h-[47px] justify-center"
            onClick={handleHarvest}
          >
            <WalletIcon />
            Harvest
          </Button>
          <Button
            className="px-6 flex gap-3 order-3 md:order-2 w-full md:w-[147px] md:h-[47px] justify-center"
            icon={<DownloadIcon />}
            onClick={() => {
              if (lpTokenAddress != ADDRESS_ZERO) {
                router.push(`/pool-detail/${lpTokenAddress}`);
              }
            }}
          >
            Deposit
          </Button>
        </div>

        <div className="w-full bg-dark flex flex-col md:flex-row items-center gap-3 py-4 px-5 order-2 md:order-3">
          <div className=" rounded-md w-full md:w-1/3">
            <div className="bg-darkBlue px-3 py-2 rounded-md w-full flex items-center justify-between">
              <div>
                <div className="text-lightGray text-xs">AVERAGE APR</div>
                <div className=" text-sm">0%</div>
              </div>
              <div>
                <SaleIcon />
              </div>
            </div>
          </div>
          <div className=" rounded-md w-full md:w-1/3">
            <div className="bg-darkBlue px-3 py-2 rounded-md w-full flex items-center justify-between">
              <div>
                <div className="text-lightGray text-xs">TOTAL DEPOSITS</div>
                <div className=" text-sm">
                  {totalDeposited} {token1Symbol} - {token2Symbol}
                </div>
              </div>
              <div>
                <LayerIcon />
              </div>
            </div>
          </div>
          <div className=" rounded-md w-full md:w-1/3">
            <div className="bg-darkBlue px-3 py-2 rounded-md w-full flex items-center justify-between">
              <div>
                <div className="text-lightGray text-xs">
                  PENDING {rewardsToken1Symbol} REWARDS
                </div>
                <div className=" text-sm">
                  {pendingRewards1} {rewardsToken1Symbol}
                </div>
              </div>
              <div>
                {rewardsToken1Logo ? (
                  <Image
                    alt="logo"
                    src={rewardsToken1Logo as any}
                    width={32}
                    height={32}
                    className="max-w-[unset]"
                  />
                ) : (
                  <BNBICon size="32" />
                )}
              </div>
            </div>
          </div>
          {rewardsToken2Symbol && (
            <div className=" rounded-md w-full md:w-1/3">
              <div className="bg-darkBlue px-3 py-2 rounded-md w-full flex items-center justify-between">
                <div>
                  <div className="text-lightGray text-xs">
                    PENDING {rewardsToken2Symbol} REWARDS
                  </div>
                  <div className=" text-sm">
                    {pendingRewards2} {rewardsToken2Symbol}
                  </div>
                </div>
                <div>
                  {rewardsToken2Logo ? (
                    <Image
                      alt="logo"
                      src={rewardsToken2Logo as any}
                      width={32}
                      height={32}
                      className="max-w-[unset]"
                    />
                  ) : (
                    <BNBICon size="32" />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmThunderDetail;
