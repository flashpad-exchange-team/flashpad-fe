import BNBICon from '@/icons/BNBIcon';
import Eligibility from '@/icons/Eligibility';
import Search from '@/icons/Search';
import { useRouter } from 'next/router';
import React from 'react';

interface TableLaunchpadProps {
  data: {
    token: string;
    incentivesToken: string;
    hardcap: boolean;
    wlState: boolean;
    totalRaise: number;
    about: number;
  }[];
}

const TableLaunchpad: React.FC<TableLaunchpadProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="overflow-x-auto my-10 mt-24">
      <div className="w-full text-lg py-3 text-center md:text-left">
        Launchpad
      </div>
      <div className="w-full text-sm text-[#98A2B3] pb-3 text-center md:text-left">
        Custom-built infrastructure for Linea native public sales
      </div>
      <div className="w-full text-sm text-[#98A2B3] pb-3 px-3 md:px-0 text-center md:text-left">
        <div className="w-full  flex">
          <div className="w-[70px] bg-[#150E39] flex items-center justify-center rounded-tl-lg rounded-bl-lg">
            <Search />
          </div>
          <input
            className=" bg-[#150E39] h-[52px] text-[15px] font-semibold rounded-tr-lg rounded-br-lg focus:outline-none  placeholder-[#667085] w-full"
            placeholder="Search by name or address"
          />
        </div>
      </div>
      <table className="min-w-full bg-dark">
        <thead>
          <tr>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
              Name
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
              Hardcap
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
              WL State
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
              Status
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
              Total raised
            </th>
            <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
              About
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index: number) => (
            <tr
              key={index}
              className="hover:bg-darkBlue cursor-pointer"
              onClick={() => router.push('/launchpad-detail')}
            >
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                <div className="relative">
                  <div className="absolute">
                    <BNBICon size={40} />
                  </div>
                </div>
                <div className="ml-14">
                  <div>{item.token}</div>
                  <div className="text-[#98A2B3]">
                    Rising {item.incentivesToken}
                  </div>
                </div>
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054]">
                <Eligibility stroke={item.hardcap ? '' : 'white'} />
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-center">
                <Eligibility stroke={item.wlState ? '' : 'white'} />
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                <div className="text-[#F04438] font-semibold">Ended</div>
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                {item.totalRaise.toLocaleString()} {item.incentivesToken}
              </td>
              <td className="py-4 text-sm text-lightGray px-4 border-b border-[#344054] text-center">
                {item.about}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLaunchpad;
