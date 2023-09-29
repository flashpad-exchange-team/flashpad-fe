import { Button } from '@/components/button/Button';
import BNBICon from '@/icons/BNBIcon';
import CalculatorIcon from '@/icons/Calculator';
import ChartLineIcon from '@/icons/ChartLineIcon';
import DollarIcon from '@/icons/DollarIcon';
import FeeIcon from '@/icons/FeeIcon';
import FlowIcon from '@/icons/FlowIcon';
import Link from '@/icons/Link';
import {
  ADDRESS_ZERO,
  CHAINS_TOKENS_LIST,
  CHAIN_EXPLORER_URL,
} from '@/utils/constants';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Notification from '@/components/notification/Notification';
import Staked from './components/Staked';
import NotStaked from './components/NotStaked';
import ApyCalculatorModal from '@/components/modal/ApyCalculatorModal';
import { useRouter } from 'next/router';
import * as pairContract from '@/utils/pairContract';
import * as erc20Contract from '@/utils/erc20TokenContract';
import * as nftPoolFactoryContract from '@/utils/nftPoolFactoryContract';
import * as nftPoolContract from '@/utils/nftPoolContract';
import * as covalentApiService from '@/services/covalentApi.service';
import { Address } from 'viem';
import { useAccount } from 'wagmi';
import CreatePositionModal from '@/components/modal/CreatePositionModal';
import customToast from '@/components/notification/customToast';
import AddToPositionModal from '@/components/modal/AddToPositionModal';
import WithdrawPositionModal from '@/components/modal/WithdrawPositionModal';
import HarvestModal from '@/components/modal/HarvestModal';
import LockPositionModal from '@/components/modal/LockPositionModal';
import BoostPositionModal from '@/components/modal/BoostPositionModal';
import PoolInfoModal from '@/components/modal/PoolInfoModal';
import { waitForTransaction } from '@wagmi/core';
import { useLoading } from '@/context/LoadingContext';
import { useSWRConfig } from 'swr';
import { allNftPoolsKey } from '@/hooks/useAllNftPoolsData';

const PoolDetail = () => {
  const router = useRouter();
  const {
    pairAddress,
    //...queryParams,
  } = router.query;
  console.log({ pairAddress });

  const { address: userAddress } = useAccount();
  const { startLoadingTx, stopLoadingTx } = useLoading();
  const { mutate } = useSWRConfig();
  const [poolInfo, setPoolInfo] = useState({} as any);
  const [successful, setSuccessful] = useState<boolean | undefined>(undefined);
  const [nftPoolAddress, setNftPoolAddress] = useState<Address>(ADDRESS_ZERO);
  const [token1Symbol, setToken1Symbol] = useState<string>('');
  const [token2Symbol, setToken2Symbol] = useState<string>('');
  const [token1Logo, setToken1Logo] = useState<string>('');
  const [token2Logo, setToken2Logo] = useState<string>('');

  const [userSpNfts, setUserSpNfts] = useState<any>();
  const [spNFTTokenId, setSpNFTTokenId] = useState<string | null>(null);
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
  const [openPoolInfo, setOpenPoolInfo] = useState<boolean>(false);
  const togglePoolInfo = () => setOpenPoolInfo(!openPoolInfo);

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
    const poolAddress = await nftPoolFactoryContract.getPool(pairAddress);
    if (poolAddress) {
      setNftPoolAddress(poolAddress);
    }

    const poolInfoObj = await nftPoolContract.read(
      poolAddress as Address,
      'getPoolInfo',
      []
    );

    setPoolInfo(poolInfoObj);

    let token1Symbol = 'TOKEN1',
      token2Symbol = 'TOKEN2';
    if (
      pairAddress.toLowerCase() ===
      '0xb1f8a7c4fdaA4b79ad2052e09D8BBA5296e42090'.toLowerCase()
    ) {
      token1Symbol = await erc20Contract.erc20Read(pairAddress, 'symbol', []);
      token2Symbol = token1Symbol;
    } else {
      const [token1Address, token2Address] = await Promise.all([
        pairContract.read(pairAddress, 'token0', []),
        pairContract.read(pairAddress, 'token1', []),
      ]);

      if (token1Address) {
        [token1Symbol, token2Symbol] = await Promise.all([
          erc20Contract.erc20Read(token1Address, 'symbol', []),
          erc20Contract.erc20Read(token2Address, 'symbol', []),
        ]);
      } else {
        token1Symbol = await erc20Contract.erc20Read(pairAddress, 'symbol', []);
        token2Symbol = token1Symbol;
      }
    }

    token1Symbol = token1Symbol == 'WFTM' ? 'ETH' : token1Symbol;
    token2Symbol = token2Symbol == 'WFTM' ? 'ETH' : token2Symbol;

    setToken1Symbol(token1Symbol);
    setToken2Symbol(token2Symbol);

    const token1Logo = CHAINS_TOKENS_LIST.find(
      (e) => e.symbol === token1Symbol
    )?.logoURI;
    setToken1Logo(token1Logo || '');

    const token2Logo = CHAINS_TOKENS_LIST.find(
      (e) => e.symbol === token2Symbol
    )?.logoURI;
    setToken2Logo(token2Logo || '');
  };

  const getUserStakedPositions = async () => {
    if (!userAddress || nftPoolAddress === ADDRESS_ZERO) return;

    const spNfts = await covalentApiService.getNFTsOwnedByAddress(
      userAddress,
      nftPoolAddress
    );
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
    }

    getPoolInfo(pairAddress as Address);
    getUserStakedPositions();
  }, [router.isReady, userAddress, nftPoolAddress, successful]);

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

  return (
    <>
      <PoolInfoModal
        isOpen={openPoolInfo}
        toggleOpen={togglePoolInfo}
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
        toggleAddToPosition={toggleAddToPosition}
        toggleWithdrawPosition={toggleWithdrawPosition}
        toggleLockPosition={toggleLockPosition}
        toggleBoostPosition={toggleBoostPosition}
        poolInfo={poolInfo}
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
                {token1Symbol} - {token2Symbol}
              </div>
            </div>

            <div className="flex items-center gap-3 font-medium text-base mt-6">
              <div className="flex items-center gap-1 ">
                <DollarIcon />
                $44k <span className="text-secondary ">TVL</span>
              </div>
              <div className="flex items-center gap-1 ">
                <FeeIcon />
                1,88% <span className="text-secondary ">Fees APR</span>
              </div>
              <div className="flex items-center gap-1 ">
                <FlowIcon />
                $185 <span className="text-secondary ">24h Volume</span>
              </div>
              <div className="flex items-center gap-1 ">
                <ChartLineIcon />
                $20 <span className="text-secondary ">24h fees</span>
              </div>
            </div>
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
            <Button
              className="text-white text-sm h-[42px] px-6 "
              style={{ background: '#101828' }}
              onClick={toggleOpenApyCalculator}
            >
              <CalculatorIcon color="white" />
              APY
            </Button>
          </div>
        </div>
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
            togglePoolInfo={togglePoolInfo}
            setSpNFTTokenId={setSpNFTTokenId}
          />
        ) : (
          <NotStaked
            toggleOpenCreatePosition={handleCreateStakingPosition}
            isFirstSpMinter={isFirstSpMinter}
          />
        )}
        {isFirstSpMinter && (
          <Notification
            message="The spNFT for this asset has not been created yet! You will need to initialize the spNFT contract first."
            type="info"
            className="mt-3 mb-6"
          />
        )}
      </div>
    </>
  );
};

export default PoolDetail;
