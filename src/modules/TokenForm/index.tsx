import Select from '@/components/select';
import BNBICon from '@/icons/BNBIcon';
const TOKENS_LIST = [
  { value: 'BNB', label: 'BNB' },
  { value: 'USDC', label: 'USDC' },
  { value: 'USDT', label: 'USDT' },
];

export interface TokenFormProps {
  openModal?: () => void;
}
const TokenForm = ({ openModal }: TokenFormProps) => {
  return (
    <div className="bg-[#150E3980] rounded-lg my-2 p-4">
      <div className="flex items-center justify-between w-full">
        <div
          className="min-w-[200px] w-fit rounded-md bg-[#150E39] px-2 py-1 flex items-center gap-2"
          onClick={() => (openModal ? openModal() : void 0)}
        >
          Token 1
          <Select options={TOKENS_LIST} icon={<BNBICon />} disabled />
        </div>
        <input
          className="text-[20px] font-bold bg-transparent w-[100px] text-right focus:outline-none"
          defaultValue={'0.0'}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="mt-2">Balance: 0</div>

        <div className="text-[12px] font-semibold text-[#0C111D] bg-[#FFAF1D] flex items-center justify-center w-[42px] h-[18px] cursor-pointer ">
          Max
        </div>
      </div>
    </div>
  );
};

export default TokenForm;
