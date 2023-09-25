import BNBICon from '@/icons/BNBIcon';
import Search from '@/icons/Search';
import React from 'react';

interface TableAnalyticsPairProps {
  data: any;
}

const TableAnalyticsPair: React.FC<TableAnalyticsPairProps> = ({ data }) => {
  return (
    <div className="w-full my-4">
      <div className="w-full text-sm text-[#98A2B3] pb-3 px-4 text-left mt-4">
        <div className="mt-4 flex justify-between text-[#fff] items-center">
          <div className="w-[200px] text-[14px]">Top Pairs</div>
          <div className="w-full flex justify-end">
            <input
              className="w-[300px] bg-[#150E39] h-[52px] text-[16px] text-[#fff] font-semibold rounded-tl-lg rounded-bl-lg focus:outline-none placeholder-[#667085] pl-6"
              placeholder="Search by name or address"
            />
            <div className="w-[70px] bg-[#150E39] flex items-center justify-center rounded-tr-lg rounded-br-lg">
              <Search />
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default TableAnalyticsPair;
