import BNBICon from '@/icons/BNBIcon';
import LockIcon from '@/icons/LockIcon';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Button } from '../button/Button';
import InlineLoading from '../loading/InlineLoading';
import RemoveLiquidityModal from '../modal/RemoveLiquidityModal';
import { convertToInternationalCurrencySystem } from '@/utils/convert';

interface ListLPv2PoolsTableProps {
  data: {
    locked: boolean;
    token1: string;
    token2: string;
    token1Logo: string;
    token2Logo: string;
    token1Address: string;
    token2Address: string;
    lpTokenDecimals: number;
    apr: string;
    totalStaked: string;
    myPoolShare: string;
    myStake: string;
    earnings: string;
    pairAddress: string;
    [key: string]: any;
  }[];
  loading: boolean;
}

const ListLPv2PoolsTable: React.FC<ListLPv2PoolsTableProps> = ({
  data,
  loading,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!isOpen);
  const [selectedPool, setSelectedPool] = useState<string>('');
  const [token1Symbol, setToken1Symbol] = useState<string>('');
  const [token2Symbol, setToken2Symbol] = useState<string>('');
  const [token1Address, setToken1Address] = useState<string>('');
  const [token2Address, setToken2Address] = useState<string>('');
  const [lpTokenDecimals, setLPTokenDecimals] = useState<number>(18);
  const router = useRouter();

  const openRemoveLiquidityModal = (
    pairAddress: string,
    tk1Symbol: string,
    tk2Symbol: string,
    tk1Address: string,
    tk2Address: string,
    lpTkDecimals: number
  ) => {
    setSelectedPool(pairAddress);
    setToken1Symbol(tk1Symbol);
    setToken2Symbol(tk2Symbol);
    setToken1Address(tk1Address);
    setToken2Address(tk2Address);
    setLPTokenDecimals(lpTkDecimals);
    toggleOpen();
  };
  return (
    <>
      <RemoveLiquidityModal
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        pairAddress={selectedPool}
        token1Symbol={token1Symbol}
        token2Symbol={token2Symbol}
        token1Address={token1Address}
        token2Address={token2Address}
        lpTokenDecimals={lpTokenDecimals}
      />
      <div className="overflow-x-auto mt-8 bg-dark md:min-h-[320px]">
        <table className="min-w-full relative">
          <thead>
            <tr>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
                Lock
              </th>
              <th className="text-xs py-3 px-4  border-b border-[#344054] text-center">
                <div className="mr-8">Name</div>
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-center">
                My Pool Share
              </th>
              {/* <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
                APR Range
              </th> */}
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
                TVL
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
                My Deposits
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-center"></th>
            </tr>
          </thead>
          {loading ? (
            <tbody className="bg-[transparent] h-[260px]">
              <div className="flex items-center justify-center absolute w-100px left-[20%]  md:w-[190px] md:left-[40%] top-[40%]">
                <InlineLoading message="Fetching pools data" />
              </div>
            </tbody>
          ) : (
            <tbody>
              {data
                ?.filter((item) => item.myPoolShare != '0.00')
                ?.map((item, index: number) => (
                  <tr key={index} className="hover:bg-darkBlue cursor-pointer">
                    <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                      {item.locked ? (
                        <div
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={`Locked until: ${item.timeLock}`}
                        >
                          <LockIcon active />
                          <Tooltip id="my-tooltip" />
                        </div>
                      ) : (
                        <div
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Unlocked"
                        >
                          <LockIcon />
                          <Tooltip id="my-tooltip" />
                        </div>
                      )}
                    </td>
                    <td
                      className="py-4 text-sm px-4 border-b border-[#344054] text-center relative font-semibold"
                      onClick={() => {
                        router.push(`/pool-detail/${item.pairAddress}`);
                      }}
                    >
                      <div className="relative ">
                        <div className="absolute">
                          {item.token1Logo ? (
                            <Image
                              alt="logo"
                              src={item.token1Logo}
                              width={25}
                              height={25}
                            />
                          ) : (
                            <BNBICon />
                          )}
                        </div>
                        <div className="absolute left-[15px]">
                          {item.token2Logo ? (
                            <Image
                              alt="logo"
                              src={item.token2Logo}
                              width={25}
                              height={25}
                            />
                          ) : (
                            <BNBICon />
                          )}
                        </div>
                      </div>
                      <div className="ml-11 w-[120px] text-center">
                        {item.token1} - {item.token2}
                      </div>
                    </td>
                    <td className="py-4 text-sm px-4 border-b border-[#344054] text-center">
                      {item.myPoolShare || 0}%
                    </td>
                    {/* <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                    {item.apr}%
                  </td> */}
                    <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                      ${convertToInternationalCurrencySystem(item.TVL)}
                    </td>
                    <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                      {item.userLpBalance} LP
                    </td>
                    <td className="flex justify-end gap-2 py-4 text-sm px-1 border-b border-[#344054]">
                      {item.locked || item.myPoolShare === '0.00' ? (
                        <div
                          data-tooltip-id="lock"
                          data-tooltip-content={`Locked until: ${item.timeLock}`}
                        >
                          <Button className="flex rounded-md text-[white] justify-center bg-blue-opacity-50 items-center rounded-[4px] w-[52px] h-[36px]">
                            -
                          </Button>
                          <Tooltip id="lock" />
                        </div>
                      ) : (
                        <Button
                          className="flex rounded-md text-[white] justify-center bg-blue-opacity-50 items-center rounded-[4px] w-[52px] h-[36px]"
                          onClick={() => {
                            openRemoveLiquidityModal(
                              item.pairAddress,
                              item.token1,
                              item.token2,
                              item.token1Address,
                              item.token2Address,
                              item.lpTokenDecimals
                            );
                          }}
                        >
                          -
                        </Button>
                      )}
                      <Button
                        className="flex rounded-md text-[white] justify-center bg-blue-opacity-50 items-center rounded-[4px] w-[52px] h-[36px]"
                        onClick={() => {
                          router.push(
                            `/liquidity?token1=${item.token1Address}&token2=${item.token2Address}`
                          );
                        }}
                      >
                        +
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default ListLPv2PoolsTable;
