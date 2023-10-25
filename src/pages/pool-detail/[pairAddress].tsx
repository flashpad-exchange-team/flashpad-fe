import { Button } from '@/components/button/Button';
import AddToPositionModal from '@/components/modal/AddToPositionModal';
import ApyCalculatorModal from '@/components/modal/ApyCalculatorModal';
import BoostPositionModal from '@/components/modal/BoostPositionModal';
import CreatePositionModal from '@/components/modal/CreatePositionModal';
import HarvestModal from '@/components/modal/HarvestModal';
import LockPositionModal from '@/components/modal/LockPositionModal';
import WithdrawPositionModal from '@/components/modal/WithdrawPositionModal';
import customToast from '@/components/notification/customToast';
import { useLoading } from '@/context/LoadingContext';
import BNBICon from '@/icons/BNBIcon';
import ChartLineIcon from '@/icons/ChartLineIcon';
import DollarIcon from '@/icons/DollarIcon';
import FeeIcon from '@/icons/FeeIcon';
import FlowIcon from '@/icons/FlowIcon';
import Link from '@/icons/Link';
import {
  ADDRESS_ZERO,
  ARTHUR_MASTER_ADDRESS,
  CHAIN_EXPLORER_URL,
  MERLIN_POOL_FACTORY_ADDRESS,
} from '@/utils/constants';
import * as merlinPoolFactoryContract from '@/utils/merlinPoolFactoryContract';
import * as nftPoolFactoryContract from '@/utils/nftPoolFactoryContract';
import * as nftPoolContract from '@/utils/nftPoolContract';
import * as arthurMasterContract from '@/utils/arthurMasterContract';
import * as covalentApiService from '@/services/covalentApi.service';
import { waitForTransaction } from '@wagmi/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { Address } from 'viem';
import { useAccount } from 'wagmi';
import NotStaked from './components/NotStaked';
import Staked from './components/Staked';
import Notification from '@/components/notification/Notification';
import { allNftPoolsKey } from '@/hooks/useAllNftPoolsData';
import useAllPairsData from '@/hooks/useAllPairsData';
import PositionDetailModal from '@/components/modal/PositionDetailModal';
import BigNumber from 'bignumber.js';
import { fetchTotalVolumeByLp } from '@/api';

