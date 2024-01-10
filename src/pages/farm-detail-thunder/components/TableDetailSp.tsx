import QuestionIcon from '@/icons/QuestionIcon';
import { useRouter } from 'next/router';
import React from 'react';
import ThunderPoolDetailProps from '../../../types/ThunderPoolDetail';

interface TableDetailSpProps {
  data: ThunderPoolDetailProps;
}

const TableDetailSp: React.FC<TableDetailSpProps> = ({ data }) => {
  console.log({ data });
  const router = useRouter();
  return (
    <div className="overflow-x-auto mt-8">
      <div className="min-w-full bg-dark pt-3">
        <div
          className="py-4 px-4 cursor-pointer"
          onClick={() => router.push('/farm-detail-thunder')}
        >
          <p className="text-sm font-bold text-left w-[120px] ">Pool</p>
          <div className="flex justify-between pt-2">
            <div className="flex space-between text-xs text-lightGray">
              Total value locked
            </div>
            <div>${data.tvl || 0}</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">APR</div>
            <div className="flex gap-2 items-center justify-end">
              {data.apr || 0}% <QuestionIcon />
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">Pending rewards #1</div>
            <div className="flex gap-1 items-center justify-end">
              0.7749%
              <div className="text-xs text-lightGray">($1,75k)</div>
            </div>
          </div>
        </div>
        <div
          className="py-1 px-4 cursor-pointer"
          onClick={() => router.push('/farm-detail-thunder')}
        >
          <p className="text-sm font-bold text-left w-[120px] ">Status</p>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">Status</div>
            <div className="text-[#F04438] font-semibold">Ended</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">Duration</div>
            <div>7 months 1 day</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">End in</div>
            <div>7 months 1 day</div>
          </div>
        </div>
        <div
          className="py-1 px-4 cursor-pointer"
          onClick={() => router.push('/farm-detail-thunder')}
        >
          <p className="text-sm font-bold text-left w-[120px] ">
            Authorizations
          </p>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">Deposits</div>
            <div className="text-[#F04438] font-semibold">Disabled</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">Deposits end time</div>
            <div className="text-[#F04438] font-semibold">Disabled</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">Harvests</div>
            <div className="text-[#17B26A] font-semibold">Enabled</div>
          </div>
        </div>
        <div
          className="py-1 px-4 "
          onClick={() => router.push('/farm-detail-thunder')}
        >
          <p className="text-sm font-bold text-left w-[120px] ">Requirements</p>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">Minimum amount</div>
            <div>-</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">Minimum lock</div>
            <div>-</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">Locked until</div>
            <div>-</div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="text-xs text-lightGray">Whitelist</div>
            <div>-</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetailSp;
