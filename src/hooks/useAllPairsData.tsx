import useSWR from 'swr';
import BigNumber from 'bignumber.js';
import * as web3Helpers from '@/utils/web3Helpers';
import * as factoryContract from '@/utils/factoryContract';
import * as pairContract from '@/utils/pairContract';
import * as erc20Contract from '@/utils/erc20TokenContract';
import { CHAINS_TOKENS_LIST, USD_PRICE } from '@/utils/constants';
import { Address, formatUnits } from 'viem';

export const allPairsKey = 'all-lp-pairs';

const useAllPairsData = (userAddress: Address | undefined) => {
  const fetchAllPairs = async () => {
    try {
      const listPairs = [];
      const nPairs = await factoryContract.allPairsLength();
      const { timestamp } = await web3Helpers.getBlock();

      for (let i = 0; i < nPairs; i++) {
        const pairAddress = await factoryContract.getPairByIndex(i);

        const [
          timeLock,
          lpTokenDecimals,
          userLpBalance,
          totalSupply,
          token1Address,
          token2Address,
          reserves,
        ] = await Promise.all([
          pairContract.read(pairAddress, 'timeLock', []),
          pairContract.read(pairAddress, 'decimals', []),
          userAddress
            ? await pairContract.read(pairAddress, 'balanceOf', [userAddress])
            : 0,
          pairContract.read(pairAddress, 'totalSupply', []),
          pairContract.read(pairAddress, 'token0', []),
          pairContract.read(pairAddress, 'token1', []),
          pairContract.read(pairAddress, 'getReserves', []),
        ]);

        let token1Symbol = 'TOKEN1',
          token2Symbol = 'TOKEN2';
        if (token1Address) {
          [token1Symbol, token2Symbol] = await Promise.all([
            erc20Contract.erc20Read(token1Address, 'symbol', []),
            erc20Contract.erc20Read(token2Address, 'symbol', []),
          ]);
        } else {
          token1Symbol = await erc20Contract.erc20Read(
            pairAddress,
            'symbol',
            []
          );
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
          timeLock: web3Helpers.getDateFormat(timeLock),
          locked: timestamp < timeLock,
          token1: token1Symbol,
          token2: token2Symbol,
          token1Address,
          token2Address,
          lpTokenDecimals: Number(lpTokenDecimals),
          token1Logo,
          token2Logo,
          myPool: poolShare,
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

export default useAllPairsData;
