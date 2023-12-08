import { Button } from '@/components/button/Button';
import Notification from '@/components/notification/Notification';
import ListLPv2PoolsTable from '@/components/table/ListLPv2PoolsTable';
import useAllPairsData from '@/hooks/useAllPairsData';
import AddIcon from '@/icons/AddIcon';
import Search from '@/icons/Search';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAccount } from 'wagmi';

interface PoolListProps {}

const PoolList = ({}: PoolListProps) => {
  const { address: userAddress } = useAccount();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const { data: allPairsData, isLoading: isLoadingAllPairs } =
    useAllPairsData(userAddress);

  return (
    <div
      className={clsx(['max-w-[1096px] w-full mx-auto  mb-20 mt-28  px-2 '])}
    >
      <div className="block lg:flex items-center justify-between">
        <div>
          <div className="font-bold">LP V2 Positions</div>
          <div className="text-sm text-[#98A2B3] mt-2 font-semibold">
            Create and manage all your LP V2 positions.
          </div>
        </div>
      </div>
      <div className="flex ml-1 my-4 ">
        <Button
          className={`w-[100px] ${'!bg-[#000] text-[#fff]'} x!rounded-[4px] !text-[16px] flex justify-center items-center`}
          onClick={() => router.push('/spnft-positions')}
        >
          spNFT
        </Button>
        <Button
          className={`w-[100px]  !rounded-[4px] !text-[16px] flex justify-center items-center`}
        >
          LP V2
        </Button>
        <Button
          className={`w-[100px] ${'!bg-[#000] text-[#fff]'} x!rounded-[4px] !text-[16px] flex justify-center items-center`}
          onClick={() => router.push('/lpv3-positions')}
        >
          LP V3
        </Button>
      </div>
      {/* <div className="flex items-center gap-4 mt-4">
        <div className="bg-dark rounded-md w-1/2 px-4 py-3 flex justify-between">
          <div>
            <div className="text-sm text-[#98A2B3]">TVL</div>
            <div className="text-sm">$53M</div>
          </div>
          <Bank />
        </div>
        <div className="bg-dark rounded-md w-1/2 px-4 py-3 flex justify-between">
          <div>
            <div className="text-sm text-[#98A2B3]">V2 Pool TVL</div>
            <div className="text-sm">$53M</div>
          </div>
          <div className="text-2xl font-bold text-primary">V2</div>
        </div>
      </div> */}
      <div className="mt-5">
        <Notification
          message="Newly created pools may need some time to be updated to the list"
          type="info"
        />
      </div>
      <div className="block lg:flex gap-5 items-center mt-3">
        <div className="w-full w-[300px] flex">
          <div className="w-[70px] bg-dark flex items-center justify-center rounded-tl-lg rounded-bl-lg">
            <Search />
          </div>
          <input
            className="w-full w-[300px] bg-dark h-[52px] text-[15px] font-semibold rounded-tr-lg rounded-br-lg focus:outline-none  placeholder-[#667085] w-full"
            placeholder="Search "
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
        <Button
          className="px-2 h-[48px] lg:h-[52px] w-full lg:w-[290px] flex justify-center"
          onClick={() => {
            router.push('/liquidity');
          }}
        >
          <AddIcon color="#0C111D" />
          Add Liquidity
        </Button>
      </div>

      <ListLPv2PoolsTable
        data={
          searchValue
            ? allPairsData?.filter(
                (item: any) =>
                  item.token1Address
                    ?.toLowerCase()
                    ?.includes(searchValue?.toLowerCase()) ||
                  item.token2Address
                    ?.toLowerCase()
                    ?.includes(searchValue?.toLowerCase()) ||
                  item.pairAddress
                    ?.toLowerCase()
                    ?.includes(searchValue?.toLowerCase()) ||
                  item.token1
                    ?.toLowerCase()
                    ?.includes(searchValue?.toLowerCase()) ||
                  item.token2
                    ?.toLowerCase()
                    ?.includes(searchValue?.toLowerCase())
              )
            : (allPairsData as any)
        }
        loading={isLoadingAllPairs}
      />
    </div>
  );
};

export default PoolList;
