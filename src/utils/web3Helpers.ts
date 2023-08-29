import { GetBalanceParameters, GetBlockParameters } from 'viem';
import { publicClient } from './web3Clients';
import { format, fromUnixTime } from 'date-fns';

export const getBlock = async (params?: GetBlockParameters) => {
  return await publicClient.getBlock(params);
};

export const getBalance = async (params?: GetBalanceParameters) => {
  return await publicClient.getBalance(params);
};

export const daysToSeconds = (days: number) => {
  return BigInt(days * 60 * 60 * 24);
};

export const nthPowerOf10 = (n: number) => {
  return BigInt('1'.padEnd(n + 1, '0'));
}

export const getDateFormat = (value: any) => {
  if (value) {
    const timestampBigInt = BigInt(value.toString());
    const timestampInSeconds = Number(timestampBigInt);
    const date = fromUnixTime(timestampInSeconds);
    console.log({ date })
    return format(date, 'dd/MM/yyyy')
  }
  return ''

}