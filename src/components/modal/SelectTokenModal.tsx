import SwapLeftIcon from '@/icons/SwapLeft';
import CommonModal from './CommonModal';
import SwapRightIcon from '@/icons/SwapRight';
import CloseIcon from '@/icons/CloseIcon';
import BNBICon from '@/icons/BNBIcon';
import { Button } from '../button/Button';
import DividerDown from '@/icons/DividerDown';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { CHAINS_TOKENS_LIST, IERC20TokenMetadata } from '@/utils/constants';
import * as erc20TokenContract from '@/utils/erc20TokenContract';
import { getBalance } from '@/utils/web3Helpers';
import Image from 'next/image';
import BigNumber from 'bignumber.js';

export interface SelectTokenModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  selectValue?: (value: any) => void;
}

const SelectTokenModal = ({
  toggleOpen,
  isOpen,
  selectValue,
}: SelectTokenModalProps) => {
  const { address: userAddress } = useAccount();
  const [search, setSearch] = useState<string>('');
  const [tokensList, setTokensList] = useState<IERC20TokenMetadata[]>(
    CHAINS_TOKENS_LIST.map((e) => {
      return {
        ...e,
        address: e.address,
        symbol: e.symbol,
        name: e.name,
        curBalance: 0,
      };
    })
  );
  const [tokensListFiltered, setTokensListFiltered] = useState(tokensList);

  const fetchTokenBalances = async () => {
    if (!userAddress || !isOpen) return;
    const tokensListWithBalances = [];
    for (const token of tokensList) {
      const decimals: any = await erc20TokenContract.erc20Read(
        token.address,
        'decimals',
        []
      );
      const balance: any =
        token.symbol === 'ETH'
          ? await getBalance({ address: userAddress, blockTag: 'latest' })
          : await erc20TokenContract.erc20Read(token.address, 'balanceOf', [
              userAddress,
            ]);
      tokensListWithBalances.push({
        ...token,
        curBalance: BigNumber(balance || '0')
          .div(BigNumber(10).pow(decimals))
          .toFixed(2),
      });
    }
    setTokensList(tokensListWithBalances);
    setTokensListFiltered(tokensListWithBalances);
  };

  useEffect(() => {
    fetchTokenBalances();
  }, [userAddress, isOpen]);

  const onSearchChange = (e: any) => {
    const text = e.target.value;
    setSearch(text);
    if (text) {
      setTokensListFiltered(
        tokensList.filter(
          (item: any) => item.symbol.includes(text) || item.name.includes(text)
        )
      );
    } else {
      setTokensListFiltered(tokensList);
    }
  };

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="550px">
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
        className="w-full bg-[#1D2939] h-[52px] pl-8 text-[15px] font-semibold mb-2 mt-3.5 rounded-md focus:outline-none placeholder-[#667085]"
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
                if (selectValue) selectValue(item);
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
        {tokensListFiltered.map((item: any) => (
          <div
            className="flex justify-between items-center my-2 hover:bg-[#1D2939] rounded-md px-1 py-2"
            key={item.symbol}
            onClick={() => {
              if (selectValue) selectValue(item);
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
      <DividerDown />
    </CommonModal>
  );
};

export default SelectTokenModal;
