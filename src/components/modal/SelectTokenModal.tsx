import SwapLeftIcon from '@/icons/SwapLeft';
import CommonModal from './CommonModal';
import SwapRightIcon from '@/icons/SwapRight';
import CloseIcon from '@/icons/CloseIcon';
import BNBICon from '@/icons/BNBIcon';
import { Button } from '../button/Button';
import ButtonStyle from '@/icons/ButtonStyle';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { LINEA_TESTNET_TOKENS_LIST } from '@/utils/constants';
import * as erc20TokenContract from '@/utils/erc20TokenContract';
import { nthPowerOf10 } from '@/utils/web3Helpers';
import Image from 'next/image';

export interface SelectTokenModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  selectValue: (value: any) => void;
}

const SelectTokenModal = ({
  toggleOpen,
  isOpen,
  selectValue,
}: SelectTokenModalProps) => {
  const { address: userAddress } = useAccount();
  const [search, setSearch] = useState<string>('');
  const [tokensList, setTokensList] = useState<any>(
    LINEA_TESTNET_TOKENS_LIST.map((e) => {
      return {
        ...e,
        address: e.address,
        symbol: e.symbol,
        name: e.name,
        curBalance: 0,
      };
    })
  );

  const fetchTokenBalances = async () => {
    if (!userAddress || !isOpen) return;
    const newTokensList = [];
    for (const token of tokensList) {
      const decimals: any = await erc20TokenContract.erc20Read(
        token.address,
        'decimals',
        []
      );
      const balance: any = await erc20TokenContract.erc20Read(
        token.address,
        'balanceOf',
        [userAddress]
      );
      newTokensList.push({
        ...token,
        curBalance: (
          BigInt(balance || '0') / nthPowerOf10(decimals)
        ).toString(),
      });
    }
    setTokensList(newTokensList);
  };

  useEffect(() => {
    fetchTokenBalances();
  }, [userAddress, isOpen]);

  const onSearchChange = (e: any) => {
    const text = e.target.value;
    setSearch(text);
    if (text) {
      setTokensList((prev: any) =>
        prev.filter(
          (item: any) =>
            item.symbol.includes(search) || item.name.includes(search)
        )
      );
    }
  };

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen}>
      <div className="flex items-center justify-between w-full mt-4 lg:mt-0">
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
        onChange={onSearchChange}
      />
      <div className="max-h-[450px] overflow-y-auto pr-3">
        <div className="text-[18px] font-semibold my-2">Common bases</div>
        <div className="flex flex-wrap ">
          {tokensList.slice(0, 8).map((item: any, index: number) => (
            <div
              className={`w-2/4 lg:w-1/4`}
              key={item.symbol}
              onClick={() => {
                selectValue(item);
                toggleOpen();
              }}
            >
              <div
                className={`flex gap-1 items-center hover:bg-[#1D2939] rounded-md px-1 py-2 w-[90px]  ${
                  index % 2 == 1 ? 'mr-0 ml-auto' : ''
                } lg:mr-0 lg:ml-0`}
                onClick={toggleOpen}
              >
                {item.logoURI ? (
                  <Image alt="logo" src={item.logoURI} width={25} height={25} />
                ) : (
                  <BNBICon />
                )}{' '}
                {item.symbol}
              </div>
            </div>
          ))}
        </div>
        <div className="text-[18px] font-semibold my-2">Tokens list</div>
        {tokensList.map((item: any) => (
          <div
            className="flex justify-between items-center my-2 hover:bg-[#1D2939] rounded-md px-1 py-2"
            key={item.symbol}
            onClick={() => {
              selectValue(item);
              toggleOpen();
            }}
          >
            <div className="flex items-center gap-2">
              {item.logoURI ? (
                <Image alt="logo" src={item.logoURI} width={25} height={25} />
              ) : (
                <BNBICon />
              )}

              <div>
                <div className="text-[14px]">{item.symbol}</div>
                <div className="text-[12px] text-[#475467]">{item.name}</div>
              </div>
            </div>
            <div className="text-[18px] pr-2">{item.curBalance}</div>
          </div>
        ))}
      </div>
      <Button
        onClick={toggleOpen}
        className="w-full justify-center mt-2 mb-2 px-[42px]"
        type="secondary"
      >
        Close
      </Button>
      <ButtonStyle />
    </CommonModal>
  );
};

export default SelectTokenModal;
