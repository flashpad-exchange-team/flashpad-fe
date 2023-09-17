// useBlockchainData.js
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import * as web3Helpers from '@/utils/web3Helpers';
import * as factoryContract from '@/utils/factoryContract';
import * as pairContract from '@/utils/pairContract';
import * as erc20Contract from '@/utils/erc20TokenContract';
import { CHAINS_TOKENS_LIST } from '@/utils/constants';

const useBlockchainData = (userAddress: `0x${string}` | undefined) => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllPairs = async (userAddress: `0x${string}` | undefined) => {
    console.log('FETCH', userAddress);
    setIsLoading(true);

    const nPairs = await factoryContract.allPairsLength();

    const listPairs = [];
    const { timestamp } = await web3Helpers.getBlock();
    for (let i = 0; i < nPairs; i++) {
      const pairAddress = await factoryContract.getPairByIndex(i);
      const timeLock = await pairContract.read(pairAddress, 'timeLock', []);
      const lpTokenDecimals = await pairContract.read(
        pairAddress,
        'decimals',
        []
      );

      const token1Address = await pairContract.read(pairAddress, 'token0', []);

      const token2Address = await pairContract.read(pairAddress, 'token1', []);

      const token1Symbol = await erc20Contract.erc20Read(
        token1Address,
        'symbol',
        []
      );

      const token2Symbol = await erc20Contract.erc20Read(
        token2Address,
        'symbol',
        []
      );

      const token1Logo = CHAINS_TOKENS_LIST.find((e) => {
        return e.symbol === token1Symbol;
      })?.logoURI;

      const token2Logo = CHAINS_TOKENS_LIST.find((e) => {
        return e.symbol === token2Symbol;
      })?.logoURI;

      const userLpBalance = userAddress
        ? await pairContract.read(pairAddress, 'balanceOf', [userAddress])
        : 0;
      const totalSupply = await pairContract.read(
        pairAddress,
        'totalSupply',
        []
      );

      const poolShare = BigNumber(userLpBalance)
        .div(totalSupply)
        .times(100)
        .toFixed(2);
      // JavaScript expects milliseconds

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
    setIsLoading(false);

    return listPairs;
  };
  const { data, error } = useSWR(userAddress, fetchAllPairs, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (data || error) {
      setIsLoading(false);
    }
  }, [data, error]);

  const reloadData = async () => {
    // You can perform any action or trigger any event here.
    // For example, you can call this function when a button is clicked.
    // You can also use revalidate to force a re-fetch of the data.
    // revalidate();
  };

  return {
    data,
    isLoading,
    isError: error,
    reloadData,
  };
};

export default useBlockchainData;
