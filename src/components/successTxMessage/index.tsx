import { SuccessTxInfo } from '@/context/LoadingContext';

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
        You’ve successfully {action} worth{' '}
        <span className="text-primary">
          {usdValue} of {token1} - {token2} LP
        </span>
      </div>
    ),
    // subMessage: (
    //   <div>
    //     Head to the{' '}
    //     <div
    //       onClick={() => {
    //         router.push('/pools');
    //         stopSuccessTx();
    //       }}
    //       className="text-primary cursor-pointer"
    //     >
    //       dashboard page{' '}
    //     </div>
    //     or to the{' '}
    //     <div
    //       onClick={() => {
    //         router.push('/pools');
    //         stopSuccessTx();
    //       }}
    //       className="text-primary cursor-pointer"
    //     >
    //       pool page{' '}
    //     </div>
    //     to check your position
    //   </div>
    // ),
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
