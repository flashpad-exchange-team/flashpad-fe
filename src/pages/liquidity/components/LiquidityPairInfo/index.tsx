import CopyableText from '@/components/copyableText/CopyableText';
import ArrowDown from '@/icons/ArrowDown';
import ArrowUp from '@/icons/ArrowUp';
import { ADDRESS_ZERO } from '@/utils/constants';
import { useEffect, useState } from 'react';
import * as routerContract from '@/utils/routerContract';
import * as pairContract from '@/utils/pairContract';
import { useContractRead } from 'wagmi';
import { Address } from 'viem';
import { abi as ArthurPairABI } from '@/resources/abis/ArthurPair.json';
import BigNumber from 'bignumber.js';

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
  const token1Address = token1Data?.address;
  const token1Symbol = token1Data?.symbol;
  const token2Address = token2Data?.address;
  const token2Symbol = token2Data?.symbol;
  const token1Decimals = token1Data?.decimals;
  const token2Decimals = token2Data?.decimals;

  const [open, setOpen] = useState<boolean>(false);
  const [lpAddress, setLPAddress] = useState<Address>(ADDRESS_ZERO);
  const [isStableSwap, setIsStableSwap] = useState(false);

  const [swapRate1To2, setSwapRate1To2] = useState('-');
  const [swapRate2To1, setSwapRate2To1] = useState('-');

  const toggleOpen = () => setOpen(!open);

  const { data: reserves } = useContractRead({
    address: lpAddress != ADDRESS_ZERO ? lpAddress : undefined,
    abi: ArthurPairABI,
    functionName: 'getReserves',
  });

  const { data: token1 } = useContractRead({
    address: lpAddress != ADDRESS_ZERO ? lpAddress : undefined,
    abi: ArthurPairABI,
    functionName: 'token0',
  });

  let ratioToken1Token2 = '0';
  let ratioToken2Token1 = '0';
  if (reserves) {
    const reserve1 = BigNumber((reserves as any)[0]);
    const reserve2 = BigNumber((reserves as any)[1]);
    if (token1 == token1Address) {
      ratioToken1Token2 = reserve2.div(reserve1).toString();
      ratioToken2Token1 = reserve1.div(reserve2).toString();
    } else {
      ratioToken1Token2 = reserve1.div(reserve2).toString();
      ratioToken2Token1 = reserve2.div(reserve1).toString();
    }
  }

  const getPairLPAddress = async () => {
    if (!token1Address || !token2Address) return;
    const address = await routerContract.getPair(token1Address, token2Address);
    setLPAddress(address || ADDRESS_ZERO);
    if (address && address != ADDRESS_ZERO) {
      const stableSwap = await pairContract.read(address, 'stableSwap', []);
      setIsStableSwap(!!stableSwap);
      
      const amount1In = BigNumber(10).pow(BigNumber(token1Decimals!));
      const amount2In = BigNumber(10).pow(BigNumber(token2Decimals!));

      const amount2Out = await pairContract.read(address, 'getAmountOut', [
        amount1In,
        token1Address,
      ]);
      setSwapRate1To2(
        BigNumber(amount2Out)
          .div(amount2In)
          .toFixed(token2Decimals!)
      );

      const amount1Out = await pairContract.read(address, 'getAmountOut', [
        amount2In,
        token2Address,
      ]);
      setSwapRate2To1(
        BigNumber(amount1Out)
          .div(amount1In)
          .toFixed(token1Decimals!)
      );
    }
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
            1 {token1Symbol} = {ratioToken1Token2} {token2Symbol}{' '}
            {/* <span className="text-[#344054] ml-2">($1.8833,82)</span> */}
          </div>
          <div className="text-[14px] ">
            1 {token2Symbol} = {ratioToken2Token1} {token1Symbol}{' '}
            {/* <span className="text-[#344054] ml-2">($1,91)</span> */}
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
              <div className="text-[14px] mt-1.5 ">
                {token2Symbol}/{token1Symbol} Liquidity ratio
              </div>
              <div className="text-[14px] mt-1.5 ">Pool share</div>
              <div className="text-[14px] mt-1.5 ">LP address</div>
            </div>
            <div>
              <div className="text-[14px] mt-0 text-right text-[#FFAF1D] ">
                {isStableSwap ? 'Stable' : 'Volatile'}
              </div>
              <div className="text-[14px] mt-1.5 text-right ">
                {isFirstLP ? 0 : swapRate1To2}
              </div>
              <div className="text-[14px] mt-1.5 text-right ">
                {isFirstLP ? 0 : swapRate2To1}
              </div>
              <div className="text-[14px] mt-1.5 text-right ">
                {isFirstLP ? 0 : ratioToken1Token2}
              </div>
              <div className="text-[14px] mt-1.5 text-right ">
                {isFirstLP ? 0 : ratioToken2Token1}
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
