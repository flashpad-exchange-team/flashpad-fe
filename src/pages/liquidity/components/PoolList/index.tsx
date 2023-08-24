import { Button } from '@/components/button/Button';
import Table from '@/components/table/Table';
import AddIcon from '@/icons/AddIcon';
const data = [
  {
    locked: false,
    token1: 'BNB',
    token2: 'UNI',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    apr: '0,7748',
    totalStaked: '482.58K',
    myPool: '0',
    myStake: '0',
    earnings: '0',
  },
  {
    locked: true,
    token1: 'BNB',
    token2: 'UNI',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    apr: '0,7748',
    totalStaked: '482.58K',
    myPool: '0',
    myStake: '0',
    earnings: '0',
  },
  {
    locked: true,
    token1: 'BNB',
    token2: 'UNI',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    apr: '0,7748',
    totalStaked: '482.58K',
    myPool: '0',
    myStake: '0',
    earnings: '0',
  },
  {
    locked: true,
    token1: 'BNB',
    token2: 'UNI',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    apr: '0,7748',
    totalStaked: '482.58K',
    myPool: '0',
    myStake: '0',
    earnings: '0',
  },
  {
    locked: true,
    token1: 'BNB',
    token2: 'UNI',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    apr: '0,7748',
    totalStaked: '482.58K',
    myPool: '0',
    myStake: '0',
    earnings: '0',
  },
];
interface PoolListProps {
  setIsAddLiquidity: (val: boolean) => void;
}
const PoolList = ({ setIsAddLiquidity }: PoolListProps) => {
  return (
    <div className="max-w-[1096px] w-full mx-auto my-20 px-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-bold">Pools List</div>{' '}
          <div className="text-[14px] text-[#98A2B3] mt-2 font-semibold">
            Custom-built infrastructure for Linea native public sales
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <input
            className="w-full w-[300px] bg-[#150E39] h-[52px] pl-6 text-[15px] font-semibold  rounded-lg focus:outline-none  placeholder-[#667085]"
            placeholder="Search by name or address "
          />
          <Button
            className="px-6 h-[52px] w-[260px] "
            onClick={() => setIsAddLiquidity(true)}
          >
            <AddIcon color="#0C111D" />
            Add Liquidity
          </Button>
        </div>
      </div>

      <Table data={data} />
    </div>
  );
};

export default PoolList;
