import Select from '@/components/select';
import BNBICon from '@/icons/BNBIcon';
import { TOKENS_LIST } from '@/components/modal/SelectTokenModal';

// const TOKENS_LIST = [
//   { value: 'BNB', label: 'BNB' },
//   { value: 'USDC', label: 'USDC' },
//   { value: 'USDT', label: 'USDT' },
// ];

export interface TokenFormProps {
  openModal?: () => void;
  title: string;
  tokenData: {
    symbol: string;
    balance: string;
  };
  setTokenAmount: (value: any) => void;
}

const TokenForm = ({
  openModal,
  title,
  tokenData,
  setTokenAmount,
}: TokenFormProps) => {
  return (
    <div className="bg-[#150E3980] rounded-lg my-2 p-4">
      <div className="flex items-center justify-between w-full">
        <div
          className="min-w-[200px] w-fit rounded-md bg-[#150E39] px-2 py-1 flex items-center gap-2"
          onClick={() => (openModal ? openModal() : void 0)}
        >
          {title}
          <Select
            options={TOKENS_LIST}
            icon={<BNBICon />}
            value={{ value: tokenData?.symbol, label: tokenData?.symbol }}
            disabled
          />
        </div>
        <input
          className="text-[20px] font-bold bg-transparent w-[100px] text-right focus:outline-none"
          defaultValue={'0.0'}
          onChange={(event) => { setTokenAmount(event.target.value); }}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="mt-2">
          Balance: {tokenData ? `${tokenData.balance} ${tokenData.symbol}` : 0}
        </div>

        <div
          className="text-[12px] font-semibold text-[#0C111D] bg-[#FFAF1D] flex items-center justify-center w-[42px] h-[18px] cursor-pointer"
          onClick={() => {}}
        >
          Max
        </div>
      </div>
    </div>
  );
};

export default TokenForm;
