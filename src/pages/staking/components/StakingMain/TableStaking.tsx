import BNBICon from '@/icons/BNBIcon';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface TableStakingProps {
  data: {
    tvl: string;
    incentivesToken: string;
    incentivesLogo: string | null;
    token1: string;
    token2: string;
    token1Logo: string;
    token2Logo: string;
    apr: string;
    totalDeposit: string;
    pendingRewards: string;
  }[];
}

const TableStaking: React.FC<TableStakingProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-dark ">
        <thead>
          <tr>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
              Token
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
              TVL
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
              Composition
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
              Fees APR
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
              Pool share
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index: number) => (
            <tr
              key={index}
              className="hover:bg-darkBlue cursor-pointer"
              onClick={() => router.push('/farm-detail')}
            >
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                <div className="relative">
                  <div className="absolute">
                    {item?.token1Logo ? (
                      <Image
                        alt="logo"
                        src={item?.token1Logo}
                        width={25}
                        height={25}
                      />
                    ) : (
                      <BNBICon />
                    )}
                  </div>
                  <div className="absolute left-[15px]">
                    {item?.token2Logo ? (
                      <Image
                        alt="logo"
                        src={item?.token2Logo}
                        width={25}
                        height={25}
                      />
                    ) : (
                      <BNBICon />
                    )}
                  </div>
                </div>
                <div className="ml-12">
                  {item?.token1} - {item?.token2}
                </div>
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-right relative">
                ${item?.tvl}
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                <div className="flex items-center gap-2 mb-1">
                  {item?.token1Logo ? (
                    <Image
                      alt="logo"
                      src={item?.token1Logo}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <BNBICon />
                  )}
                  23,34324
                </div>
                <div className="flex items-center gap-2">
                  {item?.token2Logo ? (
                    <Image
                      alt="logo"
                      src={item?.token2Logo}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <BNBICon />
                  )}
                  1344.5556
                </div>
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                <div className="flex items-center gap-2 cursor-pointer justify-end">
                  {item?.apr}%
                </div>
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                <div className="flex items-center gap-2 cursor-pointer justify-end">
                  {item?.apr}%
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableStaking;
