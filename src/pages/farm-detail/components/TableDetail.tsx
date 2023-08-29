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
      <table className="min-w-full bg-[#00000080] ">
        <tbody>
          <tr
            className="hover:bg-[#150E3980] cursor-pointer"
            onClick={() => router.push('/farm-detail')}
          >
            <td className="py-4 text-[14px] font-bold px-4 border-b border-[#344054] text-left w-[120px]">
              Pool
            </td>
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right w-[200px]">
              <div className="text-[12px] text-[#344054]">
                Total value locked
              </div>
              <div>$482.58K</div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right w-[200px]">
              <div className="text-[12px] text-[#344054]">APR</div>
              <div className="flex gap-2 items-center justify-end">
                0.7749% <QuestionIcon />
              </div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right w-[200px]">
              <div className="text-[12px] text-[#344054]">
                Pending rewards #1
              </div>
              <div className="flex gap-1 items-center justify-end">
                0.7749%{' '}
                <div className="text-[12px] text-[#344054]">($1,75k)</div>
              </div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right w-[200px]">
              <div className="text-[12px] text-[#344054]">
                Pending rewards #2
              </div>
              <div className="flex gap-1 items-center justify-end">
                0.7749%{' '}
                <div className="text-[12px] text-[#344054]">($1,75k)</div>
              </div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right "></td>
          </tr>
          <tr
            className="hover:bg-[#150E3980] cursor-pointer"
            onClick={() => router.push('/farm-detail')}
          >
            <td className="py-4 text-[14px] font-bold px-4 border-b border-[#344054] text-left">
              Status
            </td>
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right">
              <div className="text-[12px] text-[#344054]">Status</div>
              <div className="text-[#F04438] font-semibold">Ended</div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right">
              <div className="text-[12px] text-[#344054]">Duration</div>
              <div>7 months 1 day</div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-left"></td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-left"></td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right "></td>
          </tr>
          <tr
            className="hover:bg-[#150E3980] cursor-pointer"
            onClick={() => router.push('/farm-detail')}
          >
            <td className="py-4 text-[14px] font-bold px-4 border-b border-[#344054] text-left">
              Authorizations
            </td>
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right">
              <div className="text-[12px] text-[#344054]">Deposits</div>
              <div className="text-[#F04438] font-semibold">Disabled</div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right">
              <div className="text-[12px] text-[#344054]">Harvests</div>
              <div className="text-[#17B26A] font-semibold">Enabled</div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-left"></td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-left"></td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right "></td>
          </tr>
          <tr
            className="hover:bg-[#150E3980] cursor-pointer"
            onClick={() => router.push('/farm-detail')}
          >
            <td className="py-4 text-[14px] font-bold px-4 border-b border-[#344054] text-left">
              Requirements
            </td>
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right">
              <div className="text-[12px] text-[#344054]">Minimum amount</div>
              <div>-</div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right">
              <div className="text-[12px] text-[#344054]">Minimum lock</div>
              <div>-</div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right">
              <div className="text-[12px] text-[#344054]">Locked until</div>
              <div>-</div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right">
              <div className="text-[12px] text-[#344054]">Whitelist</div>
              <div>-</div>
            </td>{' '}
            <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right "></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableDetail;
