import CopyableText from '@/components/copyableText/CopyableText';
import ArrowDown from '@/icons/ArrowDown';
import ArrowUp from '@/icons/ArrowUp';
import { useState } from 'react';

interface IPairTokenInfo {
  symbol?: string;
  address?: string;
  decimals?: number;
  amountIn: string;
}

interface LiquidityPairInfoProps {
  token1Data: IPairTokenInfo;
  token2Data: IPairTokenInfo;
  rate: number;
}
const LiquidityPairInfo = ({
  token1Data,
  token2Data,
  rate,
}: LiquidityPairInfoProps) => {
  // const token1Address = token1Data?.address;
  const token1Symbol = token1Data?.symbol;
  // const token2Address = token2Data?.address;
  const token2Symbol = token2Data?.symbol;
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!open);
  return token1Data?.symbol && token2Data?.symbol ? (
    <div className="bg-[#150E3980] rounded-lg my-2 p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleOpen}
      >
        <div>
          <div className="text-[14px] ">
            1 {token1Symbol} = {rate} {token2Symbol}{' '}
            <span className="text-[#344054] ml-2">($1.8833,82)</span>
          </div>
          <div className="text-[14px] ">
            1 {token2Symbol} = {rate ? 1 / rate : 1} {token1Symbol}{' '}
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
              <div className="text-[14px] mt-1.5 ">ETH Swap rate</div>
              <div className="text-[14px] mt-1.5 ">AI DOGE Swap rate</div>
              <div className="text-[14px] mt-1.5 ">
                ETH/AI DOGE Liquidity ratio
              </div>
              <div className="text-[14px] mt-1.5 ">Pool share</div>
              <div className="text-[14px] mt-1.5 ">LP address</div>
            </div>
            <div>
              <div className="text-[14px] mt-0 text-right text-[#FFAF1D] ">
                Volatile
              </div>
              <div className="text-[14px] mt-1.5 text-right ">0.0000882ETH</div>
              <div className="text-[14px] mt-1.5 text-right ">0.0000882ETH</div>
              <div className="text-[14px] mt-1.5 text-right ">0.0000882</div>
              <div className="text-[14px] mt-1.5 text-right ">
                &lt;0.0000881%
              </div>
              <div className="text-[14px] mt-1.5 text-right ">
                <CopyableText text="0x53346...34553" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  ) : null;
};

export default LiquidityPairInfo;
