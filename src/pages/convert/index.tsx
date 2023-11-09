import SwapIcon from '@/icons/SwapIcon';
import dynamic from 'next/dynamic';

const TradeForm: any = dynamic(() => import('./components/TradeForm'), {
  ssr: false,
}); // Disable SSR

const Convert = () => {
  return (
    <TradeForm
      buttonName="Convert"
      inputTitle1="From"
      inputTitle2="To"
      dividerIcon={<SwapIcon />}
    />
  );
};

export default Convert;
