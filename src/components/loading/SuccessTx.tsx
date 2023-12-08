import { useLoading } from '@/context/LoadingContext';
import DividerDown from '@/icons/DividerDown';
import ChartLine from '@/icons/ChartLine';
import CloseIcon from '@/icons/CloseIcon';
import SuccessIcon from '@/icons/SuccessIcon';
import { Button } from '../button/Button';
import { CHAIN_EXPLORER_URL } from '@/utils/constants';
import { useRouter } from 'next/router';

const SuccessTx = () => {
  const { isSuccessTx, stopSuccessTx, successTxInfo } = useLoading();
  const router = useRouter();
  if (!isSuccessTx) return null;

  const lpv2Actions = ['provided liquidity', 'swapped'];

  const spNFTActions = [
    'add to position',
    'boost to position',
    'unboost from position',
    'created staked position',
    'harvest position',
    'renew your lock',
    'withdraw position',
  ];

  return (
    <div
      className="fixed inset-0  bg-[#000000E5] top-[0px] z-50 flex items-center justify-center"
      style={{ zIndex: 100 }}
    >
      <div className="w-[648px] bg-[#0A071E] p-6 text-center">
        <div className="flex items-center justify-between mb-2">
          <div></div>
          <div className="cursor-pointer" onClick={stopSuccessTx}>
            <CloseIcon />
          </div>
        </div>

        <div className="w-full text-center mx-auto">
          <SuccessIcon className="mx-auto" />
        </div>
        <div className="text-base my-2 font-bold">
          {successTxInfo?.mainMessage}
        </div>
        <div className="text-xs text-[#98A2B3] mb-2 font-semibold">
          {/* {successTxInfo?.subMessage} */}
          <div className="">
            Head to the{' '}
            {/* <span
              onClick={() => {
                router.push('/pools');
                stopSuccessTx();
              }}
              className="text-primary cursor-pointer"
            >
              dashboard page{' '}
            </span> */}
            {/* or to the{' '} */}
            <span
              onClick={() => {
                if (successTxInfo?.action) {
                  if (lpv2Actions.includes(successTxInfo.action))
                    router.push('/lp-positions');
                  else if (spNFTActions.includes(successTxInfo.action))
                    router.push('/spnft-positions');
                  else router.push('/farming-thunder');
                }
                stopSuccessTx();
              }}
              className="text-primary cursor-pointer"
            >
              pool page{' '}
            </span>
            to check your position
          </div>
        </div>
        <div className="mt-4 mb-2">
          <Button
            className="px-4 mx-auto !py-2"
            onClick={() => {
              const txHash = successTxInfo?.tx;
              if (txHash) {
                window.open(`${CHAIN_EXPLORER_URL}/tx/${txHash}`, '_blank');
              }
            }}
          >
            <ChartLine isInButton /> View Tx
          </Button>
        </div>

        <DividerDown />
      </div>
    </div>
  );
};

export default SuccessTx;
