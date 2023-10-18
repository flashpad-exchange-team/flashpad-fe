import useSWR from 'swr';
import * as nftPoolFactoryContract from '@/utils/nftPoolFactoryContract';
import * as nftPoolContract from '@/utils/nftPoolContract';
import * as erc20Contract from '@/utils/erc20TokenContract';
import * as pairContract from '@/utils/pairContract';
import { CHAINS_TOKENS_LIST, USD_PRICE } from '@/utils/constants';
import { Address, formatUnits } from 'viem';
import BigNumber from 'bignumber.js';

export const allNftPoolsKey = 'all-nft-pools';

const useAllNftPoolsData = (userAddress: Address | undefined) => {
  const fetchAllPools = async () => {
    try {
      const listPools = [];
      const nPools = await nftPoolFactoryContract.poolsLength();
      for (let i = 0; i < nPools; i++) {
        const poolAddress = await nftPoolFactoryContract.getPoolByIndex(i);

        const poolInfoObj = await nftPoolContract.read(
          poolAddress as Address,
          'getPoolInfo',
          []
        );

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
        if (
          lpToken.toLowerCase() ===
          '0xb1f8a7c4fdaA4b79ad2052e09D8BBA5296e42090'.toLowerCase()
        ) {
          token1Symbol = await erc20Contract.erc20Read(lpToken, 'symbol', []);
          token2Symbol = token1Symbol;
        } else if (token1Address) {
          [token1Symbol, token2Symbol] = await Promise.all([
            erc20Contract.erc20Read(token1Address, 'symbol', []),
            erc20Contract.erc20Read(token2Address, 'symbol', []),
          ]);
        } else if (lpTokenDecimals) {
          token1Symbol = await erc20Contract.erc20Read(lpToken, 'symbol', []);
          token2Symbol = token1Symbol;
        }

        token1Symbol =
          token1Symbol == 'WFTM' || token1Symbol == 'WETH'
            ? 'ETH'
            : token1Symbol;
        token2Symbol =
          token2Symbol == 'WFTM' || token2Symbol == 'WETH'
            ? 'ETH'
            : token2Symbol;
        const token1 = CHAINS_TOKENS_LIST.find((e) => {
          return e.symbol === token1Symbol;
        });
        const token2 = CHAINS_TOKENS_LIST.find((e) => {
          return e.symbol === token2Symbol;
        });

        const token1Logo = token1?.logoURI;
        const token2Logo = token2?.logoURI;

        const [reserves] = await Promise.all([
          pairContract.read(lpToken, 'getReserves', []),
        ]);
        let poolTVL = '0';
        let TVL = '0';
        if (reserves) {
          const token1Reserve = formatUnits(reserves[0], token1?.decimals || 8);
          const token2Reserve = formatUnits(reserves[1], token2?.decimals || 8);

          TVL = new BigNumber(token1Reserve)
            .times(USD_PRICE)
            .plus(new BigNumber(token2Reserve).times(USD_PRICE))
            .toFixed(2); // lpSupply;
          const lpSupplyAmount = formatUnits(poolInfoObj.lpSupply, 18);
          poolTVL = new BigNumber(lpSupplyAmount)
            .times(new BigNumber(TVL))
            .toFixed(4);
          console.log(poolTVL, lpSupplyAmount);
        }

        listPools.push({
          token1: token1Symbol,
          token2: token2Symbol,
          token1Logo,
          token2Logo,
          token1Address,
          token2Address,
          lpTokenAddress: lpToken,
          lpTokenDecimals: Number(lpTokenDecimals),
          poolAddress,
          poolTVL,
          TVL,
        });
      }

      return listPools;
    } catch (error) {
      console.log('fetchAllPools error:', error);
    }
    return [];
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
