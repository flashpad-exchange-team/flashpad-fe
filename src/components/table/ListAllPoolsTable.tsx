import ArrowRight from '@/icons/ArrowRight';
import BNBICon from '@/icons/BNBIcon';
import QuestionIcon from '@/icons/QuestionIcon';
import { convertToInternationalCurrencySystem } from '@/utils/convert';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Tooltip } from 'react-tooltip';
import { Button } from '../button/Button';
import InlineLoading from '../loading/InlineLoading';

interface ListAllPoolsTableProps {
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

const ListAllPoolsTable: React.FC<ListAllPoolsTableProps> = ({
  data,
  loading,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="overflow-x-auto mt-8 bg-dark md:min-h-[320px]">
        <table className="min-w-full relative">
          <thead>
            <tr>
              <th className="text-xs py-3 px-4  border-b border-[#344054] text-center">
                <div className="mr-8">Name</div>
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
                TVL
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
                APR Range
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
                My Pool Share
              </th>

              <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
                Your Deposits
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-left"></th>
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
              {data?.map((item, index: number) => (
                <tr key={index} className="hover:bg-darkBlue cursor-pointer">
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
                  <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                    ${convertToInternationalCurrencySystem(item.TVL)}
                  </td>
                  <td className="py-4 text-sm px-4 border-b border-[#344054] text-left flex gap-1 items-center">
                    {BigNumber(item.farmBaseAPR).plus(item.feeAPR).toFixed(2)}%
                    <ArrowRight />{' '}
                    <span className="text-primary">
                      {' '}
                      {BigNumber(item.farmBaseAPR)
                        .plus(item.feeAPR)
                        .times(3)
                        .toFixed(2)}
                      %
                    </span>
                    <div
                      data-tooltip-id="apr"
                      data-tooltip-html={`Farm Base APR : ${BigNumber(
                        item.farmBaseAPR
                      ).toFixed(2)}% <br/> Fees APR : ${BigNumber(
                        item.feeAPR
                      ).toFixed(2)}%`}
                    >
                      <QuestionIcon />
                      <Tooltip id="apr" />
                    </div>
                  </td>
                  <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                    {item.myPoolShare === '0.00' ? 0 : item.myPoolShare}%
                  </td>
                  <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                    {item.userLpBalance === '0.00' ? 0 : item.userLpBalance} LP
                  </td>
                  <td className="text-sm px-2 border-b border-[#344054] text-left">
                    <Button
                      className="px-2 h-[36px] w-[100%] mr-2 md:mr-0 md:w-[120px] flex justify-center text-sm"
                      onClick={() => {
                        router.push(
                          `/liquidity?token1=${item.token1Address}&token2=${item.token2Address}`
                        );
                      }}
                    >
                      Add Liquidity
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

export default ListAllPoolsTable;
