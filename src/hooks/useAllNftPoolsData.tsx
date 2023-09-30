import useSWR from 'swr';
import { useEffect, useState } from 'react';
import * as nftPoolFactoryContract from '@/utils/nftPoolFactoryContract';
import * as nftPoolContract from '@/utils/nftPoolContract';
import * as erc20Contract from '@/utils/erc20TokenContract';
import * as pairContract from '@/utils/pairContract';
import { CHAINS_TOKENS_LIST } from '@/utils/constants';
import { Address } from 'viem';

export const allNftPoolsKey = 'all-nft-pools'; 

const useAllNftPoolsData = (userAddress: Address | undefined) => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllPools = async () => {
    setIsLoading(true);

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
  
        let [
          lpTokenDecimals,
          token1Address,
          token2Address,
        ] = await Promise.all([
          pairContract.read(lpToken, 'decimals', []),
          pairContract.read(lpToken, 'token0', []),
          pairContract.read(lpToken, 'token1', []),
        ]);
  
        let token1Symbol = 'TOKEN1', token2Symbol = 'TOKEN2';
        if (lpToken.toLowerCase() === '0xb1f8a7c4fdaA4b79ad2052e09D8BBA5296e42090'.toLowerCase()) {
          token1Symbol = await erc20Contract.erc20Read(
            lpToken,
            'symbol',
            []
          );
          token2Symbol = token1Symbol;
        } else if (token1Address) { 
          [token1Symbol, token2Symbol] = await Promise.all([
            erc20Contract.erc20Read(
              token1Address,
              'symbol',
              []
            ),
            erc20Contract.erc20Read(
              token2Address,
              'symbol',
              []
            ),
          ]);
        } else if (lpTokenDecimals) {
          token1Symbol = await erc20Contract.erc20Read(
            lpToken,
            'symbol',
            []
          );
          token2Symbol = token1Symbol;
        }
  
        token1Symbol = (token1Symbol == 'WETH') ? 'ETH' : token1Symbol;
        token2Symbol = (token2Symbol == 'WETH') ? 'ETH' : token2Symbol;
  
        const token1Logo = CHAINS_TOKENS_LIST.find((e) => {
          return e.symbol === token1Symbol;
        })?.logoURI;
  
        const token2Logo = CHAINS_TOKENS_LIST.find((e) => {
          return e.symbol === token2Symbol;
        })?.logoURI;
  
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
        });
      }
      setIsLoading(false);
      
      return listPools;
    } catch (error) {
      setIsLoading(false);
      console.log('fetchAllPools error:', error);
    }
    return [];
  };

  const { data, error } = useSWR([userAddress, allNftPoolsKey], fetchAllPools, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
  });

  useEffect(() => {
    if (data || error) {
      setIsLoading(false);
    }
  }, [data, error]);

  return {
    data,
    isLoading,
    isError: error,
  };
};

export default useAllNftPoolsData;
