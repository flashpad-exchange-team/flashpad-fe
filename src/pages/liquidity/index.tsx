// import { useLoading } from '@/context/LoadingContext';
import LiquidityIcon from '@/icons/LiquidityIcon';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import PoolList from './components/PoolList';

const TradeForm: any = dynamic(() => import('./components/TradeForm'), {
  ssr: false,
}); // Disable SSR

const Liquidity = () => {
  const [isAddLiquidity, setIsAddLiquidity] = useState(true);
  const handleClickViewExistingPosition = () => {
    setIsAddLiquidity(false);
  };

  return (
    <>
      <div className={isAddLiquidity ? '' : 'hidden'}>
        <TradeForm
          inputTitle1="Token 1"
          inputTitle2="Token 2"
          dividerIcon={<LiquidityIcon />}
          setIsAddLiquidity={setIsAddLiquidity}
          handleClickViewExistingPosition={handleClickViewExistingPosition}
        />
      </div>
      <PoolList
        setIsAddLiquidity={setIsAddLiquidity}
        isAddLiquidity={isAddLiquidity}
      />
    </>
  );
};

export default Liquidity;
