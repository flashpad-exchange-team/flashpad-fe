import CopyableText from '@/components/copyableText/CopyableText';
import ArrowDown from '@/icons/ArrowDown';
import ArrowUp from '@/icons/ArrowUp';
import { ADDRESS_ZERO } from '@/utils/constants';
import * as routerContract from '@/utils/routerContract';
import { useEffect, useState } from 'react';

interface IPairTokenInfo {
  symbol?: string;
  address?: string;
  decimals?: number;
  amountIn: string;
}

interface LiquidityPairInfoProps {
  token1Data: IPairTokenInfo;
  token2Data: IPairTokenInfo;
  isFirstLP?: boolean;
}

const LiquidityPairInfo = ({
  isFirstLP,
  token1Data,
  token2Data,
}: LiquidityPairInfoProps) => {
  // const {
  //   address: token1Address,
  //   symbol: token1Symbol,
  //   // decimals: token1Decimals,
  //   // amountIn: token1AmountIn,
  // } = token1Data;
  // const {
  //   address: token2Address,
  //   symbol: token2Symbol,
  //   // decimals: token2Decimals,
  //   // amountIn: token2AmountIn,
  // } = token2Data;

  const token1Address = token1Data?.address;
  const token1Symbol = token1Data?.symbol;
  const token2Address = token2Data?.address;
  const token2Symbol = token2Data?.symbol;

  const [lpAddress, setLPAddress] = useState(ADDRESS_ZERO);
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!open);

  // const [token1Reserve, setToken1Reserve] = useState('');
  // const [token2Reserve, setToken2Reserve] = useState('');

  const getPairLPAddress = async () => {
    if (!token1Address || !token2Address) return;
    const address = await routerContract.getPair(token1Address, token2Address);
    setLPAddress(address || ADDRESS_ZERO);
  };

  useEffect(() => {
    getPairLPAddress();
  }, [token1Address, token2Address]);

  return (
    <div
      className={`bg-[#150E3980] rounded-lg my-2 p-4 ${
        token1Address && token2Address ? '' : 'hidden'
      }`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleOpen}
      >
        <div>
          <div className="text-[14px] ">
            1 {token1Symbol} = 1.027,689 {token2Symbol}{' '}
            <span className="text-[#344054] ml-2">($1.8833,82)</span>
          </div>
          <div className="text-[14px] ">
            1 {token2Symbol} = 0,001 {token1Symbol}{' '}
            <span className="text-[#344054] ml-2">($1,91)</span>
          </div>
        </div>
        <div>{open ? <ArrowUp /> : <ArrowDown />}</div>
      </div>
      {open && (
        <>
          <div className="h-[1px] w-full bg-[#1D2939] my-2"></div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[14px] mt-0 ">Pair Type</div>
              <div className="text-[14px] mt-1.5 ">
                {token1Symbol} Swap rate
              </div>
              <div className="text-[14px] mt-1.5 ">
                {token2Symbol} Swap rate
              </div>
              <div className="text-[14px] mt-1.5 ">
                {token1Symbol}/{token2Symbol} Liquidity ratio
              </div>
              <div className="text-[14px] mt-1.5 ">Pool share</div>
              <div className="text-[14px] mt-1.5 ">LP address</div>
            </div>
            <div>
              <div className="text-[14px] mt-0 text-right text-[#FFAF1D] ">
                Volatile
              </div>
              <div className="text-[14px] mt-1.5 text-right ">
                {isFirstLP ? 0 : '0.0000882ETH'}
              </div>
              <div className="text-[14px] mt-1.5 text-right ">
                {isFirstLP ? 0 : '0.0000882ETH'}
              </div>
              <div className="text-[14px] mt-1.5 text-right ">
                {isFirstLP ? 0 : 0.0000882}
              </div>
              <div className="text-[14px] mt-1.5 text-right ">
                {isFirstLP ? '100%' : '<0.0000881%'}
              </div>
              <div className="text-[14px] mt-1.5 text-right ">
                <CopyableText text={lpAddress} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LiquidityPairInfo;
