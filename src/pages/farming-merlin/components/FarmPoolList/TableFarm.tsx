import React from 'react';
import BNBICon from '@/icons/BNBIcon';
import ClockIcon from '@/icons/ClockIcon';
import FileIcon from '@/icons/FileIcon';
import LiquidityLockIcon from '@/icons/LiquidityLockIcon';
import QuestionIcon from '@/icons/QuestionIcon';
import TokenIcon from '@/icons/TokenIcon';
import Image from 'next/image';
import { useRouter } from 'next/router';
import InlineLoading from '@/components/loading/InlineLoading';

interface TableFarmProps {
  data: {
    tvl?: string;
    apr?: string;
    token1: string;
    token2: string;
    token1Logo?: string;
    token2Logo?: string;
    rewardsToken1Info: any;
    rewardsToken2Info: any;
    rewardsToken1Symbol: string;
    rewardsToken2Symbol: string;
    rewardsToken1Logo?: string;
    rewardsToken2Logo?: string;
    totalDeposit: string;
    pendingRewards: { pending1: any; pending2: any };
    [k: string]: any;
  }[];
  loading: boolean;
}

const TableFarm: React.FC<TableFarmProps> = ({ data, loading }) => {
  const router = useRouter();
  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-dark">
        <thead>
          <tr>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
              Pool
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
              TVL
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-center">
              Incentives
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
              APR
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-center">
              Requirements
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
              Total deposit
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
              Pending rewards
            </th>
          </tr>
        </thead>
        {loading ? (
          <tbody className="bg-[transparent] h-[260px]">
            <div className="flex items-center justify-center w-full">
              <InlineLoading message="Fetching Merlin Pools list" />
            </div>
          </tbody>
        ) : (
          <tbody>
            {data?.map((item, index: number) => (
              <tr
                key={index}
                className="hover:bg-darkBlue cursor-pointer"
                onClick={() => router.push('/farm-detail-merlin')}
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
                <td className="flex py-4 text-sm px-4 border-b border-[#344054] text-center">
                  {item?.rewardsToken1Logo ? (
                    <Image
                      className="mx-1"
                      alt="logo"
                      src={item?.rewardsToken1Logo}
                      width={25}
                      height={25}
                    />
                  ) : (
                    <BNBICon className="mx-1" />
                  )}
                  {item?.rewardsToken2Symbol &&
                    (item?.rewardsToken2Logo ? (
                      <Image
                        className="mx-1"
                        alt="logo"
                        src={item?.rewardsToken2Logo}
                        width={25}
                        height={25}
                      />
                    ) : (
                      <BNBICon className="mx-1" />
                    ))}
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  <div className="flex items-center gap-2 cursor-pointer justify-end">
                    {item?.apr}% <QuestionIcon />
                  </div>
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-center">
                  <div className="flex items-center gap-2 cursor-pointer justify-center">
                    <ClockIcon />
                    <TokenIcon />
                    <FileIcon />
                    <LiquidityLockIcon />
                  </div>
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  {item?.totalDeposit + ''}
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  {Object.values(item?.pendingRewards || {}).reduce(
                    (a: any, b: any) => a + b,
                    BigInt(0)
                  ) + ''}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TableFarm;
