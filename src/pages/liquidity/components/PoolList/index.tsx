import { Button } from '@/components/button/Button';
import ListPoolsTable from '@/components/table/Table';
import AddIcon from '@/icons/AddIcon';
import { useEffect, useState } from 'react';
import * as factoryContract from '@/utils/factoryContract';
import * as pairContract from '@/utils/pairContract';
import * as erc20Contract from '@/utils/erc20TokenContract';
import * as web3Helpers from '@/utils/web3Helpers';
import { CHAINS_TOKENS_LIST } from '@/utils/constants';
import { useAccount } from 'wagmi';
import BigNumber from 'bignumber.js';
import { useLoading } from '@/context/LoadingContext';
import clsx from 'clsx';

// const data = [
//   {
//     locked: false,
//     token1: 'BNB',
//     token2: 'UNI',
//     token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
//     token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
//     apr: '0,7748',
//     totalStaked: '482.58K',
//     myPool: '0',
//     myStake: '0',
//     earnings: '0',
//   },
//   {
//     locked: true,
//     token1: 'BNB',
//     token2: 'UNI',
//     token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
//     token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
//     apr: '0,7748',
//     totalStaked: '482.58K',
//     myPool: '0',
//     myStake: '0',
//     earnings: '0',
//   },
//   {
//     locked: true,
//     token1: 'BNB',
//     token2: 'UNI',
//     token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
//     token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
//     apr: '0,7748',
//     totalStaked: '482.58K',
//     myPool: '0',
//     myStake: '0',
//     earnings: '0',
//   },
//   {
//     locked: true,
//     token1: 'BNB',
//     token2: 'UNI',
//     token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
//     token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
//     apr: '0,7748',
//     totalStaked: '482.58K',
//     myPool: '0',
//     myStake: '0',
//     earnings: '0',
//   },
//   {
//     locked: true,
//     token1: 'BNB',
//     token2: 'UNI',
//     token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
//     token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
//     apr: '0,7748',
//     totalStaked: '482.58K',
//     myPool: '0',
//     myStake: '0',
//     earnings: '0',
//   },
// ];

interface PoolListProps {
  setIsAddLiquidity: (val: boolean) => void;
  isAddLiquidity: boolean;
}

const PoolList = ({ setIsAddLiquidity, isAddLiquidity }: PoolListProps) => {
  const { address: userAddress } = useAccount();
  const { stopLoading } = useLoading();

  const [allPairsData, setAllPairsData] = useState<any>([]);

  const getAllPairs = async () => {
    // startLoading('Fetching contract data ...');
    const nPairs = await factoryContract.allPairsLength();

    const listPairs = [];
    const { timestamp } = await web3Helpers.getBlock();
    for (let i = 0; i < nPairs; i++) {
      const pairAddress = await factoryContract.getPairByIndex(i);
      const timeLock = await pairContract.read(pairAddress, 'timeLock', []);
      const lpTokenDecimals = await pairContract.read(
        pairAddress,
        'decimals',
        []
      );

      const token1Address = await pairContract.read(pairAddress, 'token0', []);

      const token2Address = await pairContract.read(pairAddress, 'token1', []);

      const token1Symbol = await erc20Contract.erc20Read(
        token1Address,
        'symbol',
        []
      );

      const token2Symbol = await erc20Contract.erc20Read(
        token2Address,
        'symbol',
        []
      );

      const token1Logo = CHAINS_TOKENS_LIST.find((e) => {
        return e.symbol === token1Symbol;
      })?.logoURI;

      const token2Logo = CHAINS_TOKENS_LIST.find((e) => {
        return e.symbol === token2Symbol;
      })?.logoURI;

      const userLpBalance = userAddress
        ? await pairContract.read(pairAddress, 'balanceOf', [userAddress])
        : 0;
      const totalSupply = await pairContract.read(
        pairAddress,
        'totalSupply',
        []
      );

      const poolShare = BigNumber(userLpBalance)
        .div(totalSupply)
        .times(100)
        .toFixed(2);
      // JavaScript expects milliseconds

      listPairs.push({
        timeLock: web3Helpers.getDateFormat(timeLock),
        locked: timestamp < timeLock,
        token1: token1Symbol,
        token2: token2Symbol,
        token1Address,
        token2Address,
        lpTokenDecimals: Number(lpTokenDecimals),
        token1Logo,
        token2Logo,
        myPool: poolShare,
        pairAddress,
      });
    }
    setAllPairsData(listPairs);
    stopLoading();
  };

  useEffect(() => {
    getAllPairs();
  }, []);

  return (
    <div
      className={clsx([
        'max-w-[1096px] w-full mx-auto my-20 px-2',
        isAddLiquidity ? ' hidden' : '',
      ])}
    >
      <div className="block lg:flex items-center justify-between">
        <div>
          <div className="font-bold">Pools List</div>{' '}
          <div className="text-[14px] text-[#98A2B3] mt-2 font-semibold">
            Custom-built infrastructure for Linea native public sales
          </div>
        </div>
        <div className="block lg:flex gap-3 items-center">
          <input
            className=" mt-3 lg:mt-0 mb-3 lg:mb-0 w-full w-[300px] bg-[#150E39] h-[52px] pl-6 text-[15px] font-semibold  rounded-lg focus:outline-none  placeholder-[#667085]"
            placeholder="Search by name or address "
          />
          <Button
            className="px-2 h-[48px] lg:h-[52px] w-full lg:w-[290px] flex justify-center"
            onClick={() => setIsAddLiquidity(true)}
          >
            <AddIcon color="#0C111D" />
            Add Liquidity
          </Button>
        </div>
      </div>

      <ListPoolsTable data={allPairsData} />
    </div>
  );
};

export default PoolList;
