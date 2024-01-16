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
import * as erc20TokenContract from '@/utils/contract/erc20TokenContract';
import { getBalance } from '@/utils/web3Helpers';
import Image from 'next/image';
import BigNumber from 'bignumber.js';
import InlineLoading from '../loading/InlineLoading';
import { getTokensList, importToken } from '@/api/tokens-list';
import { Tooltip } from 'react-tooltip';
import { formatUnits } from 'viem';

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
  const [newToken, setNewToken] = useState<any>({});
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [tokensList, setTokensList] = useState<IERC20TokenMetadata[]>(
    CHAINS_TOKENS_LIST.map((e) => {
      return {
        ...e,
        address: e.address,
        symbol: e.symbol,
        name: e.name,
        curBalance: 0,
        id: e.id,
        logo_uri: e.logo_uri,
      };
    })
  );
  const [tokensListFiltered, setTokensListFiltered] = useState(
    [] as IERC20TokenMetadata[]
  );

  const fetchTokenBalances = async (
    tokenListFromAPI: IERC20TokenMetadata[]
  ) => {
    if (!userAddress || !isOpen) return;

    const tokensListWithBalances: any[] = await Promise.all(
      tokenListFromAPI.map((token) => {
        return new Promise(async (resolve) => {
          try {
            const [decimals, balance] = await Promise.all([
              erc20TokenContract.erc20Read(token.address, 'decimals', []),
              token.symbol === 'ETH'
                ? await getBalance({ address: userAddress, blockTag: 'latest' })
                : await erc20TokenContract.erc20Read(
                    token.address,
                    'balanceOf',
                    [userAddress]
                  ),
            ]);

            resolve({
              ...token,
              curBalance:
                token.symbol === 'ETH'
                  ? formatUnits(balance, 18)
                  : formatUnits(balance, decimals),
            });
          } catch (error) {
            console.error(error);
            resolve({
              ...token,
              curBalance: '0',
            });
          }
        });
      })
    );

    setTokensList(tokensListWithBalances);
    setTokensListFiltered(tokensListWithBalances);
  };

  const fetchTokensList = async () => {
    const res = await getTokensList();
    fetchTokenBalances(res?.data);
  };
  useEffect(() => {
    setLoadingSearch(true);
    fetchTokensList();
    setLoadingSearch(false);
  }, [userAddress, isOpen]);

  const onSearchChange = async (e: any) => {
    const text = e.target.value;

    setSearch(text);

    if (text) {
      const lowercased = text.toLowerCase();
      const listAfterFilter = tokensList.filter(
        (item: any) =>
          item.symbol.toLowerCase().includes(lowercased) ||
          item.name.toLowerCase().includes(lowercased) ||
          item.address?.toLowerCase().includes(lowercased)
      );
      setTokensListFiltered(listAfterFilter);
      if (listAfterFilter.length === 0) {
        if (
          text.includes('0x') &&
          text.length === 42 &&
          !tokensList.some((item) => item.address === text)
        ) {
          setLoadingSearch(true);
          const tokenDecimals = (await erc20TokenContract.erc20Read(
            text,
            'decimals',
            []
          )) as bigint;
          const tokenSymbol = (await erc20TokenContract.erc20Read(
            text,
            'symbol',
            []
          )) as string;
          const tokenName = (await erc20TokenContract.erc20Read(
            text,
            'name',
            []
          )) as string;
          const [decimals, balance] = await Promise.all([
            erc20TokenContract.erc20Read(text, 'decimals', []),
            tokenSymbol === 'ETH'
              ? await getBalance({
                  address: userAddress as any,
                  blockTag: 'latest',
                })
              : await erc20TokenContract.erc20Read(text, 'balanceOf', [
                  userAddress,
                ]),
          ]);
          const curBalance =
            BigNumber(balance || '0')
              .div(BigNumber(10).pow(decimals))
              .toFixed(2) || '0.00';
          const newTokenToImport = {
            decimals: +tokenDecimals?.toString(),
            name: tokenName,
            symbol: tokenSymbol,
            address: text,
          };
          setNewToken({ ...newTokenToImport, curBalance });
          setTokensListFiltered([{ ...newTokenToImport, curBalance }]);
        } else setNewToken({});
        setLoadingSearch(false);
      } else setNewToken({});
    } else {
      setTokensListFiltered(tokensList);
    }
  };
  const handleImportToken = async () => {
    const newTokenToImport = {
      decimals: newToken.decimals,
      name: newToken.name,
      symbol: newToken.symbol,
      address: newToken.address,
    };
    await importToken(newTokenToImport);
    await getTokensList();
    fetchTokensList();
  };
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="550px">
      <div className="flex items-center justify-between w-full mt-4 lg:mt-0">
        <div className="text-2xl text-bold mx-auto ] w-fit flex items-center gap-3 justify-start ml-0 mr-auto">
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
        {search ? null : (
          <>
            {' '}
            <div className="text-lg font-semibold my-2">Common bases</div>
            <div className="flex flex-wrap ">
              {tokensList.slice(0, 8).map((item: any, index: number) => (
                <div
                  className={`w-2/4 lg:w-1/4`}
                  key={item.symbol}
                  onClick={() => {
                    if (selectValue) {
                      setSearch('');
                      selectValue(item);
                      setNewToken({});
                    }
                    toggleOpen();
                  }}
                >
                  <div
                    data-tooltip-id={`token${item?.id}`}
                    data-tooltip-html={`<span class="text-sm">${item?.address?.slice(
                      0,
                      6
                    )}...${item?.address?.slice(37, 42)}</span>`}
                  >
                    <div
                      className={`flex gap-1 items-center hover:bg-[#1D2939]  cursor-pointer rounded-md px-1 py-2 w-[90px]  ${
                        index % 2 == 1 ? 'mr-0 ml-auto' : ''
                      } lg:mr-0 lg:ml-0`}
                      onClick={toggleOpen}
                    >
                      {item.logo_uri ? (
                        <Image
                          alt="logo"
                          src={item.logo_uri}
                          width={25}
                          height={25}
                        />
                      ) : (
                        <BNBICon />
                      )}
                      {item.symbol}
                    </div>
                    <Tooltip id={`token${item?.id}`} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="text-lg font-semibold my-2">Tokens list</div>
        {loadingSearch ? (
          <div className="ml-2 mb-3">
            <InlineLoading />
          </div>
        ) : (
          <>
            {' '}
            {newToken?.name && (
              <div
                className="flex justify-between items-center my-2 hover:bg-[#1D2939] rounded-md px-1 py-2 cursor-pointer"
                key={newToken.symbol}
                onClick={async () => {
                  if (selectValue) {
                    await handleImportToken();
                    selectValue(newToken);
                    setNewToken({});
                    setSearch('');
                  }
                  toggleOpen();
                }}
              >
                <div className="flex items-center gap-2">
                  <BNBICon />
                  <div>
                    <div className="text-sm">{newToken.symbol}</div>
                    <div className="text-xs text-[#475467]">
                      {newToken.name}
                    </div>
                  </div>
                  <div className="text-white text-sm rounded-md px-2 ml-1 py-1 bg-[#323a4a]">
                    Import
                  </div>
                </div>
                <div className="text-sm md:text-lg pr-2 break-all pl-16 md:pl-0">
                  {newToken.curBalance !== 'NaN' ? newToken.curBalance : '0.00'}
                </div>
              </div>
            )}
            {!newToken.name
              ? tokensListFiltered
                  .sort((a: any, b: any) => b.curBalance - a.curBalance)
                  .map((item: any) => (
                    <div
                      className="flex justify-between items-center my-2 hover:bg-[#1D2939] rounded-md px-1 py-2  cursor-pointer"
                      key={item.id || 'New'}
                      onClick={() => {
                        if (selectValue) {
                          setSearch('');
                          setNewToken({});
                          selectValue(item);
                        }
                        toggleOpen();
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center gap-2"
                          data-tooltip-id={`token${item?.id}`}
                          data-tooltip-html={`<span class="text-sm">${item?.address?.slice(
                            0,
                            6
                          )}...${item?.address?.slice(37, 42)}</span>`}
                        >
                          {item.logo_uri ? (
                            <Image
                              alt="logo"
                              src={item.logo_uri}
                              width={25}
                              height={25}
                            />
                          ) : (
                            <BNBICon />
                          )}
                          <div>
                            <div className="text-sm">{item.symbol}</div>
                            <div className="text-xs text-[#475467]">
                              {item.name}
                            </div>
                          </div>
                          <Tooltip id={`token${item?.id}`} />
                        </div>
                      </div>
                      <div className="text-sm md:text-lg pr-2 break-all pl-16 md:pl-0">
                        {item.curBalance !== 'NaN' ? item.curBalance : '0.00'}
                      </div>
                    </div>
                  ))
              : null}
          </>
        )}
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
