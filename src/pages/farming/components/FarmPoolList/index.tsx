import { Button } from '@/components/button/Button';
import Select from '@/components/select';
import AddIcon from '@/icons/AddIcon';
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
    <div className="max-w-[1096px] w-full mx-auto my-20 px-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-bold">Genesis Pools </div>{' '}
          <div className="text-[14px] text-[#98A2B3] mt-2 font-semibold">
            Custom-built infrastructure for Linea native public sales
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Button className="px-2 h-[52px] w-[210px] flex justify-center">
            <AddIcon color="#0C111D" />
            Add Liquidity
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input
          className="w-full w-[300px] bg-[#150E39] h-[52px] pl-6 text-[15px] font-semibold  rounded-lg focus:outline-none  placeholder-[#667085]"
          placeholder="Search by name or address "
        />
        <Select options={FILTER_FARM} />
        <Select options={FILTER_FARM} />
      </div>
      <TableFarm data={data} />
    </div>
  );
};

export default FarmPoolList;
