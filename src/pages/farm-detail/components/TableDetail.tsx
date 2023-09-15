import QuestionIcon from '@/icons/QuestionIcon';
import { useRouter } from 'next/router';
import React from 'react';

interface TableDetailProps {
  data?: {
    tvl: string;
    incentivesToken: string;
    incentivesLogo: string;
    token1: string;
    token2: string;
    token1Logo: string;
    token2Logo: string;
    apr: string;
    totalDeposit: string;
    pendingRewards: string;
  }[];
}

const TableDetail: React.FC<TableDetailProps> = () => {
  const router = useRouter();
  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-dark">
        <tbody>
          <tr
            className="hover:bg-darkBlue cursor-pointer"
            onClick={() => router.push('/farm-detail')}
          >
            <td className="py-4 text-sm font-bold px-4 border-b border-[#344054] text-left w-[120px]">
              Pool
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right w-[200px]">
              <div className="text-xs text-lightGray">Total value locked</div>
              <div>$482.58K</div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right w-[200px]">
              <div className="text-xs text-lightGray">APR</div>
              <div className="flex gap-2 items-center justify-end">
                0.7749% <QuestionIcon />
              </div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right w-[200px]">
              <div className="text-xs text-lightGray">Pending rewards #1</div>
              <div className="flex gap-1 items-center justify-end">
                0.7749%
                <div className="text-xs text-lightGray">($1,75k)</div>
              </div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right w-[200px]">
              <div className="text-xs text-lightGray">Pending rewards #2</div>
              <div className="flex gap-1 items-center justify-end">
                0.7749%
                <div className="text-xs text-lightGray">($1,75k)</div>
              </div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right "></td>
          </tr>
          <tr
            className="hover:bg-darkBlue cursor-pointer"
            onClick={() => router.push('/farm-detail')}
          >
            <td className="py-4 text-sm font-bold px-4 border-b border-[#344054] text-left">
              Status
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
              <div className="text-xs text-lightGray">Status</div>
              <div className="text-[#F04438] font-semibold">Ended</div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
              <div className="text-xs text-lightGray">Duration</div>
              <div>7 months 1 day</div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-left"></td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-left"></td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right "></td>
          </tr>
          <tr
            className="hover:bg-darkBlue cursor-pointer"
            onClick={() => router.push('/farm-detail')}
          >
            <td className="py-4 text-sm font-bold px-4 border-b border-[#344054] text-left">
              Authorizations
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
              <div className="text-xs text-lightGray">Deposits</div>
              <div className="text-[#F04438] font-semibold">Disabled</div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
              <div className="text-xs text-lightGray">Harvests</div>
              <div className="text-[#17B26A] font-semibold">Enabled</div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-left"></td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-left"></td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right "></td>
          </tr>
          <tr
            className="hover:bg-darkBlue cursor-pointer"
            onClick={() => router.push('/farm-detail')}
          >
            <td className="py-4 text-sm font-bold px-4 border-b border-[#344054] text-left">
              Requirements
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
              <div className="text-xs text-lightGray">Minimum amount</div>
              <div>-</div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
              <div className="text-xs text-lightGray">Minimum lock</div>
              <div>-</div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
              <div className="text-xs text-lightGray">Locked until</div>
              <div>-</div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
              <div className="text-xs text-lightGray">Whitelist</div>
              <div>-</div>
            </td>
            <td className="py-4 text-sm px-4 border-b border-[#344054] text-right "></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableDetail;
