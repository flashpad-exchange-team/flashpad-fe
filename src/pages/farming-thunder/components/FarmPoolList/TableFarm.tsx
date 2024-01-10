import React from 'react';
import BNBICon from '@/icons/BNBIcon';
import ClockIcon from '@/icons/ClockIcon';
import FileIcon from '@/icons/FileIcon';
import LiquidityLockIcon from '@/icons/LiquidityLockIcon';
import QuestionIcon from '@/icons/QuestionIcon';
import TokenIcon from '@/icons/TokenIcon';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/router';
import InlineLoading from '@/components/loading/InlineLoading';
import { secondsToDays } from '@/utils/constants';
import { IThunderPoolSettings } from '@/utils/contract/thunderPoolContract';
import BigNumber from 'bignumber.js';
import { convertToInternationalCurrencySystem } from '@/utils/convert';

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
    poolAddress: string;
    settings: IThunderPoolSettings;
    [k: string]: any;
  }[];
  loading: boolean;
}

const TableFarm: React.FC<TableFarmProps> = ({ data, loading }) => {
  const router = useRouter();
  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-dark relative">
        <thead>
          <tr>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
              Pool
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-center">
              Incentives
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
              TVL
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
            <div className="flex items-center justify-center absolute w-[210px] left-[40%] top-[40%]">
              <InlineLoading message="Fetching Thunder Pools list" />
            </div>
          </tbody>
        ) : (
          <tbody>
            {data?.map((item, index: number) => (
              <tr key={index} className="hover:bg-darkBlue cursor-pointer">
                <td
                  className="py-4 text-sm px-4 border-b border-[#344054] text-left"
                  onClick={() => {
                    if (item?.poolAddress) {
                      router.push(`/farm-detail-thunder/${item.poolAddress}`);
                    }
                  }}
                >
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
                    {item?.token1 !== item?.token2 && (
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
                    )}
                  </div>
                  <div className="ml-12">
                    {item?.token1 === item?.token2
                      ? `${item?.token1}`
                      : `${item?.token1} - ${item?.token2}`}
                  </div>
                </td>
                <td
                  className=" py-4 text-sm px-4 border-b border-[#344054] text-center"
                  onClick={() => {
                    if (item?.poolAddress) {
                      router.push(`/farm-detail-thunder/${item.poolAddress}`);
                    }
                  }}
                >
                  <div className="relative flex items-center">
                    <div className="absolute">
                      <div
                        data-tooltip-id="incentiveToken1"
                        data-tooltip-content={item?.rewardsToken1Symbol}
                      >
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
                        <Tooltip id="incentiveToken1" />
                      </div>
                    </div>
                    <div className="absolute left-[15px]">
                      <div
                        data-tooltip-id="incentiveToken2"
                        data-tooltip-content={item?.rewardsToken2Symbol}
                      >
                        {item?.rewardsToken2Logo ? (
                          <Image
                            className="mx-1"
                            alt="logo"
                            src={item?.rewardsToken2Logo}
                            width={25}
                            height={25}
                          />
                        ) : null}
                      </div>
                      <Tooltip id="incentiveToken2" />
                    </div>
                  </div>
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right relative">
                  ${convertToInternationalCurrencySystem(item?.tvl || 0)}
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  <div className="flex items-center gap-2 cursor-pointer justify-end">
                    {item?.apr}% <QuestionIcon />
                  </div>
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-center">
                  <div className="flex items-center gap-2 cursor-pointer justify-center">
                    <div
                      data-tooltip-id="lockDurationReq"
                      data-tooltip-content={`Required lock duration of ${secondsToDays(
                        item?.settings.lockDurationReq!
                      )} days`}
                    >
                      <ClockIcon />
                      <Tooltip id="lockDurationReq" />
                    </div>
                    <div
                      data-tooltip-id="depositAmountReq"
                      data-tooltip-content={`Min deposit amount requirement: ${
                        BigNumber(item?.settings.depositAmountReq + '').div(
                          BigNumber(10).pow(18)
                        ) + ''
                      }`}
                    >
                      <TokenIcon />
                      <Tooltip id="depositAmountReq" />
                    </div>
                    <div
                      data-tooltip-id="whitelist"
                      data-tooltip-content={`Whitelist ${
                        item?.settings.whitelist ? 'enabled' : 'disabled'
                      }`}
                    >
                      <FileIcon />
                      <Tooltip id="whitelist" />
                    </div>
                    <div
                      data-tooltip-id="lockEndReq"
                      data-tooltip-content={`Lock end date requirement`}
                    >
                      <LiquidityLockIcon />
                      <Tooltip id="lockEndReq" />
                    </div>
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
