import BNBICon from '@/icons/BNBIcon';
import LockIcon from '@/icons/LockIcon';
import Image from 'next/image';
import React from 'react';

interface TableProps {
  data: {
    locked: boolean;
    token1: string;
    token2: string;
    token1Logo: string;
    token2Logo: string;
    apr: string;
    totalStaked: string;
    myPool: string;
    myStake: string;
    earnings: string;
    [key: string]: any;
  }[];
}

const ListPoolsTable: React.FC<TableProps> = ({ data }) => {

  const handleRemoveLiquidity = async () => {
    alert('TODO: handle calling SC function "removeLiquidity"');
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-[#00000080] ">
        <thead>
          <tr>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-left">
              Lock
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-left">
              Name
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-right">
              APR
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-right">
              Total Staked
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-center">
              My Pool
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-center">
              My Stake
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-center">
              Earnings
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-center"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index: number) => (
            <tr key={index} className="hover:bg-[#150E3980] cursor-pointer">
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-left">
                {item.locked ? <LockIcon active /> : <LockIcon />}
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-left relative">
                <div className="relative">
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
                    {' '}
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
                <div className="ml-12">
                  {item.token1} - {item.token2}
                </div>
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right">
                {item.apr}%
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right">
                ${item.totalStaked}
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-center">
                {item.myPool}%
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-center">
                ${item.myStake}
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-center">
                ${item.earnings}
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-center">
                {item.locked ? (
                  <div className="cursor-default text-[#475467] font-semibold">
                    Remove
                  </div>
                ) : (
                  <div
                    className="cursor-pointer text-[#E6B300] font-semibold"
                    onClick={handleRemoveLiquidity}
                  >
                    Remove
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPoolsTable;
