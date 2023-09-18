import InlineLoading from '@/components/loading/InlineLoading';
import AnimatedNumber from '@/components/number/AnimatedNumber';
import ArrowDown from '@/icons/ArrowDown';
import ArrowUp from '@/icons/ArrowUp';
import { useState } from 'react';
import { useAccount } from 'wagmi';

interface IPairTokenInfo {
  symbol?: string;
  address?: string;
  decimals?: number;
  amountIn: string;
}

interface LiquidityPairInfoProps {
  token1Data: IPairTokenInfo;
  token2Data: IPairTokenInfo;
  isStableSwap?: boolean;
  swapRate1To2: string;
  swapRate2To1: string;
  isFetchingRate: boolean;
}
const LiquidityPairInfo = ({
  token1Data,
  token2Data,
  isStableSwap,
  swapRate1To2,
  swapRate2To1,
  isFetchingRate,
}: LiquidityPairInfoProps) => {
  const token1Symbol = token1Data?.symbol;
  const token2Symbol = token2Data?.symbol;
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!open);
  const { address: userAddress } = useAccount();

  return token1Data?.symbol && token2Data?.symbol && userAddress ? (
    <div className="bg-darkBlue rounded-lg my-2 p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleOpen}
      >
        {isFetchingRate ? (
          <InlineLoading message="Fetching swap rate" className="mb-2" />
        ) : (
          <div>
            <div className="text-sm ">
              1 {token1Symbol} = <AnimatedNumber value={swapRate1To2} />
              {token2Symbol}
            </div>
            <div className="text-sm ">
              1 {token2Symbol} = <AnimatedNumber value={swapRate2To1} />
              {token1Symbol}
            </div>
          </div>
        )}

        <div>{open ? <ArrowUp /> : <ArrowDown />}</div>
      </div>
      {open && (
        <>
          <div className="h-[1px] w-full bg-[#1D2939] my-2"></div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm mt-0 ">Pair Type</div>
              <div className="text-sm mt-1.5 ">{token1Symbol} Swap rate</div>
              <div className="text-sm mt-1.5 ">{token2Symbol} Swap rate</div>
            </div>
            <div>
              <div className="text-sm mt-0 text-right text-primary ">
                {isStableSwap ? 'Stable' : 'Volatile'}
              </div>
              <div className="text-sm mt-1.5 text-right ">
                <AnimatedNumber value={swapRate1To2} />
                {/* {swapRate1To2}  */}
                {token2Symbol}
              </div>
              <div className="text-sm mt-1.5 text-right ">
                <AnimatedNumber value={swapRate2To1} />
                {token1Symbol}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  ) : null;
};

export default LiquidityPairInfo;
