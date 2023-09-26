import { Button } from '@/components/button/Button';
import AddIcon from '@/icons/AddIcon';
import UploadIcon from '@/icons/UploadIcon';
import TableStaking from './TableStaking';
import SelectTokenModal from '@/components/modal/SelectTokenModal';
import { useState } from 'react';
import Search from '@/icons/Search';

const data = [
  {
    tvl: '482.85',
    incentivesToken: 'Token',
    incentivesLogo:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token1: 'BNB',
    token2: 'FUSDC',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    apr: '0,7748',
    totalDeposit: '0',
    pendingRewards: '0',
  },

  {
    tvl: '482.85',
    incentivesToken: 'Token',
    incentivesLogo:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token1: 'NEO',
    token2: 'UNI',
    token1Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
    token2Logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    apr: '0,7748',
    totalDeposit: '0',
    pendingRewards: '0',
  },
];
const PositionsMain = () => {
  const [isOpenSelectToken, setOpenSelectToken] = useState<boolean>(false);
  const [isOpenCreatePosition, setOpenCreatePosition] =
    useState<boolean>(false);

  const toggleOpenSelectToken = () => setOpenSelectToken(!isOpenSelectToken);
  const toggleOpenCreatePosition = () => {
    setOpenCreatePosition(!isOpenCreatePosition);
  };

  return (
    <>
      {/* <CreatePositionModal
        isOpen={isOpenCreatePosition}
        toggleOpen={toggleOpenCreatePosition}
      /> */}
      <SelectTokenModal
        isOpen={isOpenSelectToken}
        toggleOpen={toggleOpenSelectToken}
      />
      <div className="max-w-[1096px] w-full mx-auto my-20 px-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-bold text-lg">Position (Staking) </div>
            <div className="text-sm text-[#98A2B3] mt-1 mb-3 font-semibold">
              Create and manage all your staking positions.
            </div>
          </div>
          <div className="flex gap-3 items-center"></div>
        </div>

        <div className="min-w-full bg-dark pb-3">
          <div className="px-4 py-6">LP V2</div>
          <div className="flex items-center gap-3">
            <div className="w-full w-[300px] flex">
              <div className="w-[70px] bg-[#150E39] flex items-center justify-center rounded-tl-lg rounded-bl-lg">
                <Search />
              </div>
              <input
                className="w-full w-[300px] bg-[#150E39] h-[52px] text-[15px] font-semibold rounded-tr-lg rounded-br-lg focus:outline-none  placeholder-[#667085] w-full"
                placeholder="Search by name or address"
              />
            </div>
            <Button
              className="px-2 h-[52px] w-[280px] flex justify-center "
              onClick={toggleOpenSelectToken}
            >
              <UploadIcon />
              Import Liquidity
            </Button>
            <Button
              className="px-3 h-[52px] w-[270px] flex justify-center "
              onClick={toggleOpenCreatePosition}
            >
              <AddIcon color="#0C111D" />
              New Position
            </Button>
          </div>
        </div>
        <TableStaking data={data} />
      </div>
    </>
  );
};
export default PositionsMain;