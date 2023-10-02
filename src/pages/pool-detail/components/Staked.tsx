import { Button } from '@/components/button/Button';
import AddIcon from '@/icons/AddIcon';
import BNBICon from '@/icons/BNBIcon';
import ClockIcon from '@/icons/ClockIcon';
import FileIcon from '@/icons/FileIcon';
import Image from 'next/image';
import AddToPositionIcon from '@/icons/StakeIcons/AddToPositionIcon';
import BoostPositionIcon from '@/icons/StakeIcons/BoostPositionIcon';
import HarvestIcon from '@/icons/StakeIcons/HarvestIcon';
import LockPositionIcon from '@/icons/StakeIcons/LockPositionIcon';
import WithdrawPositionIcon from '@/icons/StakeIcons/WithdrawPositionIcon';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import * as web3Helpers from '@/utils/web3Helpers';

interface PoolDetailStakedProps {
  token1Symbol: string;
  token2Symbol: string;
  token1Logo: string;
  token2Logo: string;
  listSpNfts: any[];
  isFirstSpMinter: boolean;
  toggleOpenCreatePosition: () => void;
  toggleAddToPosition: () => void;
  toggleHarvestPosition: () => void;
  toggleWithdrawPosition: () => void;
  toggleLockPosition: () => void;
  toggleBoostPosition: () => void;
  togglePoolInfo: () => void;
  setSpNFTTokenId: (id: string | null) => void;
}

const Staked: React.FC<PoolDetailStakedProps> = ({
  token1Symbol,
  token2Symbol,
  token1Logo,
  token2Logo,
  listSpNfts,
  isFirstSpMinter,
  toggleOpenCreatePosition,
  toggleAddToPosition,
  toggleHarvestPosition,
  toggleWithdrawPosition,
  toggleLockPosition,
  toggleBoostPosition,
  togglePoolInfo,
  setSpNFTTokenId,
}) => {
  const [harvestAllOff, setHarvestAllOff] = useState<boolean>(true);
  const [currentTimestamp, setCurrentTimestamp] = useState(0);

  const handleHarvestAll = async () => {
    setHarvestAllOff(true);
  };

  useEffect(() => {
    const fetchTimeStamp = async () => {
      const { timestamp } = await web3Helpers.getBlock();
      console.log({ timestamp });
      setCurrentTimestamp(timestamp.toString());
    };
    fetchTimeStamp();
  }, []);

  return (
    <>
      <div className="flex justify-between mt-5">
        <div className="text-xl font-bold">
          spNFT Positions {currentTimestamp}
        </div>
        <div className="flex gap-3 items-center">
          <Button
            className="px-2 h-[46px] w-[100%] order-2 md:order-3 mr-2 mb-2 md:mb-0 md:mr-0 md:w-[170px] flex justify-center text-base"
            onClick={handleHarvestAll}
            disabled={harvestAllOff}
          >
            <AddIcon color={harvestAllOff ? '#667085' : '#0C111D'} />
            Harvest All
          </Button>
          <Button
            className="px-2 h-[46px] w-[100%] order-2 md:order-3 mr-2 mb-2 md:mb-0 md:mr-0 md:w-[170px] flex justify-center  text-base"
            onClick={toggleOpenCreatePosition}
          >
            <AddIcon color="#0C111D" />
            {isFirstSpMinter ? 'Initialize' : 'New Position'}
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
                <td
                  className="py-4 text-sm px-4 border-b border-[#344054] text-left"
                  onClick={() => {
                    setSpNFTTokenId(sp?.tokenId + '');
                    togglePoolInfo();
                  }}
                >
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
                    <div>
                      {token1Symbol} - {token2Symbol}
                    </div>
                    <div className="text-secondary text-sm">
                      #ID-{sp?.tokenId + ''}
                    </div>
                  </div>
                </td>
                <td
                  className="py-4 text-sm px-4 border-b border-[#344054] text-right relative"
                  onClick={() => {
                    setSpNFTTokenId(sp?.tokenId + '');
                    togglePoolInfo();
                  }}
                >
                  {new BigNumber(sp?.stakingPosition?.amount || 0)
                    .div(new BigNumber(10).pow(18))
                    .toString(10)}
                </td>
                <td
                  className="py-4 text-sm px-4 border-b border-[#344054] text-center"
                  onClick={() => {
                    setSpNFTTokenId(sp?.tokenId + '');
                    togglePoolInfo();
                  }}
                >
                  1.48%
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-center">
                  <div className="flex items-center gap-2 cursor-pointer justify-center">
                    <ClockIcon />
                    <LockPositionIcon
                      lockDays={
                        (+sp?.stakingPosition?.startLockTime.toString() +
                          +sp?.stakingPosition?.lockDuration.toString() -
                          +currentTimestamp) *
                        1000
                      }
                    />
                    <FileIcon />
                    <BoostPositionIcon
                      active={sp?.stakingPosition?.boostPoints > 0}
                      amount={new BigNumber(
                        sp?.stakingPosition?.boostPoints || 0
                      )
                        .div(new BigNumber(10).pow(18))
                        .toString(10)}
                    />
                  </div>
                </td>
                <td
                  className="py-4 text-sm px-4 border-b border-[#344054] text-left"
                  onClick={() => {
                    setSpNFTTokenId(sp?.tokenId + '');
                    togglePoolInfo();
                  }}
                >
                  <div>{sp?.pendingRewards}</div>

                  {/* <div className="text-secondary text-sm">
                    {BigNumber(sp.pendingRewards)
                      .div(BigNumber(10).pow(18))
                      .toString()}{' '}
                    LP TOKEN
                  </div> */}
                </td>
                <td className="py-4 text-sm px-4 border-b border-[#344054] text-right">
                  <div className="flex items-center gap-2 cursor-pointer justify-center">
                    <AddToPositionIcon
                      message="Add to position"
                      onClick={() => {
                        setSpNFTTokenId(sp?.tokenId + '');
                        toggleAddToPosition();
                      }}
                    />
                    <WithdrawPositionIcon
                      message="Withdraw position"
                      onClick={() => {
                        setSpNFTTokenId(sp?.tokenId + '');
                        toggleWithdrawPosition();
                      }}
                    />
                    <HarvestIcon
                      message="Harvest position"
                      onClick={() => {
                        setSpNFTTokenId(sp?.tokenId + '');
                        toggleHarvestPosition();
                      }}
                    />
                    <LockPositionIcon
                      lockDays={
                        (+sp?.stakingPosition?.startLockTime.toString() +
                          +sp?.stakingPosition?.lockDuration.toString() -
                          +currentTimestamp) *
                        1000
                      }
                      onClick={() => {
                        setSpNFTTokenId(sp?.tokenId + '');
                        toggleLockPosition();
                      }}
                    />
                    <BoostPositionIcon
                      active={sp?.stakingPosition?.boostPoints > 0}
                      amount={new BigNumber(
                        sp?.stakingPosition?.boostPoints || 0
                      )
                        .div(new BigNumber(10).pow(18))
                        .toString(10)}
                      onClick={() => {
                        setSpNFTTokenId(sp?.tokenId + '');
                        toggleBoostPosition();
                      }}
                    />
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
