import { SuccessTxInfo } from '@/context/LoadingContext';

export const handleSuccessTxMessageActionWithPair: (
  params: any
) => SuccessTxInfo = (params: any) => {
  const action = params.action;
  const token1 = params.token1;
  const token2 = params.token2;
  const txHash = params.txHash;
  const usdValue = params.usdValue || '?';

  return {
    action,

    mainMessage: (
      <div>
        You’ve successfully {action} worth{' '}
        <span className="text-primary">
          {usdValue} of {token1} - {token2} LP
        </span>
      </div>
    ),
    tx: txHash,
  };
};

export const handleSuccessTxMessageActionSingleToken: (
  params: any
) => SuccessTxInfo = (params: any) => {
  const action = params.action;
  const token = params.token;
  const txHash = params.txHash;
  const amount = params.amount || '0';

  return {
    action,
    mainMessage: (
      <div>
        You’ve successfully {action} worth{' '}
        <span className="text-primary">
          {amount} of token <span className="text-primary">{token}</span>
        </span>
      </div>
    ),
    tx: txHash,
  };
};

export const handleSuccessTxMessageActionWithNoValue: (
  params: any
) => SuccessTxInfo = (params: any) => {
  const action = params.action;
  const txHash = params.txHash;

  return {
    action,

    mainMessage: <div>You’ve successfully {action}</div>,
    tx: txHash,
  };
};

export const handleSuccessTxMessageSwap: (params: any) => SuccessTxInfo = (
  params: any
) => {
  const { token1Amount, token2Amount, token1, token2, txHash, action } = params;
  return {
    action,

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
