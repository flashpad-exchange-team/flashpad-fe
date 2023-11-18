import { getAllMerlinPoolsData } from '@/api/merlin-pool';
import { TableFarmDataInterface } from '@/types/MerlinPoolDetail';
import useSWR from 'swr';
import { Address } from 'viem';

export const allMerlinPoolsKey = 'all-merlin-pools';

const useAllMerlinPoolsData = (userAddress: Address | undefined) => {
  const fetchAllMerlinPools = async () => {
    try {
      const listMerlinPools: TableFarmDataInterface[] =
        await getAllMerlinPoolsData(userAddress);

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

  return {
    data: data || [],
    isLoading,
    isError: error,
  };
};

export default useAllMerlinPoolsData;
