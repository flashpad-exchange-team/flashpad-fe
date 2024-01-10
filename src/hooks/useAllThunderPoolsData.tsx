import { getAllThunderPoolsData } from '@/api/thunder-pool';
import { TableFarmDataInterface } from '@/types/ThunderPoolDetail';
import useSWR from 'swr';
import { Address } from 'viem';

export const allThunderPoolsKey = 'all-thunder-pools';

const useAllThunderPoolsData = (userAddress: Address | undefined) => {
  const fetchAllThunderPools = async () => {
    try {
      const listThunderPools: TableFarmDataInterface[] =
        await getAllThunderPoolsData(userAddress);

      return listThunderPools;
    } catch (error) {
      console.log('fetchAllPools error:', error);
    }
    return [];
  };

  const { data, error, isLoading } = useSWR(
    [userAddress, allThunderPoolsKey],
    fetchAllThunderPools,
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

export default useAllThunderPoolsData;
