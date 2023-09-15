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

const TableDetailSp: React.FC<TableDetailProps> = () => {
  const router = useRouter();
  return (
    <div className="overflow-x-auto mt-8">
      <div className="min-w-full bg-dark pt-3">
        <div
          className="py-4 px-4 cursor-pointer"
          onClick={() => router.push('/farm-detail-merlin')}
        >
          <p className="text-sm font-bold text-left w-[120px] ">Pool</p>
          <div className="flex justify-between pt-2">
            <div className="flex space-between text-xs text-[#344054]">
              Total value locked
            </div>
            <div>$482.58K</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">APR</div>
            <div className="flex gap-2 items-center justify-end">
              0.7749% <QuestionIcon />
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">Pending rewards #1</div>
            <div className="flex gap-1 items-center justify-end">
              0.7749%
              <div className="text-xs text-[#344054]">($1,75k)</div>
            </div>
          </div>
        </div>
        <div
          className="py-1 px-4 cursor-pointer"
          onClick={() => router.push('/farm-detail-merlin')}
        >
          <p className="text-sm font-bold text-left w-[120px] ">Status</p>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">Status</div>
            <div className="text-[#F04438] font-semibold">Ended</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">Duration</div>
            <div>7 months 1 day</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">End in</div>
            <div>7 months 1 day</div>
          </div>
        </div>
        <div
          className="py-1 px-4 cursor-pointer"
          onClick={() => router.push('/farm-detail-merlin')}
        >
          <p className="text-sm font-bold text-left w-[120px] ">
            Authorizations
          </p>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">Deposits</div>
            <div className="text-[#F04438] font-semibold">Disabled</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">Deposits end time</div>
            <div className="text-[#F04438] font-semibold">Disabled</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">Harvests</div>
            <div className="text-[#17B26A] font-semibold">Enabled</div>
          </div>
        </div>
        <div
          className="py-1 px-4 "
          onClick={() => router.push('/farm-detail-merlin')}
        >
          <p className="text-sm font-bold text-left w-[120px] ">Requirements</p>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">Minimum amount</div>
            <div>-</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">Minimum lock</div>
            <div>-</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">Locked until</div>
            <div>-</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-[#344054]">Whitelist</div>
            <div>-</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetailSp;
