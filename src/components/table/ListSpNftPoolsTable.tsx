import BNBICon from '@/icons/BNBIcon';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import InlineLoading from '../loading/InlineLoading';
import BigNumber from 'bignumber.js';

interface ListSpNftPoolsTableProps {
  data: {
    token1: string;
    token2: string;
    token1Logo: string;
    token2Logo: string;
    token1Address: string;
    token2Address: string;
    lpTokenAddress: string;
    lpTokenDecimals: number;
    poolAddress: string;
    apr: string;
    tvl: string;
    [key: string]: any;
  }[];
  loading: boolean;
}

const ListSpNftPoolsTable: React.FC<ListSpNftPoolsTableProps> = ({
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
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
                <div className="ml-16">Token</div>
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
                TVL
              </th>
              {/* <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
                Composition
              </th> */}
              {/* TODO */}
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
                Deposits
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-center">
                Fees APR
              </th>
            </tr>
          </thead>
          {loading ? (
            <tbody className="bg-[transparent] h-[260px]">
              <div className="flex items-center justify-center absolute w-[210px] left-[40%] top-[40%]">
                <InlineLoading message="Fetching spNFT pools data" />
              </div>
            </tbody>
          ) : (
            <tbody>
              {data?.map((item, index: number) => (
                <tr key={index} className="hover:bg-darkBlue cursor-pointer">
                  <td
                    className="py-4 text-sm px-4 border-b border-[#344054] text-left relative font-semibold"
                    onClick={() => {
                      router.push(`/pool-detail/${item?.lpTokenAddress}`);
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
                      <div className="absolute left-[15px]">
                        {item?.token1Logo != item?.token2Logo &&
                          (item?.token2Logo ? (
                            <Image
                              alt="logo"
                              src={item?.token2Logo}
                              width={25}
                              height={25}
                            />
                          ) : (
                            <BNBICon />
                          ))}
                      </div>
                    </div>
                    <div className="ml-16">
                      {item?.token1}
                      {item?.token1 != item?.token2 && ' - ' + item?.token2}
                    </div>
                  </td>
                  <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                    ${item?.TVL}
                  </td>
                  {/* <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                    ${item?.tvl}
                  </td> */}
                  <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                    {item?.lpSupplyAmount} LP
                  </td>
                  <td className="py-4 text-sm px-4 border-b border-[#344054] text-center">
                    {BigNumber(item?.feeAPR)?.toFixed(2)}%
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

export default ListSpNftPoolsTable;
