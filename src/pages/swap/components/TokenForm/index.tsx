import Select from '@/components/select';
import BNBICon from '@/icons/BNBIcon';
import { CHAINS_TOKENS_LIST } from '@/utils/constants';
import Image from 'next/image';
import { polygonMumbai } from 'viem/chains';

export interface TokenFormProps {
  openModal?: () => void;
  title: string;
  tokenData: {
    symbol: string;
    balance: string;
    logo?: string;
    amount?: string;
  };
  setTokenAmount: (value: any) => void;
}

const TokenForm = ({
  openModal,
  title,
  tokenData,
  setTokenAmount,
}: TokenFormProps) => {
  console.log({ tokenData });
  return (
    <div className="bg-[#150E3980] rounded-lg my-2 p-4">
      <div className="block lg:flex items-start w-full">
        <div
          className="w-full justify-between lg:min-w-[200px] lg:w-fit rounded-md bg-[#150E39] px-2 py-1 flex items-center gap-2 text-[14px] lg:text-[16px] "
          onClick={() => (openModal ? openModal() : void 0)}
        >
          <div className="w-[40px]">{title}</div>

          <Select
            options={CHAINS_TOKENS_LIST[polygonMumbai.id]}
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
        <div className="w-full lg:text-right flex lg:block justify-between items-center">
          <div className="text-[14px] lg:text-[12px] lg:text-[#98A2B3] mt-4 mb-1 lg:my-0 ">
            Amount
          </div>
          <input
            className="text-[16px] lg:text-[20px] font-bold bg-transparent w-[70px] lg:w-full text-right focus:outline-none placeholder-[#667085]"
            defaultValue={'0.0'}
            value={
              tokenData?.amount && tokenData?.amount !== 'NaN'
                ? tokenData?.amount
                : 0
            }
            onChange={(event) => {
              setTokenAmount(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full text-[14px] lg:[text-16px]">
        <div className="mt-2 font-semibold">
          Balance:{' '}
          {tokenData?.symbol
            ? `${tokenData.balance || 0} ${tokenData.symbol || ''}`
            : 0}
        </div>

        <div
          className="text-[12px] font-semibold text-[#0C111D] bg-[#FFAF1D] flex items-center justify-center w-[42px] h-[18px] cursor-pointer"
          onClick={() => {
            setTokenAmount(tokenData.balance);
          }}
        >
          Max
        </div>
      </div>
    </div>
  );
};

export default TokenForm;
