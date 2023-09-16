import Image from 'next/image';
import { Button } from '@/components/button/Button';
import AddIcon from '@/icons/AddIcon';
import BNBICon from '@/icons/BNBIcon';
import ClockIcon from '@/icons/ClockIcon';
import FileIcon from '@/icons/FileIcon';
import LiquidityLockIcon from '@/icons/LiquidityLockIcon';
// import QuestionIcon from '@/icons/QuestionIcon';
import TokenIcon from '@/icons/TokenIcon';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

interface PoolDetailStakedProps {
  token1Symbol: string;
  token2Symbol: string;
  token1Logo: string;
  token2Logo: string;
  listSpNfts: any[];
  toggleOpenCreatePosition: () => void;
}

const Staked: React.FC<PoolDetailStakedProps> = ({
  token1Symbol,
  token2Symbol,
  token1Logo,
  token2Logo,
  listSpNfts,
  toggleOpenCreatePosition,
}) => {
  const [harvestAllOff, setHarvestAllOff] = useState<boolean>(true);

  const handleHarvestAll = async () => {};

  return (
    <>
      <div className="flex justify-between mt-5">
        <div className="text-xl font-bold">spNFT Positions</div>
        <div className="flex gap-3 items-center">
          <Button
            className="px-2 h-[46px] w-[100%] order-2 md:order-3 mr-2 mb-2 md:mb-0 md:mr-0 md:w-[170px] flex justify-center text-base"
            onClick={handleHarvestAll}
            disabled={harvestAllOff}
          >
            <AddIcon color={harvestAllOff ? '#667085': '#0C111D'}/>
            Harvest All
          </Button>
          <Button className="px-2 h-[46px] w-[100%] order-2 md:order-3 mr-2 mb-2 md:mb-0 md:mr-0 md:w-[170px] flex justify-center  text-base"
            onClick={toggleOpenCreatePosition}
          >
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
            {listSpNfts.map((sp) => (
              <tr className="hover:bg-darkBlue cursor-pointer">
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-left">
                  <div className="relative">
                    <div className="absolute">
                      {token1Logo ? (
                        <Image
                          alt="logo"
                          src={token1Logo as any}
                          width={24}
                          height={24}
                          className="max-w-[unset]"
                        />
                      ) : (
                        <BNBICon size="24" />
                      )}
                    </div>
                    <div className="absolute left-[15px]">
                      {token2Logo ? (
                        <Image
                          alt="logo"
                          src={token2Logo as any}
                          width={24}
                          height={24}
                          className="max-w-[unset]"
                        />
                      ) : (
                        <BNBICon size="24" />
                      )}
                    </div>
                  </div>
                  <div className="ml-12">
                    <div>{token1Symbol} - {token2Symbol}</div>
                    <div className="text-secondary text-sm">#ID-{sp.tokenId}</div>
                  </div>
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
                  <div>&lt;$0.01</div>
                  <div className="text-secondary text-sm">{BigNumber(sp.pendingRewards).div(BigNumber(10).pow(18)).toString()} LP TOKEN</div>
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Staked;
