import { fetchAllPairsAPI } from '@/api';
import { CHAINS_TOKENS_LIST, USD_PRICE } from '@/utils/constants';
import * as nftPoolContract from '@/utils/nftPoolContract';
import * as pairContract from '@/utils/pairContract';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';
import { Address, formatUnits } from 'viem';

export const allNftPoolsKey = 'all-nft-pools';
const tokenDataMap: Map<string, any> = new Map();
for (const token of CHAINS_TOKENS_LIST) {
  tokenDataMap.set(token.address, {
    symbol:
      token.symbol == 'WFTM' || token.symbol == 'WETH' ? 'ETH' : token.symbol,
    logoURI: token.logoURI,
    decimals: token.decimals || 8,
  });
}

const useAllNftPoolsData = (userAddress: Address | undefined) => {
  const fetchAllPools = async () => {
    try {
      const listPools: any[] = [];
      const allPairsData: any[] = await fetchAllPairsAPI();

      for (const pairData of allPairsData) {
        const poolAddress = pairData?.nft_pool?.address;
        const poolInfoObj = await nftPoolContract.read(
          poolAddress as Address,
          'getPoolInfo',
          []
        );
        const lpToken = pairData?.address;
        const token1Data = tokenDataMap.get(pairData.token1_address);
        const token2Data = tokenDataMap.get(pairData.token2_address);
        // const [lpTokenDecimals] = await Promise.all([
        //   pairContract.read(lpToken, 'decimals', []),
        // ]);

        const token1Address = pairData.token1_address;
        const token2Address = pairData.token2_address;

        const token1Logo = token1Data?.logoURI;
        const token2Logo = token2Data?.logoURI;
        const [reserves] = await Promise.all([
          pairContract.read(lpToken, 'getReserves', []),
        ]);
        let poolTVL = '0';
        let TVL = '0';
        let lpSupplyAmount = '0';

        if (reserves) {
          const token1Reserve = formatUnits(
            reserves[0],
            token1Data?.decimals || 8
          );
          const token2Reserve = formatUnits(
            reserves[1],
            token2Data?.decimals || 8
          );

          TVL = new BigNumber(token1Reserve)
            .times(USD_PRICE)
            .plus(new BigNumber(token2Reserve).times(USD_PRICE))
            .toFixed(2);
          lpSupplyAmount = formatUnits(poolInfoObj?.lpSupply || 0, 18);
          poolTVL = new BigNumber(lpSupplyAmount)
            .times(new BigNumber(TVL))
            .toFixed(4);
        }

        const vol24h = pairData?.vol24h || 0;

        const feeShare = new BigNumber(vol24h).times(0.3).div(100);
        const feeAPR = feeShare.times(365).div(new BigNumber(TVL)).times(100);

        listPools.push({
          token1: token1Data?.symbol,
          token2: token2Data?.symbol,
          token1Logo,
          token2Logo,
          token1Address,
          token2Address,
          lpTokenAddress: lpToken,
          // lpTokenDecimals: Number(lpTokenDecimals),
          lpTokenDecimals: 18,
          poolAddress,
          poolTVL,
          TVL,
          feeShare,
          feeAPR,
          lpSupplyAmount,
        });
      }

      return listPools
        .filter((item) => item.lpSupplyAmount !== '0')
        .sort((a, b) => b.lpSupplyAmount - a.lpSupplyAmount);
    } catch (error) {
      console.log('fetchAllPools error:', error);
      return [];
    }
  };

  const { data, error, isLoading } = useSWR(
    [userAddress, allNftPoolsKey],
    fetchAllPools,
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

export default useAllNftPoolsData;
