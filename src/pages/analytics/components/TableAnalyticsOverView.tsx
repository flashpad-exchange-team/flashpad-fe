import Coin from '@/icons/Coin';
import CoinHand from '@/icons/CoinHand';
import PieChart from '@/icons/PieChart';
import SaleIcon from '@/icons/SaleIcon';
import Search from '@/icons/Search';
import React from 'react';
import AnalyticsChart from 'public/assets/images/analytics-chart.png';
import Image from 'next/image';
import { Button } from '@/components/button/Button';
import BNBICon from '@/icons/BNBIcon';

interface TableAnalyticsOverviewProps {
  data: any;
}

const TableAnalyticsOverview: React.FC<TableAnalyticsOverviewProps> = ({
  data,
}) => {
  return (
    <div className="w-full my-4">
      <div className="px-4 text-[24px]">Flashpad Analytics</div>
      <div className="w-full text-sm text-[#98A2B3] pb-3 px-4 text-left mt-4">
        <div className="w-full flex">
          <input
            className="w-full bg-[#150E39] h-[52px] text-[16px] text-[#fff] font-semibold rounded-tl-lg rounded-bl-lg focus:outline-none placeholder-[#667085] pl-6"
            placeholder="Search by name or address"
          />
          <div className="w-[70px] bg-[#150E39] flex items-center justify-center rounded-tr-lg rounded-br-lg">
            <Search />
          </div>
        </div>
        <div className="flex gap-8 mt-4 text-[16px]">
          <div className="flex gap-2 items-center text-[#fff]">
            <Coin />
            <div>ETH Price: </div>
            <div>1.851 US$</div>
          </div>
          <div className="flex gap-2 items-center text-[#fff]">
            <CoinHand />
            <div>Transactions (24H): </div>
            <div>1.851 US$</div>
          </div>
          <div className="flex gap-2 items-center text-[#fff]">
            <PieChart />
            <div>Pair: </div>
            <div>98</div>
          </div>
          <div className="flex gap-2 items-center text-[#fff]">
            <SaleIcon stroke="#fff" />
            <div>Fees (24H): </div>
            <div>1.851 US$</div>
          </div>
        </div>
        <Image
          className="w-full h-auto mt-4"
          alt="logo"
          src={AnalyticsChart.src}
          width={500}
          height={5100}
        />
        <div className="mt-4 px-4 flex justify-between text-[#fff] items-center">
          <div>Top Tokens</div>
          <Button className="px-6">See all</Button>
        </div>
        <table className="min-w-full mt-4">
          <thead>
            <tr>
              <th className="text-xs py-3 px-4 border border-r-0 border-b-0 border-[#344054] text-left">
                Name
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Symbol
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Liquidity
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Volume (24hrs)
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Price
              </th>
              <th className="text-xs py-3 px-4 border-t border-r border-[#344054] text-right">
                Price Change (24hrs
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item: any, index: number) => (
              <tr key={index} className="hover:bg-darkBlue cursor-pointer">
                <td className="py-4 text-sm px-4 border-b border-l border-[#344054] text-left flex gap-2">
                  <div>0{index + item}</div>
                  <BNBICon />
                  <div>Token A</div>
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  TOKEN...
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  4.711.111 US$
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  22.641 US$
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  46,48 US$
                </td>
                <td className="py-4 text-sm px-4 border-b border-r border-[#344054] text-right text-[#F04438] ">
                  -100%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 px-4 flex justify-between text-[#fff] items-center">
          <div>Top Pairs</div>
          <Button className="px-6">See all</Button>
        </div>
        <table className="min-w-full mt-4">
          <thead>
            <tr>
              <th className="text-xs py-3 px-4 border border-r-0 border-b-0 border-[#344054] text-left">
                Name
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Fee 0 / 1
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Fee 1 / 0
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Liquidity
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Volume (24hrs)
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Volume (7d)
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Fee (24hrs)
              </th>
              <th className="text-xs py-3 px-4 border-t border-r border-[#344054] text-right">
                1y Fee/liquidity
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item: any, index: number) => (
              <tr key={index} className="hover:bg-darkBlue cursor-pointer">
                <td className="py-4 text-sm px-4 border-b border-l border-[#344054] text-left flex gap-2">
                  <div>0{index + item}</div>
                  <div className="relative">
                    <div className="absolute">
                      <BNBICon />
                    </div>
                    <div className="absolute left-[15px]">
                      <BNBICon />
                    </div>
                  </div>
                  <div className="ml-10">Token A - Token B</div>
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  0.7749%
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  0.7749%
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  22.641 US$
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  46,48 US$
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  46,48 US$
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  46,48 US$
                </td>
                <td className="py-4 text-sm px-4 border-b border-r border-[#344054] text-right text-[#17B26A] ">
                  +100%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 px-4 flex justify-between text-[#fff] items-center">
          <div>Top Pairs</div>
          <Button className="px-6">See all</Button>
        </div>
        <table className="min-w-full mt-4">
          <thead>
            <tr>
              <th className="text-xs py-3 px-4 border border-r-0 border-b-0 border-[#344054] text-left flex gap-4">
                <div className="text-[#FFAF1D]">All</div>
                <div>Swaps</div>
                <div>Ads</div>
                <div>Removes</div>
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Total Value
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Token Amount
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Token Amount
              </th>
              <th className="text-xs py-3 px-4 border-t border-[#344054] text-right">
                Account
              </th>
              <th className="text-xs py-3 px-4 border-t border-r border-[#344054] text-right">
                <div>1y Fee/liquidity</div>
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item: any, index: number) => (
              <tr
                key={index + item}
                className="hover:bg-darkBlue cursor-pointer"
              >
                <td className="py-4 text-sm px-4 border-b border-l border-[#344054] text-left flex gap-2 text-[#FFAF1D]">
                  Swap ETH for VELA
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  TOKEN...
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  4.711.111 US$
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  22.641 US$
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right text-[#FFAF1D]">
                  0xdef1...ee57
                </td>
                <td className="py-4 text-sm px-4 border-b border-r border-[#344054] text-right text-[#F04438] ">
                  34 minutes ago
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableAnalyticsOverview;
