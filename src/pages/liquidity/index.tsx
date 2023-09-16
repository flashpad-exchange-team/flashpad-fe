// import { useLoading } from '@/context/LoadingContext';
import LiquidityIcon from '@/icons/LiquidityIcon';
import dynamic from 'next/dynamic';

const TradeForm: any = dynamic(() => import('./components/TradeForm'), {
  ssr: false,
}); // Disable SSR

const Liquidity = () => {
  return (
    <TradeForm
      inputTitle1="Token 1"
      inputTitle2="Token 2"
      dividerIcon={<LiquidityIcon />}
    />
  );
};

export default Liquidity;
