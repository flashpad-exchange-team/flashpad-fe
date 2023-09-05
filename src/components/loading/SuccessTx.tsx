import { useLoading } from '@/context/LoadingContext';
import ButtonStyle from '@/icons/ButtonStyle';
import ChartLine from '@/icons/ChartLine';
import CloseIcon from '@/icons/CloseIcon';
import SuccessIcon from '@/icons/SuccessIcon';
import { Button } from '../button/Button';
const SuccessTx = () => {
  const { isSuccessTx, stopSuccessTx, successTxInfo } = useLoading();

  if (!isSuccessTx) return null;

  return (
    <div className="fixed inset-0  bg-[#000000E5] top-[0px] z-50 flex items-center justify-center">
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
        <div className="text-[16px] my-2 font-bold">
          {successTxInfo?.mainMessage}
        </div>
        <div className="text-[12px] text-[#98A2B3] mb-2 font-semibold">
          {successTxInfo?.subMessage}
        </div>
        <div className="mt-4 mb-2">
          <Button
            className="px-4 mx-auto !py-2"
            onClick={() => {
              console.log(successTxInfo?.tx);
              // Go to tx + scan url
            }}
          >
            <ChartLine isInButton /> Tx
          </Button>
        </div>

        <ButtonStyle />
      </div>
    </div>
  );
};

export default SuccessTx;
