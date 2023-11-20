import {
  getAllPairsDataForAllPool,
  getAllPairsDataForPosition,
} from '@/api/lp-pairs';
import useSWR from 'swr';
import { Address } from 'viem';

export const allPairsKey = 'all-lp-pairs';
export const allPairsKeyForAll = 'all-lp-pairs-all';

const useAllPairsData = (userAddress: Address | undefined) => {
  const fetchAllPairs = async () => {
    try {
      const allPairsData = await getAllPairsDataForPosition(userAddress);
      return allPairsData;
    } catch (error) {
      console.log('fetchAllPairs error:', error);
      return [];
    }
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
      const listPairs: Array<any> = await getAllPairsDataForAllPool(
        userAddress
      );
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
