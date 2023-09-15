import { SuccessTxInfo } from '@/context/LoadingContext';
import Link from 'next/link';

export const handleSuccessTxMessageCreatePositionAndLiquidity: (
  params: any
) => SuccessTxInfo = (params: any) => {
  const action = params.action;
  const token1 = params.token1;
  const token2 = params.token2;
  const txHash = params.txHash;
  const usdValue = params.usdValue || '?';
  return {
    mainMessage: (
      <div>
        {' '}
        You’ve successfully {action} worth{' '}
        <span className="text-primary">
          {usdValue} of {token1} - {token2} LP
        </span>
      </div>
    ),
    subMessage: (
      <div>
        Head to the{' '}
        <Link href="/" className="text-primary">
          {' '}
          dashboard page
        </Link>{' '}
        or to the
        <Link href="/" className="text-primary">
          {' '}
          pool page
        </Link>{' '}
        to check your position
      </div>
    ),
    tx: txHash,
  };
};

export const handleSuccessTxMessageSwap: (params: any) => SuccessTxInfo = (
  params: any
) => {
  const { token1Amount, token2Amount, token1, token2, txHash, action } = params;
  return {
    mainMessage: (
      <div>
        You’ve successfully {action}{' '}
        <span className="text-primary">
          {token1Amount} of {token1}
        </span>{' '}
        to{' '}
        <span className="text-primary">
          {token2Amount} {token2}
        </span>
      </div>
    ),
    subMessage: <></>,
    tx: txHash,
  };
};
