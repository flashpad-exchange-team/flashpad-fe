import SwapIcon from '@/icons/SwapIcon';
import dynamic from 'next/dynamic';

const TradeForm: any = dynamic(() => import('./components/TradeForm'), {
  ssr: false,
}); // Disable SSR

const Swap = () => {
  return (
    <>
    <div className='mt-[100px]'/>
    <TradeForm
      title="SWAP"
      buttonName="Swap"
      inputTitle1="From"
      inputTitle2="To"
      dividerIcon={<SwapIcon />}
    />
    </>
    
  );
};

export default Swap;
