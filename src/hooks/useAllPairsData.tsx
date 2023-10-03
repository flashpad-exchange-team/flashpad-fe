import useSWR from 'swr';
import BigNumber from 'bignumber.js';
import * as web3Helpers from '@/utils/web3Helpers';
import * as factoryContract from '@/utils/factoryContract';
import * as pairContract from '@/utils/pairContract';
import * as erc20Contract from '@/utils/erc20TokenContract';
import { CHAINS_TOKENS_LIST } from '@/utils/constants';
import { Address } from 'viem';

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
        ] = await Promise.all([
          pairContract.read(pairAddress, 'timeLock', []),
          pairContract.read(pairAddress, 'decimals', []),
          userAddress
            ? await pairContract.read(pairAddress, 'balanceOf', [userAddress])
            : 0,
          pairContract.read(pairAddress, 'totalSupply', []),
          pairContract.read(pairAddress, 'token0', []),
          pairContract.read(pairAddress, 'token1', []),
        ]);

        let token1Symbol = 'TOKEN1', token2Symbol = 'TOKEN2';
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

        token1Symbol = (token1Symbol == 'WFTM' || token1Symbol == 'WETH') ? 'ETH' : token1Symbol;
        token2Symbol = (token2Symbol == 'WFTM' || token2Symbol == 'WETH') ? 'ETH' : token2Symbol;

        const token1Logo = CHAINS_TOKENS_LIST.find((e) => {
          return e.symbol === token1Symbol;
        })?.logoURI;

        const token2Logo = CHAINS_TOKENS_LIST.find((e) => {
          return e.symbol === token2Symbol;
        })?.logoURI;

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
