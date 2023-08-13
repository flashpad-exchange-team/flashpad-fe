import SwapLeftIcon from '@/icons/SwapLeft';
import CommonModal from './CommonModal';
import SwapRightIcon from '@/icons/SwapRight';
import CloseIcon from '@/icons/CloseIcon';
import BNBICon from '@/icons/BNBIcon';
import { Button } from '../button/Button';
import ButtonStyle from '@/icons/ButtonStyle';
import { useState } from 'react';

export interface SelectTokenModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  selectValue: (value: any) => void;
};

export const TOKENS_LIST = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0x1990BC6dfe2ef605Bfc08f5A23564dB75642Ad73',
  },
  {
    symbol: 'BUSD',
    name: 'Binance USD',
    address: '0x7d43AABC515C356145049227CeE54B608342c0ad',
  },
  {
    symbol: 'CHOKE',
    name: 'Choke',
    address: '0x7d43AABC515C356145049227CeE54B608342c0ad',
  },
  {
    symbol: 'DAI',
    name: 'DAI',
    address: '0x7d43AABC515C356145049227CeE54B608342c0ad',
  },
  {
    symbol: 'DMT',
    name: 'DMT',
    address: '0x7d43AABC515C356145049227CeE54B608342c0ad',
  },
  {
    symbol: 'DSQ',
    name: 'DSquared Governance Token',
    address: '0x7d43AABC515C356145049227CeE54B608342c0ad',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0xC5aB03962938Fa544D16F4667ED76788894fFca4',
  },
  {
    symbol: 'JONES',
    name: 'Jones DAO',
    address: '0x7d43AABC515C356145049227CeE54B608342c0ad',
  },
];

const SelectTokenModal = ({
  toggleOpen,
  isOpen,
  selectValue,
}: SelectTokenModalProps) => {
  const [search, setSearch] = useState<string>('');
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen}>
      <div className="flex items-center justify-between w-full">
        <div className="text-[24px] text-bold mx-auto ] w-fit flex items-center gap-3 justify-start ml-0 mr-auto">
          <SwapLeftIcon />
          Select a token
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>

      <input
        className="w-full bg-[#1D2939] h-[52px] pl-8 text-[15px] font-semibold mb-2 mt-3.5 rounded-md focus:outline-none"
        placeholder="Search by name or address "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="max-h-[450px] overflow-y-auto pr-3">
        <div className="text-[18px] font-semibold my-2">Common bases</div>
        <div className="flex flex-wrap">
          {['ETH', 'BNB', 'USDT', 'USDC', 'TRX', 'NEO', 'LINK', 'BTC'].map(
            (item) => (
              <div className="w-1/4" key={item}>
                <div
                  className="flex gap-1 items-center hover:bg-[#1D2939] rounded-md px-1 py-2 w-[90px]"
                  onClick={toggleOpen}
                >
                  <BNBICon /> {item}
                </div>
              </div>
            )
          )}
        </div>
        <div className="text-[18px] font-semibold my-2">Tokens list</div>
        {(search
          ? TOKENS_LIST.filter(
              (item) =>
                item.symbol.includes(search) || item.name.includes(search)
            )
          : TOKENS_LIST
        ).map((item) => (
          <div
            className="flex justify-between items-center my-2 hover:bg-[#1D2939] rounded-md px-1 py-2"
            key={item.symbol}
            onClick={() => {
              selectValue(item);
              toggleOpen();
            }}
          >
            <div className="flex items-center gap-2">
              <BNBICon />
              <div>
                <div className="text-[14px]">{item.symbol}</div>
                <div className="text-[12px] text-[#475467]">{item.name}</div>
              </div>
            </div>
            <div className="text-[18px] pr-2">0</div>
          </div>
        ))}
      </div>
      <Button
        onClick={toggleOpen}
        className="w-full justify-center mt-2 mb-2"
        type="secondary"
      >
        Close
      </Button>
      <ButtonStyle />
    </CommonModal>
  );
};

export default SelectTokenModal;
