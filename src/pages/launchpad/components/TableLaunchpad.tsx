import ArrowLeft from '@/icons/ArrowLeft';
import BNBICon from '@/icons/BNBIcon';
import Eligibility from '@/icons/Eligibility';
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
    <div className="overflow-x-auto my-10">
      <table className="min-w-full bg-[#00000080]">
        <thead>
          <tr>
            <div className="w-full text-[18px] py-3 px-4 text-left">
              Launchpad
            </div>
          </tr>
          <tr>
            <div className="w-full text-[14px] text-[#98A2B3] pb-3 px-4 text-left">
              Custom-built infrastructure for Linea native public sales
            </div>
          </tr>
          <tr>
            <div className="w-full text-[14px] text-[#98A2B3] pb-3 px-4 text-left">
              <input
                className="w-full bg-[#1D2939] h-[52px] pl-8 text-[15px] font-semibold mb-2 mt-3.5 rounded-md focus:outline-none placeholder-[#667085]"
                placeholder="Search by name or address"
                value={''}
              />
            </div>
          </tr>
          <tr>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-left flex">
              Name
              <ArrowLeft />
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-left">
              Hardcap
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-left">
              WL State
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-left">
              Status
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-left">
              Total raised
            </th>
            <th className="text-[12px] py-3 px-4 border-b border-[#344054] text-right">
              About
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index: number) => (
            <tr
              key={index}
              className="hover:bg-[#150E3980] cursor-pointer"
              onClick={() => router.push('/launchpad-detail')}
            >
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-left">
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
              <td className="py-4 text-[14px] px-4 border-b border-[#344054]">
                <Eligibility stroke={item.hardcap ? '' : 'white'} />
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-center">
                <Eligibility stroke={item.wlState ? '' : 'white'} />
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-left">
                <div className="text-[#F04438] font-semibold">Ended</div>
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-left">
                {item.totalRaise.toLocaleString()} {item.incentivesToken}
              </td>
              <td className="py-4 text-[14px] text-[#344054] px-4 border-b border-[#344054] text-center">
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