const PoolDetail = () => {
  const router = useRouter();
  const {
    pairAddress,
    //...queryParams,
  } = router.query;

  const { address: userAddress } = useAccount();
  const { startLoadingTx, stopLoadingTx } = useLoading();
  const { data: allPairsData, isLoading: allPairsLoading } =
    useAllPairsData(userAddress);
  const { mutate } = useSWRConfig();
  const [poolInfo, setPoolInfo] = useState({} as any);
  const [masterPoolInfo, setMasterPoolInfo] = useState({} as any);
  const [successful, setSuccessful] = useState<boolean | undefined>(undefined);
  const [nftPoolAddress, setNftPoolAddress] = useState<Address>(ADDRESS_ZERO);
  const [publishedMerlinPoolsCount, setPublishedMerlinPoolsCount] = useState(0);
  const [token1Symbol, setToken1Symbol] = useState<string>('');
  const [token2Symbol, setToken2Symbol] = useState<string>('');
  const [token1Logo, setToken1Logo] = useState<string>('');
  const [token2Logo, setToken2Logo] = useState<string>('');
  const [TVL, setTVL] = useState<string>('0');

  const [userSpNfts, setUserSpNfts] = useState<any>();
  const [spNFTTokenId, setSpNFTTokenId] = useState<string>('');
  const [isSpNFTStakedToMerlin, setIsSpNFTStakedToMerlin] = useState<
    boolean | undefined
  >(undefined);
  const [isOpenApyCalculator, setOpenApyCalculator] = useState<boolean>(false);
  const [openAddToPosition, setOpenAddToPosition] = useState<boolean>(false);
  const [openWithdrawPosition, setOpenWithdrawPosition] =
    useState<boolean>(false);
  const [openHarvestPosition, setOpenHarvestPosition] =
    useState<boolean>(false);
  const [openLockPosition, setOpenLockPosition] = useState<boolean>(false);
  const [openBoostPosition, setOpenBoostPosition] = useState<boolean>(false);
  const [isOpenCreatePosition, setOpenCreatePosition] =
    useState<boolean>(false);
  const [openPositionDetail, setOpenPositionDetail] = useState<boolean>(false);
  const togglePositionDetail = () => setOpenPositionDetail(!openPositionDetail);

  const toggleAddToPosition = () => setOpenAddToPosition(!openAddToPosition);
  const toggleWithdrawPosition = () =>
    setOpenWithdrawPosition(!openWithdrawPosition);
  const toggleHarvestPosition = () =>
    setOpenHarvestPosition(!openHarvestPosition);
  const toggleLockPosition = () => setOpenLockPosition(!openLockPosition);
  const toggleBoostPosition = () => setOpenBoostPosition(!openBoostPosition);

  const toggleOpenApyCalculator = () => {
    setOpenApyCalculator(!isOpenApyCalculator);
  };

  const handleCreateStakingPosition = async () => {
    if (isOpenCreatePosition) {
      setOpenCreatePosition(false);
      return;
    }

    if (!userAddress) {
      customToast({
        message: 'A wallet is not yet connected',
        type: 'error',
      });
      return;
    }

    if (nftPoolAddress === ADDRESS_ZERO) {
      setSuccessful(undefined);
      startLoadingTx({
        tokenPairs: token1Symbol + ' - ' + token2Symbol,
        title: 'Creating spNFT pool ...',
        message: 'Confirming your transaction. Please wait.',
      });

      const createPoolRes = await nftPoolFactoryContract.createPool(
        userAddress,
        {
          lpTokenAddress: pairAddress as Address,
        }
      );

      if (!createPoolRes) {
        stopLoadingTx();
        setSuccessful(false);
        return;
      }

      const hash = createPoolRes.hash;
      const txReceipt = await waitForTransaction({ hash });
      console.log({ txReceipt });

      setSuccessful(true);
      mutate(allNftPoolsKey);
      stopLoadingTx();
      customToast({
        message: 'Initialized spNFT pool successfully',
        type: 'success',
      });
    }

    setOpenCreatePosition(true);
  };

  const getPoolInfo = async (pairAddress: Address) => {
    if (allPairsLoading) return;

    const pairData = allPairsData?.find(
      (p: any) =>
        p.pairAddress.toLowerCase() === (pairAddress + '').toLowerCase()
    );
    if (!pairData) {
      router.push('/not-found');
      return;
    }
    setTVL(pairData.TVL);

    const poolAddress = await nftPoolFactoryContract.getPool(pairAddress);
    if (poolAddress && poolAddress !== ADDRESS_ZERO) {
      setNftPoolAddress(poolAddress);
      const poolInfoObj = await nftPoolContract.read(
        poolAddress as Address,
        'getPoolInfo',
        []
      );
      const masterPoolInfoRes = await arthurMasterContract.read(
        ARTHUR_MASTER_ADDRESS as any,
        'getPoolInfo',
        [poolAddress as Address]
      );
      setMasterPoolInfo(masterPoolInfoRes);
      setPoolInfo(poolInfoObj);
    }
    setToken1Symbol(pairData.token1);
    setToken2Symbol(pairData.token2);
    setToken1Logo(pairData.token1Logo || '');
    setToken2Logo(pairData.token2Logo || '');
  };

  const getUserStakedPositions = async () => {
    if (!userAddress || nftPoolAddress === ADDRESS_ZERO) return;

    const spNfts = await covalentApiService.getNFTsOwnedByAddress(
      userAddress,
      nftPoolAddress
    );

    const nPublishedMerlinPools = await merlinPoolFactoryContract.read(
      MERLIN_POOL_FACTORY_ADDRESS as Address,
      'nftPoolPublishedMerlinPoolsLength',
      [nftPoolAddress]
    );

    setPublishedMerlinPoolsCount(Number(nPublishedMerlinPools || 0));

    for (let i = 0; i < Number(nPublishedMerlinPools); i++) {
      const publishedMerlinPoolAddr = await merlinPoolFactoryContract.read(
        MERLIN_POOL_FACTORY_ADDRESS as Address,
        'getNftPoolPublishedMerlinPool',
        [nftPoolAddress, i]
      );
      const stakedInMerlinSpNfts =
        await covalentApiService.getNFTsOwnedByAddress(
          publishedMerlinPoolAddr,
          nftPoolAddress
        );

      if (stakedInMerlinSpNfts && stakedInMerlinSpNfts.length) {
        spNfts.push(...stakedInMerlinSpNfts);
      }
    }
    spNfts.sort((a, b) => Number(a.token_id || 0) - Number(b.token_id || 0));

    let spNftsWithRewards = [];
    for (const spNft of spNfts) {
      const nft: any = { ...spNft, tokenId: spNft.token_id };
      const [rwd, stakingPosition] = await Promise.all([
        nftPoolContract.read(nftPoolAddress, 'pendingRewards', [nft.tokenId]),
        nftPoolContract.read(nftPoolAddress, 'getStakingPosition', [
          nft.tokenId,
        ]),
      ]);
      spNftsWithRewards.push({
        ...nft,
        pendingRewards: rwd ? rwd + '' : '0',
        stakingPosition,
      });
    }
    spNftsWithRewards = spNftsWithRewards.filter(
      (item: any) => item.stakingPosition.amount != 0
    );
    setUserSpNfts(spNftsWithRewards);
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!pairAddress) {
      router.push('/not-found');
      return;
    }

    getPoolInfo(pairAddress as Address);
    getUserStakedPositions();
  }, [
    router.isReady,
    userAddress,
    nftPoolAddress,
    successful,
    allPairsData,
    allPairsLoading,
  ]);

  const handleClickBtnContract = () => {
    if (nftPoolAddress !== ADDRESS_ZERO) {
      window.open(`${CHAIN_EXPLORER_URL}/address/${nftPoolAddress}`);
    } else {
      customToast({
        message:
          'This liquidity pool has not been initialized with a spNFT contract yet',
        type: 'warning',
      });
    }
  };

  const isFirstSpMinter = nftPoolAddress === ADDRESS_ZERO;
  const isStaked = !!userSpNfts?.length;
  const [vol24h, setVol24h] = useState('0');

  const fetchData = async () => {
    const response = await fetchTotalVolumeByLp({
      lpAddress: pairAddress as string,
      last24h: true,
    });
    setVol24h(response);
  };
  useEffect(() => {
    if (!router.isReady) return;
    if (pairAddress) {
      fetchData();
    }
  }, [pairAddress]);

  const feeShare = new BigNumber(vol24h).times(0.3).div(100);
  const feeAPR = feeShare.times(365).div(TVL).times(100);

  const dailyART = new BigNumber(masterPoolInfo?.poolEmissionRate)
    .times(86400)
    .div(1000000000000000000);

  const farmBaseAPR = dailyART.times(365).div(TVL).times(100);
  return (
    <>
      <PositionDetailModal
        isOpen={openPositionDetail}
        toggleOpen={togglePositionDetail}
        lpAddress={pairAddress as Address}
        nftPoolAddress={nftPoolAddress}
        token1Data={{
          symbol: token1Symbol,
          logo: token1Logo,
        }}
        token2Data={{
          symbol: token2Symbol,
          logo: token2Logo,
        }}
        refetchData={getUserStakedPositions}
        spNFTTokenId={spNFTTokenId}
        isSpNFTStakedToMerlin={isSpNFTStakedToMerlin}
        listSpNfts={userSpNfts}
        toggleAddToPosition={toggleAddToPosition}
        toggleWithdrawPosition={toggleWithdrawPosition}
        toggleLockPosition={toggleLockPosition}
        toggleBoostPosition={toggleBoostPosition}
        toggleHarvestPosition={toggleHarvestPosition}
        poolInfo={poolInfo}
        publishedMerlinPoolsCount={publishedMerlinPoolsCount}
      />
      <AddToPositionModal
        isOpen={openAddToPosition}
        toggleOpen={toggleAddToPosition}
        lpAddress={pairAddress as Address}
        nftPoolAddress={nftPoolAddress}
        token1Data={{
          symbol: token1Symbol,
          logo: token1Logo,
        }}
        token2Data={{
          symbol: token2Symbol,
          logo: token2Logo,
        }}
        refetchData={getUserStakedPositions}
        spNFTTokenId={spNFTTokenId}
        listSpNfts={userSpNfts}
        feeAPR={feeAPR}
        farmBaseAPR={farmBaseAPR}
      />
      <WithdrawPositionModal
        isOpen={openWithdrawPosition}
        toggleOpen={toggleWithdrawPosition}
        lpAddress={pairAddress as Address}
        nftPoolAddress={nftPoolAddress}
        token1Data={{
          symbol: token1Symbol,
          logo: token1Logo,
        }}
        token2Data={{
          symbol: token2Symbol,
          logo: token2Logo,
        }}
        refetchData={getUserStakedPositions}
        spNFTTokenId={spNFTTokenId}
        listSpNfts={userSpNfts}
      />
      <HarvestModal
        isOpen={openHarvestPosition}
        toggleOpen={toggleHarvestPosition}
        lpAddress={pairAddress as Address}
        nftPoolAddress={nftPoolAddress}
        token1Data={{
          symbol: token1Symbol,
          logo: token1Logo,
        }}
        token2Data={{
          symbol: token2Symbol,
          logo: token2Logo,
        }}
        refetchData={getUserStakedPositions}
        spNFTTokenId={spNFTTokenId}
      />
      <LockPositionModal
        isOpen={openLockPosition}
        toggleOpen={toggleLockPosition}
        lpAddress={pairAddress as Address}
        nftPoolAddress={nftPoolAddress}
        token1Data={{
          symbol: token1Symbol,
          logo: token1Logo,
        }}
        token2Data={{
          symbol: token2Symbol,
          logo: token2Logo,
        }}
        refetchData={getUserStakedPositions}
        spNFTTokenId={spNFTTokenId}
        listSpNfts={userSpNfts}
        feeAPR={feeAPR}
        farmBaseAPR={farmBaseAPR}
      />
      <BoostPositionModal
        isOpen={openBoostPosition}
        toggleOpen={toggleBoostPosition}
        lpAddress={pairAddress as Address}
        nftPoolAddress={nftPoolAddress}
        token1Data={{
          symbol: token1Symbol,
          logo: token1Logo,
        }}
        token2Data={{
          symbol: token2Symbol,
          logo: token2Logo,
        }}
        refetchData={getUserStakedPositions}
        spNFTTokenId={spNFTTokenId}
      />
      <CreatePositionModal
        isOpen={isOpenCreatePosition}
        toggleOpen={handleCreateStakingPosition}
        lpAddress={pairAddress as Address}
        nftPoolAddress={nftPoolAddress}
        token1Data={{
          symbol: token1Symbol,
          logo: token1Logo,
        }}
        token2Data={{
          symbol: token2Symbol,
          logo: token2Logo,
        }}
        refetchData={getUserStakedPositions}
        feeAPR={feeAPR}
        farmBaseAPR={farmBaseAPR}
      />
      <ApyCalculatorModal
        isOpen={isOpenApyCalculator}
        toggleOpen={toggleOpenApyCalculator}
      />
      <div className="max-w-[1096px] w-full mx-auto my-20 px-2">
        <div className="flex justify-between">
          <div>
            <div className="flex  text-2xl font-bold gap-4">
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
                  {token2Logo ? (
                    <Image
                      alt="logo"
                      src={token2Logo as any}
                      width={40}
                      height={40}
                      className="max-w-[unset]"
                    />
                  ) : (
                    <BNBICon size="40" />
                  )}
                </div>
              </div>
              <div className="ml-16">
                {token1Symbol || 'Token A'} - {token2Symbol || 'Token B'}
              </div>
            </div>
            {isFirstSpMinter || (
              <div className="flex items-center gap-3 font-medium text-base mt-6">
                <div className="flex items-center gap-1 ">
                  <DollarIcon />${TVL}{' '}
                  <span className="text-secondary ">TVL</span>
                </div>
                <div className="flex items-center gap-1 ">
                  <FeeIcon />
                  {feeAPR.times(100).toFixed(2)}%{' '}
                  <span className="text-secondary ">Fees APR</span>
                </div>
                <div className="flex items-center gap-1 ">
                  <FlowIcon />${new BigNumber(vol24h).toFixed(2)}
                  <span className="text-secondary ">24h Volume</span>
                </div>
                <div className="flex items-center gap-1 ">
                  <ChartLineIcon />$
                  {new BigNumber(vol24h).div(1000).times(3).toFixed(2)}{' '}
                  <span className="text-secondary ">24h fees</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              className="text-white text-sm h-[42px] px-6"
              style={{ background: '#101828' }}
              onClick={handleClickBtnContract}
            >
              <Link color="white" />
              Contract
            </Button>
            {/* <Button
              className="text-white text-sm h-[42px] px-6 "
              style={{ background: '#101828' }}
              onClick={toggleOpenApyCalculator}
            >
              <CalculatorIcon color="white" />
              APY
            </Button> */}
          </div>
        </div>
        <Notification
          message="New position data may need some time to be updated."
          type="info"
          className="mt-3 mb-6"
        />
        {isStaked ? (
          <Staked
            token1Symbol={token1Symbol}
            token2Symbol={token2Symbol}
            token1Logo={token1Logo}
            token2Logo={token2Logo}
            listSpNfts={userSpNfts}
            isFirstSpMinter={isFirstSpMinter}
            toggleOpenCreatePosition={handleCreateStakingPosition}
            toggleAddToPosition={toggleAddToPosition}
            toggleHarvestPosition={toggleHarvestPosition}
            toggleWithdrawPosition={toggleWithdrawPosition}
            toggleLockPosition={toggleLockPosition}
            toggleBoostPosition={toggleBoostPosition}
            togglePositionDetail={togglePositionDetail}
            setSpNFTTokenId={setSpNFTTokenId}
            setIsSpNFTStakedToMerlin={setIsSpNFTStakedToMerlin}
            feeAPR={feeAPR}
            farmBaseAPR={farmBaseAPR}
          />
        ) : (
          <NotStaked
            toggleOpenCreatePosition={handleCreateStakingPosition}
            isFirstSpMinter={isFirstSpMinter}
            dailyART={dailyART}
            feeAPR={feeAPR}
            farmBaseAPR={farmBaseAPR}
          />
        )}
      </div>
    </>
  );
};

export default PoolDetail;
