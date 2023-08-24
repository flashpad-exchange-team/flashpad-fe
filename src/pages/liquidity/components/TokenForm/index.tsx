import Select from '@/components/select';
import BNBICon from '@/icons/BNBIcon';
import { LINEA_TESTNET_TOKENS_LIST } from '@/utils/constants';
import Image from 'next/image';

export interface TokenFormProps {
  openModal?: () => void;
  title: string;
  tokenData: {
    symbol: string;
    balance: string;
    logo?: string;
  };
  value: string;
  setTokenAmount: (value: any) => void;
}

const TokenForm = ({
  openModal,
  title,
  tokenData,
  value,
  setTokenAmount,
}: TokenFormProps) => {
  return (
    <div className="bg-[#150E3980] rounded-lg my-2 p-4">
      <div className="flex items-center  w-full">
        <div
          className="lg:min-w-[215px] w-fit rounded-md bg-[#150E39] px-2 py-1 flex items-center gap-2 text-[14px] lg:text-[16px]"
          onClick={() => (openModal ? openModal() : void 0)}
        >
          <div className="w-[60px]">{title}</div>
          <Select
            options={LINEA_TESTNET_TOKENS_LIST}
            icon={
              tokenData?.logo ? (
                <Image
                  alt="logo"
                  src={tokenData?.logo}
                  width={25}
                  height={25}
                />
              ) : (
                <BNBICon />
              )
            }
            value={{ value: tokenData?.symbol, label: tokenData?.symbol }}
            disabled
          />
        </div>
        <input
          className="text-[16px] lg:text-[20px] font-bold bg-transparent w-[70px] lg:w-full text-right focus:outline-none placeholder-[#667085]"
          value={value}
          onChange={(event) => {
            setTokenAmount(event.target.value);
          }}
        />
      </div>
      <div className="flex items-center justify-between w-full text-[14px] lg:[text-16px]">
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
