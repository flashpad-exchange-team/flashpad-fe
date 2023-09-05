import { SuccessTxInfo } from '@/context/LoadingContext';
import Link from 'next/link';

export const handleSuccessTxMessage: (params: any) => SuccessTxInfo = (
  params: any
) => {
  const action = params.action;
  const token1 = params.token1;
  const token2 = params.token2;
  const txHash = params.txHash;
  const usdValue = params.usdValue || '?';
  return {
    mainMessage: (
      <div>
        {' '}
        You’ve successfully {action} worth {' '}
        <span className="text-[#FFAF1D]">
          ${usdValue} of {token1} - {token2} LP
        </span>
      </div>
    ),
    subMessage: (
      <div>
        Head to the{' '}
        <Link href="/" className="text-[#FFAF1D]">
          {' '}
          dashboard page
        </Link>{' '}
        or to the
        <Link href="/" className="text-[#FFAF1D]">
          {' '}
          pool page
        </Link>{' '}
        to check your position
      </div>
    ),
    tx: txHash,
  };
};
