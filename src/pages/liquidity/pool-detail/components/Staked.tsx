import { Button } from '@/components/button/Button';
import AddIcon from '@/icons/AddIcon';
import BNBICon from '@/icons/BNBIcon';
import ClockIcon from '@/icons/ClockIcon';
import FileIcon from '@/icons/FileIcon';
import LiquidityLockIcon from '@/icons/LiquidityLockIcon';
import TokenIcon from '@/icons/TokenIcon';

const Staked = () => {
  return (
    <>
      <div className="flex justify-between mt-5">
        <div className="text-xl font-bold">spNFT Positions</div>
        <div className="flex gap-3 items-center">
          <Button
            className="px-2 h-[46px] w-[100%] order-2 md:order-3 mr-2 mb-2 md:mb-0 md:mr-0 md:w-[170px] flex justify-center text-base"
            disabled
          >
            <AddIcon color="#667085" />
            Harvest All
          </Button>
          <Button className="px-2 h-[46px] w-[100%] order-2 md:order-3 mr-2 mb-2 md:mb-0 md:mr-0 md:w-[170px] flex justify-center  text-base">
            <AddIcon color="#0C111D" />
            New Position
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-dark ">
          <thead>
            <tr>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
                Pool
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-right">
                Deposits
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-center">
                APR
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-center">
                Properties
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-left">
                Pending rewards
              </th>
              <th className="text-xs py-3 px-4 border-b border-[#344054] text-right"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-darkBlue cursor-pointer">
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                <div className="relative">
                  <div className="absolute">
                    <BNBICon />
                  </div>
                  <div className="absolute left-[15px]">
                    <BNBICon />
                  </div>
                </div>
                <div className="ml-12">Token A - Token B</div>
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-right relative">
                0.03
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-center">
                1.48%
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-center">
                <div className="flex items-center gap-2 cursor-pointer justify-center">
                  <ClockIcon />
                  <TokenIcon />
                  <FileIcon />
                  <LiquidityLockIcon />
                </div>
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                <div>&lt;0.01</div>
                <div className="text-secondary text-sm">&lt;0.001 TOKEN</div>
              </td>
              <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                <div className="flex items-center gap-2 cursor-pointer justify-center">
                  <ClockIcon />
                  <TokenIcon />
                  <FileIcon />
                  <LiquidityLockIcon />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Staked;
