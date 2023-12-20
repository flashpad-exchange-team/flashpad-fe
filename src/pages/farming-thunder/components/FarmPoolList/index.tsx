import { Button } from '@/components/button/Button';
import useAllThunderPoolsData from '@/hooks/useAllThunderPoolsData';
import Menu from '@/icons/Menu';
import Search from '@/icons/Search';
import { useAccount } from 'wagmi';
import TableFarm from './TableFarm';

const FarmPoolList = () => {
  const { address: userAddress } = useAccount();

  const { data, isLoading } = useAllThunderPoolsData(userAddress);

  return (
    <div className="max-w-[1096px] w-full mx-auto mb-20 mt-28 px-2">
      <div className="flex flex-col md:flex-wrap md:flex-row md:items-center md:justify-between md:mb-4">
        <div className="order-1">
          <div className="font-bold">Thunder Pools </div>
          <div className="text-sm text-[#98A2B3] mt-2 font-semibold">
            Custom-built infrastructure for Linea native public sales
          </div>
        </div>
        <div className="flex gap-3 items-center order-3 md:order-2">
          {/* <Button className="px-2 h-[52px] w-[100%] mr-2 md:mr-0 md:w-[210px] flex justify-center">
            <AddIcon color="#0C111D" />
            Add Liquidity
          </Button> */}
        </div>
        <div className="flex mr-2 md:mr-4 mt-4 mb-2 md:mb-0 md:mr-0 items-center gap-3 order-2 md:order-3 md:w-full">
          <div className="w-full w-[300px] flex">
            <div className="w-full w-[300px] flex">
              <div className="w-[70px] bg-[#150E39] flex items-center justify-center rounded-tl-lg rounded-bl-lg">
                <Search />
              </div>
              <input
                className="w-full w-[300px] bg-[#150E39] h-[52px] text-[15px] font-semibold rounded-tr-lg rounded-br-lg focus:outline-none  placeholder-[#667085] w-full"
                placeholder="Search by name or address"
              />
            </div>
          </div>
          {/* 
          <div className="hidden md:block w-[200px]">
            <SelectFilter options={FILTER_FARM} />
          </div>
          <div className="hidden md:block w-[200px]">
            <SelectFilter options={FILTER_FARM} placeHolder={'Sort by TVL'} />
          </div> */}
          <div className="md:hidden w-[200px]">
            <Button className="h-[40px] w-[40px] flex justify-center">
              <Menu />
            </Button>
          </div>
        </div>
      </div>
      <TableFarm data={data} loading={isLoading} />
    </div>
  );
};

export default FarmPoolList;
