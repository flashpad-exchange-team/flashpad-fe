import { Button } from '@/components/button/Button';
import ListPoolsTable from '@/components/table/ListPoolsTable';
import AddIcon from '@/icons/AddIcon';
import Notification from '@/components/notification/Notification';
import { useEffect, useState } from 'react';
import * as factoryContract from '@/utils/factoryContract';
import * as pairContract from '@/utils/pairContract';
import * as erc20Contract from '@/utils/erc20TokenContract';
import * as web3Helpers from '@/utils/web3Helpers';
import { CHAINS_TOKENS_LIST } from '@/utils/constants';
import { useAccount } from 'wagmi';
import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import Search from '@/icons/Search';
import Bank from '@/icons/Bank';
import { useRouter } from 'next/router';
import useAllPairsData from '@/hooks/useAllPairsData';
import { mutate } from 'swr';

interface PoolListProps {}

const PoolList = ({}: PoolListProps) => {
  const { address: userAddress } = useAccount();
  const router = useRouter();
  const { data, isLoading } = useAllPairsData(userAddress);

  const handleClickAddLiquidity = () => {
    router.push('/liquidity');
  };

  // const getAllPairs = async () => {
  //   startLoading();

  //   const nPairs = await factoryContract.allPairsLength();

  //   const listPairs = [];
  //   const { timestamp } = await web3Helpers.getBlock();
  //   for (let i = 0; i < nPairs; i++) {
  //     const pairAddress = await factoryContract.getPairByIndex(i);
  //     const timeLock = await pairContract.read(pairAddress, 'timeLock', []);
  //     const lpTokenDecimals = await pairContract.read(
  //       pairAddress,
  //       'decimals',
  //       []
  //     );

  //     const token1Address = await pairContract.read(pairAddress, 'token0', []);

  //     const token2Address = await pairContract.read(pairAddress, 'token1', []);

  //     const token1Symbol = await erc20Contract.erc20Read(
  //       token1Address,
  //       'symbol',
  //       []
  //     );

  //     const token2Symbol = await erc20Contract.erc20Read(
  //       token2Address,
  //       'symbol',
  //       []
  //     );

  //     const token1Logo = CHAINS_TOKENS_LIST.find((e) => {
  //       return e.symbol === token1Symbol;
  //     })?.logoURI;

  //     const token2Logo = CHAINS_TOKENS_LIST.find((e) => {
  //       return e.symbol === token2Symbol;
  //     })?.logoURI;

  //     const userLpBalance = userAddress
  //       ? await pairContract.read(pairAddress, 'balanceOf', [userAddress])
  //       : 0;
  //     const totalSupply = await pairContract.read(
  //       pairAddress,
  //       'totalSupply',
  //       []
  //     );

  //     const poolShare = BigNumber(userLpBalance)
  //       .div(totalSupply)
  //       .times(100)
  //       .toFixed(2);
  //     // JavaScript expects milliseconds

  //     listPairs.push({
  //       timeLock: web3Helpers.getDateFormat(timeLock),
  //       locked: timestamp < timeLock,
  //       token1: token1Symbol,
  //       token2: token2Symbol,
  //       token1Address,
  //       token2Address,
  //       lpTokenDecimals: Number(lpTokenDecimals),
  //       token1Logo,
  //       token2Logo,
  //       myPool: poolShare,
  //       pairAddress,
  //     });
  //   }
  //   setAllPairsData(listPairs);
  //   stopLoading();
  // };

  useEffect(() => {
    // getAllPairs();
  }, []);

  return (
    <div className={clsx(['max-w-[1096px] w-full mx-auto my-20 px-2'])}>
      <div className="block lg:flex items-center justify-between">
        <div>
          <div className="font-bold">Pools List</div>{' '}
          <div className="text-sm text-[#98A2B3] mt-2 font-semibold">
            Custom-built infrastructure for Linea native public sales
          </div>
        </div>
      </div>
      <div className="block lg:flex gap-5 items-center mt-3">
        <div className="w-full w-[300px] flex">
          <div className="w-[70px] bg-dark flex items-center justify-center rounded-tl-lg rounded-bl-lg">
            <Search />
          </div>
          <input
            className="w-full w-[300px] bg-dark h-[52px] text-[15px] font-semibold rounded-tr-lg rounded-br-lg focus:outline-none  placeholder-[#667085] w-full"
            placeholder="Search "
          />
        </div>
        <Button
          className="px-2 h-[48px] lg:h-[52px] w-full lg:w-[290px] flex justify-center"
          onClick={handleClickAddLiquidity}
        >
          <AddIcon color="#0C111D" />
          Add Liquidity
        </Button>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="bg-dark rounded-md w-1/2 px-4 py-3 flex justify-between">
          <div>
            <div className="text-sm text-[#98A2B3]">Total TVL</div>
            <div className="text-sm">53M$</div>
          </div>
          <Bank />
        </div>
        <div className="bg-dark rounded-md w-1/2 px-4 py-3 flex justify-between">
          <div>
            <div className="text-sm text-[#98A2B3]">V2 Pool TVL</div>
            <div className="text-sm">53M$</div>
          </div>
          <div className="text-2xl font-bold text-primary">V2</div>
        </div>
      </div>

      <div className="mt-5">
        <Notification
          message="Newly created LPs may need some time to be updated to the list"
          type="info"
        />
      </div>
      <ListPoolsTable data={data as any} loading={isLoading} />
    </div>
  );
};

export default PoolList;
