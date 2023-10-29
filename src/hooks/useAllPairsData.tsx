import { fetchAllPairsAPI } from '@/api';
import * as arthurMasterContract from '@/utils/arthurMasterContract';
import {
  ARTHUR_MASTER_ADDRESS,
  CHAINS_TOKENS_LIST,
  USD_PRICE,
} from '@/utils/constants';
import * as nftPoolFactoryContract from '@/utils/nftPoolFactoryContract';
import * as pairContract from '@/utils/pairContract';
import * as web3Helpers from '@/utils/web3Helpers';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';
import { Address, formatUnits } from 'viem';

export const allPairsKey = 'all-lp-pairs';
export const allPairsKeyForAll = 'all-lp-pairs-all';

const useAllPairsData = (userAddress: Address | undefined) => {
  const fetchAllPairs = async () => {
    try {
      const listPairs = [];
      const { timestamp } = await web3Helpers.getBlock();
      const allPairsData = await fetchAllPairsAPI();

      for (const pairData of allPairsData) {
        const pairAddress = pairData.address;
        const token1Address = pairData.token1_address;
        const token2Address = pairData.token2_address;
        const [
          lockedUntil,
          lpTokenDecimals,
          userLpBalance,
          totalSupply,
          reserves,
        ] = await Promise.all([
          pairContract.read(pairAddress, 'getTimeCanRemoveLiquidity', []),
          pairContract.read(pairAddress, 'decimals', []),
          userAddress
            ? await pairContract.read(pairAddress, 'balanceOf', [userAddress])
            : 0,
          pairContract.read(pairAddress, 'totalSupply', []),
          pairContract.read(pairAddress, 'getReserves', []),
        ]);

        // if (token1Address) {
        //   [token1Symbol, token2Symbol] = await Promise.all([
        //     erc20Contract.erc20Read(token1Address, 'symbol', []),
        //     erc20Contract.erc20Read(token2Address, 'symbol', []),
        //   ]);
        // } else {
        //   token1Symbol = await erc20Contract.erc20Read(
        //     pairAddress,
        //     'symbol',
        //     []
        //   );
        //   token2Symbol = token1Symbol;
        // }
        let token1Symbol: any = 'TOKEN1',
          token2Symbol: any = 'TOKEN2';
        const token1 = CHAINS_TOKENS_LIST.find((e) => {
          return e.address === token1Address;
        });
        const token2 = CHAINS_TOKENS_LIST.find((e) => {
          return e.address === token2Address;
        });
        token1Symbol =
          token1?.symbol == 'WFTM' || token1?.symbol == 'WETH'
            ? 'ETH'
            : token1?.symbol;
        token2Symbol =
          token2?.symbol == 'WFTM' || token2?.symbol == 'WETH'
            ? 'ETH'
            : token2?.symbol;

        const token1Logo = token1?.logoURI;
        const token2Logo = token2?.logoURI;

        const token1Reserve = formatUnits(reserves[0], token1?.decimals || 8);
        const token2Reserve = formatUnits(reserves[1], token2?.decimals || 8);

        const TVL = new BigNumber(token1Reserve)
          .times(USD_PRICE)
          .plus(new BigNumber(token2Reserve).times(USD_PRICE))
          .toFixed(2);

        const poolShare = BigNumber(userLpBalance)
          .div(totalSupply)
          .times(100)
          .toFixed(2);
        listPairs.push({
          timeLock: web3Helpers.getDateFormat(lockedUntil),
          locked: timestamp < lockedUntil,
          token1: token1Symbol,
          token2: token2Symbol,
          token1Address,
          token2Address,
          lpTokenDecimals: Number(lpTokenDecimals),
          token1Logo,
          token2Logo,
          myPoolShare: poolShare,
          pairAddress,
          TVL,
          userLpBalance:
            userLpBalance == 0
              ? '0.00'
              : BigNumber(userLpBalance)
                  .div(new BigNumber(10).pow(18))
                  .toFixed(),
        });
      }
      return listPairs;
    } catch (error) {
      console.log('fetchAllPairs error:', error);
    }
    return [];
  };

  const { data, error, isLoading } = useSWR(
    [userAddress, allPairsKey],
    fetchAllPairs,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};
export const useAllPairsDataForAllPool = (userAddress: Address | undefined) => {
  const fetchAllPairs = async (): Promise<Array<any>> => {
    try {
      const listPairs: Array<any> = [];
      const allPairsData: Array<any> = await fetchAllPairsAPI();

      const userLpBalancesPromises: Promise<any>[] = userAddress
        ? allPairsData.map((pairData) =>
            pairContract.read(pairData.address, 'balanceOf', [userAddress])
          )
        : Array(allPairsData.length).fill(0);

      const [userLpBalances, totalSupplies, reserves] = await Promise.all([
        Promise.all(userLpBalancesPromises),
        Promise.all(
          allPairsData.map((pairData) =>
            pairContract.read(pairData.address, 'totalSupply', [])
          )
        ),
        Promise.all(
          allPairsData.map((pairData) =>
            pairContract.read(pairData.address, 'getReserves', [])
          )
        ) as any,
      ]);

      const tokenDataMap: Map<string, any> = new Map();
      for (const token of CHAINS_TOKENS_LIST) {
        tokenDataMap.set(token.address, {
          symbol:
            token.symbol == 'WFTM' || token.symbol == 'WETH'
              ? 'ETH'
              : token.symbol,
          logoURI: token.logoURI,
          decimals: token.decimals || 8,
        });
      }

      for (let i = 0; i < allPairsData.length; i++) {
        const pairData: any = allPairsData[i];
        const pairAddress: string = pairData.address;
        const token1Data: any = tokenDataMap.get(pairData.token1_address);
        const token2Data: any = tokenDataMap.get(pairData.token2_address);

        const userBalance: any = userLpBalances[i];
        const totalSupply: any = totalSupplies[i];
        const [reserve1, reserve2]: any = (reserves as any)[i];

        const token1Reserve: any = formatUnits(reserve1, token1Data.decimals);
        const token2Reserve: any = formatUnits(reserve2, token2Data.decimals);
        const TVL: any = new BigNumber(token1Reserve)
          .times(USD_PRICE)
          .plus(new BigNumber(token2Reserve).times(USD_PRICE))
          .toFixed(2);

        const poolAddress: any = await nftPoolFactoryContract.getPool(
          pairAddress
        );
        const feeShare: any = new BigNumber(pairData.tvl24h)
          .times(0.3)
          .div(100);
        const feeAPR: any = feeShare.times(365).div(TVL).times(100);

        const masterPoolInfo: any = await arthurMasterContract.read(
          ARTHUR_MASTER_ADDRESS as any,
          'getPoolInfo',
          [poolAddress]
        );
        const dailyART: any = new BigNumber(masterPoolInfo.poolEmissionRate)
          .times(86400)
          .div('1000000000000000000');
        const farmBaseAPR: any = dailyART.times(365).div(TVL).times(100);

        const poolShare: any = new BigNumber(userBalance)
          .div(totalSupply)
          .times(100)
          .toFixed(2);

        listPairs.push({
          token1: token1Data.symbol,
          token2: token2Data.symbol,
          token1Address: pairData.token1_address,
          token2Address: pairData.token2_address,
          token1Logo: token1Data.logoURI,
          token2Logo: token2Data.logoURI,
          myPoolShare: poolShare,
          pairAddress,
          TVL,
          feeAPR,
          farmBaseAPR,
          userLpBalance: new BigNumber(userBalance)
            .div(new BigNumber(10).pow(18))
            .toFixed(),
        });
      }
      return listPairs;
    } catch (error) {
      console.log('fetchAllPairs error:', error);
      return [];
    }
  };

  const { data, error, isLoading } = useSWR(
    [userAddress, allPairsKeyForAll],
    fetchAllPairs,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};

export default useAllPairsData;
