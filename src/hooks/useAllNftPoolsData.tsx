import { getNftPoolData } from '@/api/nft-pool';
import useSWR from 'swr';
import { Address } from 'viem';

export const allNftPoolsKey = 'all-nft-pools';

const useAllNftPoolsData = (userAddress: Address | undefined) => {
  const { data, error, isLoading } = useSWR(
    [userAddress, allNftPoolsKey],
    getNftPoolData,
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
