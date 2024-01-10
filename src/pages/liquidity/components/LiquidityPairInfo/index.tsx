import CopyableText from '@/components/copyableText/CopyableText';
import ArrowDown from '@/icons/ArrowDown';
import ArrowUp from '@/icons/ArrowUp';
import { ADDRESS_ZERO } from '@/utils/constants';
import { useEffect, useState } from 'react';
import * as routerContract from '@/utils/contract/routerContract';
import * as pairContract from '@/utils/contract/pairContract';
import { useAccount } from 'wagmi';
import { Address } from 'viem';
import BigNumber from 'bignumber.js';
import InlineLoading from '@/components/loading/InlineLoading';
import AnimatedNumber from '@/components/number/AnimatedNumber';

interface IPairTokenInfo {
  symbol?: string;
  address?: Address;
  decimals?: number;
}

interface LiquidityPairInfoProps {
  token1Data: IPairTokenInfo;
  token2Data: IPairTokenInfo;
  token1Amount: string;
  token2Amount: string;
  isFirstLP?: boolean;
  isSpNFT: boolean;
  reserves: any;
  pairToken1?: Address;
  nftPoolAddress?: Address;
}

const LiquidityPairInfo = ({
  isFirstLP,
  isSpNFT,
  token1Data,
  token2Data,
  token1Amount,
  token2Amount,
  reserves,
  pairToken1,
  nftPoolAddress,
}: LiquidityPairInfoProps) => {
  const token1Address = token1Data?.address;
  const token1Symbol = token1Data?.symbol;
  const token2Address = token2Data?.address;
  const token2Symbol = token2Data?.symbol;
  const token1Decimals = token1Data?.decimals;
  const token2Decimals = token2Data?.decimals;
  const [isFetchingRate, setIsFetchingRate] = useState<boolean>(false);

  const { address: userAddress } = useAccount();

  const [open, setOpen] = useState<boolean>(false);
  const [lpAddress, setLPAddress] = useState<Address>(ADDRESS_ZERO);

  const [isStableSwap, setIsStableSwap] = useState(false);

  const [swapRate1To2, setSwapRate1To2] = useState('-');
  const [swapRate2To1, setSwapRate2To1] = useState('-');

  const [poolShare, setPoolShare] = useState('');

  const toggleOpen = () => setOpen(!open);

  let ratioToken1Token2 = '0';
  let ratioToken2Token1 = '0';
  if (reserves) {
    const reserve1 = BigNumber(reserves[0]);
    const reserve2 = BigNumber(reserves[1]);
    if (pairToken1?.toLowerCase() === token1Address?.toLowerCase()) {
      const reserve1Formatted = reserve1.div(
        BigNumber(10).pow(token1Decimals!)
      );
      const reserve2Formatted = reserve2.div(
        BigNumber(10).pow(token2Decimals!)
      );
      ratioToken1Token2 = reserve2Formatted.div(reserve1Formatted).toString();
      ratioToken2Token1 = reserve1Formatted.div(reserve2Formatted).toString();
    } else {
      const reserve1Formatted = reserve2.div(
        BigNumber(10).pow(token1Decimals!)
      );
      const reserve2Formatted = reserve1.div(
        BigNumber(10).pow(token2Decimals!)
      );
      ratioToken1Token2 = reserve2Formatted.div(reserve1Formatted).toString();
      ratioToken2Token1 = reserve1Formatted.div(reserve2Formatted).toString();
    }
  } else {
    ratioToken1Token2 = BigNumber(token2Amount).div(token1Amount).toString();
    ratioToken2Token1 = BigNumber(token1Amount).div(token2Amount).toString();
  }

  const getLPInfo = async () => {
    setIsFetchingRate(true);
    if (!token1Address || !token2Address) return;
    const address = await routerContract.getPair(token1Address, token2Address);
    setLPAddress(address || ADDRESS_ZERO);

    if (address && isFirstLP === false) {
      const stableSwap = await pairContract.read(address, 'stableSwap', []);
      setIsStableSwap(!!stableSwap);

      const amount1In = BigNumber(10).pow(BigNumber(token1Decimals!));
      const amount2In = BigNumber(10).pow(BigNumber(token2Decimals!));

      const amount2Out = await pairContract.read(address, 'getAmountOut', [
        amount1In,
        token1Address,
      ]);

      setSwapRate1To2(
        BigNumber(amount2Out).div(amount2In).toFixed(token2Decimals!)
      );

      const amount1Out = await pairContract.read(address, 'getAmountOut', [
        amount2In,
        token2Address,
      ]);
      setSwapRate2To1(
        BigNumber(amount1Out).div(amount1In).toFixed(token1Decimals!)
      );

      const userLpBalance = await pairContract.read(address, 'balanceOf', [
        userAddress,
      ]);
      const totalSupply = await pairContract.read(address, 'totalSupply', []);

      setPoolShare(
        BigNumber(userLpBalance)
          .div(BigNumber(totalSupply))
          .times(100)
          .toFixed(8)
      );
    }
    setIsFetchingRate(false);
  };

  useEffect(() => {
    getLPInfo();
  }, [token1Address, token2Address, isFirstLP, userAddress]);

  return (
    <div
      className={`bg-darkBlue rounded-lg my-2 p-4 px-2 md:px-4 ${
        token1Address && token2Address ? '' : 'hidden'
      }`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleOpen}
      >
        {isFetchingRate ? (
          <InlineLoading message="Fetching liquidity ratio" className="mb-2" />
        ) : (
          <div>
            <div className="text-xs md:text-sm ">
              1 {token1Symbol} = <AnimatedNumber value={ratioToken1Token2} />
              {token2Symbol}
            </div>
            <div className="text-xs md:text-sm ">
              1 {token2Symbol} = <AnimatedNumber value={ratioToken2Token1} />
              {token1Symbol}
            </div>
          </div>
        )}

        <div>{open ? <ArrowUp /> : <ArrowDown />}</div>
      </div>
      {open && (
        <>
          <div className="h-[1px] w-full bg-[#1D2939] my-2"></div>
          <div className="flex items-center justify-between break-all">
            <div>
              <div className="text-xs md:text-sm h-[36px] md:h-auto mt-0 ">
                Pair Type
              </div>
              {isFirstLP === false && (
                <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 ">
                  {token1Symbol} Swap rate
                </div>
              )}
              {isFirstLP === false && (
                <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 ">
                  {token2Symbol} Swap rate
                </div>
              )}
              <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 ">
                {token1Symbol}/{token2Symbol} Liquidity ratio
              </div>
              <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 ">
                {token2Symbol}/{token1Symbol} Liquidity ratio
              </div>
              <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 ">
                Pool share
              </div>
              <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 ">
                LP address
              </div>
              {isSpNFT && (
                <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 ">
                  NFT Pool address
                </div>
              )}
            </div>
            <div>
              <div className="text-xs md:text-sm h-[36px] md:h-auto mt-0 text-right text-primary ">
                {isStableSwap ? 'Stable' : 'Volatile'}
              </div>
              {isFirstLP === false && (
                <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 text-right ">
                  {swapRate1To2 || 0} {token2Symbol}
                </div>
              )}
              {isFirstLP === false && (
                <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 text-right ">
                  {swapRate2To1 || 0} {token1Symbol}
                </div>
              )}
              <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 text-right ">
                {ratioToken1Token2 || 0}
              </div>
              <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 text-right ">
                {ratioToken2Token1 || 0}
              </div>
              <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 text-right ">
                {isFirstLP ? '100%' : `${poolShare}%`}
              </div>
              <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 text-right ">
                <CopyableText text={lpAddress} />
              </div>
              {isSpNFT && (
                <div className="text-xs md:text-sm h-[36px] md:h-auto mt-1.5 text-right ">
                  <CopyableText text={nftPoolAddress || ''} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LiquidityPairInfo;
