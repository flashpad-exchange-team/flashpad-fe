import useSWR from 'swr';
import * as nftPoolContract from '@/utils/nftPoolContract';
import * as erc20Contract from '@/utils/erc20TokenContract';
import * as pairContract from '@/utils/pairContract';
import * as merlinPoolFactoryContract from '@/utils/merlinPoolFactoryContract';
import * as merlinPoolContract from '@/utils/merlinPoolContract';
import {
  ADDRESS_ZERO,
  CHAINS_TOKENS_LIST,
  MERLIN_POOL_FACTORY_ADDRESS,
} from '@/utils/constants';
import { Address } from 'viem';

export const allMerlinPoolsKey = 'all-merlin-pools';

const useAllMerlinPoolsData = (userAddress: Address | undefined) => {
  const fetchAllMerlinPools = async () => {
    try {
      const listMerlinPools = [];

      const nPools = await merlinPoolFactoryContract.read(
        MERLIN_POOL_FACTORY_ADDRESS as Address,
        'merlinPoolsLength',
        []
      );

      for (let i = 0; i < nPools; i++) {
        const merlinPoolAddress = await merlinPoolFactoryContract.read(
          MERLIN_POOL_FACTORY_ADDRESS as Address,
          'getMerlinPool',
          [i]
        );

        const isPublished = await merlinPoolContract.read(
          merlinPoolAddress as Address,
          'published',
          []
        );

        if (!isPublished) {
          continue;
        }

        const [
          rewardsToken1,
          rewardsToken2,
          settings,
          totalDepositAmount,
          pendingRewards,
          nftPoolAddress,
        ] = await Promise.all([
          merlinPoolContract.read(merlinPoolAddress, 'rewardsToken1', []),
          merlinPoolContract.read(merlinPoolAddress, 'rewardsToken2', []),
          merlinPoolContract.read(merlinPoolAddress, 'settings', []),
          merlinPoolContract.read(merlinPoolAddress, 'totalDepositAmount', []),
          merlinPoolContract.read(merlinPoolAddress, 'pendingRewards', [userAddress]),
          merlinPoolContract.read(merlinPoolAddress, 'nftPool', []),
        ]);

        const [rewardsToken1Symbol, poolInfoObj] =
          await Promise.all([
            erc20Contract.erc20Read(rewardsToken1?.token, 'symbol', []),
            nftPoolContract.read(nftPoolAddress, 'getPoolInfo', []),
          ]);
        
        let rewardsToken2Symbol = '';
        if (rewardsToken2 && rewardsToken2.token && rewardsToken2.token !== ADDRESS_ZERO) {
          rewardsToken2Symbol = await erc20Contract.erc20Read(rewardsToken2?.token, 'symbol', []);
        }
        
        const rewardsToken1Logo = CHAINS_TOKENS_LIST.find((e) => {
          return e.symbol == rewardsToken1Symbol;
        })?.logoURI;

        const rewardsToken2Logo = CHAINS_TOKENS_LIST.find((e) => {
          return e.symbol == rewardsToken2Symbol;
        })?.logoURI;

        const lpToken = poolInfoObj?.lpToken;

        let [lpTokenDecimals, token1Address, token2Address] = await Promise.all(
          [
            pairContract.read(lpToken, 'decimals', []),
            pairContract.read(lpToken, 'token0', []),
            pairContract.read(lpToken, 'token1', []),
          ]
        );

        let token1Symbol = 'TOKEN1',
          token2Symbol = 'TOKEN2';
        if (token1Address) {
          [token1Symbol, token2Symbol] = await Promise.all([
            erc20Contract.erc20Read(token1Address, 'symbol', []),
            erc20Contract.erc20Read(token2Address, 'symbol', []),
          ]);
        } else if (lpTokenDecimals) {
          token1Symbol = await erc20Contract.erc20Read(lpToken, 'symbol', []);
          token2Symbol = token1Symbol;
        }

        token1Symbol = (token1Symbol == 'WFTM' || token1Symbol == 'WETH') ? 'ETH' : token1Symbol;
        token2Symbol = (token2Symbol == 'WFTM' || token2Symbol == 'WETH') ? 'ETH' : token2Symbol;

        const token1Logo = CHAINS_TOKENS_LIST.find((e) => {
          return e.symbol === token1Symbol;
        })?.logoURI;

        const token2Logo = CHAINS_TOKENS_LIST.find((e) => {
          return e.symbol === token2Symbol;
        })?.logoURI;

        listMerlinPools.push({
          token1: token1Symbol,
          token2: token2Symbol,
          token1Logo,
          token2Logo,
          token1Address,
          token2Address,
          rewardsToken1Info: rewardsToken1,
          rewardsToken2Info: rewardsToken2,
          rewardsToken1Symbol,
          rewardsToken2Symbol,
          rewardsToken1Logo,
          rewardsToken2Logo,
          settings,
          totalDeposit: totalDepositAmount,
          pendingRewards,
          lpTokenAddress: lpToken,
          lpTokenDecimals: Number(lpTokenDecimals),
          nftPoolAddress,
          poolAddress: merlinPoolAddress,
        });
      }

      return listMerlinPools;
    } catch (error) {
      console.log('fetchAllPools error:', error);
    }
    return [];
  };

  const { data, error, isLoading } = useSWR(
    [userAddress, allMerlinPoolsKey],
    fetchAllMerlinPools,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );
  console.log({listMerlinPools: data})

  return {
    data: data || [],
    isLoading,
    isError: error,
  };
};

export default useAllMerlinPoolsData;
