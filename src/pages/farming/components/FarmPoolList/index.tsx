import { Button } from '@/components/button/Button';
import Select from '@/components/select';
import AddIcon from '@/icons/AddIcon';
import Menu from '@/icons/Menu';
import Search from '@/icons/Search';
import TableFarm from './TableFarm';
const data = [
  {
    tvl: '482.85',
    incentivesToken: 'Token',
    incentivesLogo:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token1: 'BNB',
    token2: 'FUSDC',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    apr: '0,7748',
    totalDeposit: '0',
    pendingRewards: '0',
  },
  {
    tvl: '482.85',
    incentivesToken: 'Token',
    incentivesLogo:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token1: 'BNB',
    token2: 'FDOGE',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    apr: '0,7748',
    totalDeposit: '0',
    pendingRewards: '0',
  },
  {
    tvl: '482.85',
    incentivesToken: 'Token',
    incentivesLogo: null,
    token1: 'WETH',
    token2: 'UNI',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    apr: '0,7748',
    totalDeposit: '0',
    pendingRewards: '0',
  },
  {
    tvl: '482.85',
    incentivesToken: 'Token',
    incentivesLogo:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token1: 'NEO',
    token2: 'UNI',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    apr: '0,7748',
    totalDeposit: '0',
    pendingRewards: '0',
  },
  {
    tvl: '482.85',
    incentivesToken: 'Token',
    incentivesLogo: null,
    token1: 'BNB',
    token2: 'UNI',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    apr: '0,7748',
    totalDeposit: '0',
    pendingRewards: '0',
  },
];

const FILTER_FARM = [
  {
    value: 'Incentives Only',
    label: 'Incentives Only',
  },
  {
    value: 'Staked Only',
    label: 'Staked Only',
  },
];
const FarmPoolList = () => {
  return (
    <div className="max-w-[1096px] w-full mx-auto my-20 px-4 md:px-2">
      <div className="flex flex-col md:flex-wrap md:flex-row md:items-center md:justify-between md:mb-4">
        <div className="order-1">
          <div className="font-bold">Genesis Pools</div>
          <div className="text-sm text-[#98A2B3] mt-2 font-semibold">
            Custom-built infrastructure for Linea native public sales
          </div>
        </div>
        <div className="flex gap-3 items-center order-3 md:order-2">
          <Button className="px-2 h-[52px] w-[100%] mr-2 md:mr-0 md:w-[210px] flex justify-center">
            <AddIcon color="#0C111D" />
            Add Liquidity
          </Button>
        </div>
        <div className="flex mr-2 md:mr-4 mt-4 mb-2 md:mb-0 md:mr-0 items-center gap-3 order-2 md:order-3 md:w-full">
          <div className="w-full w-[300px] flex">
            <div className="w-[70px] bg-[#150E39] flex items-center justify-center rounded-tl-lg rounded-bl-lg">
              <Search />
            </div>
            <input
              className="w-full w-[300px] bg-[#150E39] h-[52px] text-[15px] font-semibold rounded-tr-lg rounded-br-lg focus:outline-none  placeholder-[#667085] w-full"
              placeholder="Search by name or address"
            />
          </div>
          <div className="hidden md:block">
            <Select options={FILTER_FARM} />
          </div>
          <div className="hidden md:block">
            <Select options={FILTER_FARM} />
          </div>
          <div className="md:hidden">
            <Button className="h-[40px] w-[40px] flex justify-center">
              <Menu />
            </Button>
          </div>
        </div>
      </div>
      <TableFarm data={data} />
    </div>
  );
};

export default FarmPoolList;
