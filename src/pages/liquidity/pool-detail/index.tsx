import BNBICon from '@/icons/BNBIcon';
import { CHAINS_TOKENS_LIST } from '@/utils/constants';
import Image from 'next/image';
import { useMemo } from 'react';

const PoolDetail = () => {
  const poolInfo = {
    timeLock: '27/09/2023',
    locked: true,
    token1: 'FUSDC',
    token2: 'WFTM',
    token1Address: '0xbc1FEea515fC2375f04531E7997c79B29dc5E3CC',
    token2Address: '0xc82f14458f68f076A4f2E756dB24B56A3C670bB4',
    lpTokenDecimals: 18,
    myPool: '9.22',
    pairAddress: '0x7c9C2C5618fbFAcad4B11eCe9E5E0E0dF19BAAef',
  };
  const token1Data: any = useMemo(
    () =>
      poolInfo.token1 === 'WFTM'
        ? CHAINS_TOKENS_LIST.find((item: any) => item.symbol === 'ETH')
        : CHAINS_TOKENS_LIST.find(
            (item: any) => item.symbol === poolInfo.token1
          ),
    [poolInfo]
  );
  const token2Data: any = useMemo(
    () =>
      poolInfo.token2 === 'WFTM'
        ? CHAINS_TOKENS_LIST.find((item: any) => item.symbol === 'ETH')
        : CHAINS_TOKENS_LIST.find(
            (item: any) => item.symbol === poolInfo.token2
          ),
    [poolInfo]
  );
  console.log({ token1Data, token2Data: token2Data.logoURI });
  return (
    <div className="max-w-[1096px] w-full mx-auto my-20 px-2">
      <div className="flex  text-[24px] font-bold gap-4">
        <div className="relative">
          <div className="absolute">
            {token1Data?.logoURI ? (
              <Image
                alt="logo"
                src={token1Data?.logoURI as any}
                width={40}
                height={40}
                className="max-w-[unset]"
              />
            ) : (
              <BNBICon size="40" />
            )}
          </div>
          <div className="absolute left-[25px]">
            {token2Data?.logoURI ? (
              <Image
                alt="logo"
                src={token2Data?.logoURI as any}
                width={40}
                height={40}
                className="max-w-[unset]"
              />
            ) : (
              <BNBICon size="40" />
            )}
          </div>
        </div>
        <div className="ml-16">
          {token1Data?.symbol} - {token2Data?.symbol}
        </div>
      </div>
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-[#00000080]">
          <tbody>
            <tr className="hover:bg-[#150E3980] cursor-pointer">
              <td className="py-4 text-[14px] font-bold px-4 border-b border-[#344054] text-left w-[120px]">
                Pool
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right w-[200px]">
                <div className="text-[12px] text-[#344054]">
                  Total value locked
                </div>
                <div>$482.58K</div>
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right w-[200px]">
                <div className="text-[12px] text-[#344054]">APR</div>
                <div className="flex gap-2 items-center justify-end">s</div>
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right w-[200px]">
                <div className="text-[12px] text-[#344054]">
                  Pending rewards #1
                </div>
                <div className="flex gap-1 items-center justify-end">
                  0.7749%
                  <div className="text-[12px] text-[#344054]">($1,75k)</div>
                </div>
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right w-[200px]">
                <div className="text-[12px] text-[#344054]">
                  Pending rewards #2
                </div>
                <div className="flex gap-1 items-center justify-end">
                  0.7749%
                  <div className="text-[12px] text-[#344054]">($1,75k)</div>
                </div>
              </td>
              <td className="py-4 text-[14px] px-4 border-b border-[#344054] text-right "></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoolDetail;
