import { Button } from '@/components/button/Button';
import BNBICon from '@/icons/BNBIcon';
import CalculatorIcon from '@/icons/Caculator';
import ChartLineIcon from '@/icons/ChartLineIcon';
import DollarIcon from '@/icons/DollarIcon';
import FeeIcon from '@/icons/FeeIcon';
import FlowIcon from '@/icons/FlowIcon';
import Link from '@/icons/Link';
import { ADDRESS_ZERO, CHAINS_TOKENS_LIST, CHAIN_EXPLORER_URL } from '@/utils/constants';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Staked from './components/Staked';
import NotStaked from './components/NotStaked';
import { useRouter } from 'next/router';
import * as pairContract from '@/utils/pairContract';
import * as erc20Contract from '@/utils/erc20TokenContract';
import * as nftPoolFactoryContract from '@/utils/nftPoolFactoryContract';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

const PoolDetail = () => {
  const router = useRouter();
  const {
    pairAddress
    //...queryParams,
  } = router.query;

  const { address: userAddress } = useAccount();

  const [nftPoolAddress, setNftPoolAddress] = useState<Address>(ADDRESS_ZERO);
  const [token1Symbol, setToken1Symbol] = useState<string>('');
  const [token2Symbol, setToken2Symbol] = useState<string>('');

  const getPoolInfo = async (pairAddress: Address) => {
    const poolAddress = await nftPoolFactoryContract.getPool(pairAddress);
    if (poolAddress) {
      setNftPoolAddress(poolAddress);
    }

    const lpTokenDecimals = await pairContract.read(
      pairAddress,
      'decimals',
      []
    );

    const userLpBalance = userAddress
      ? await pairContract.read(pairAddress, 'balanceOf', [userAddress])
      : 0;
    const totalSupply = await pairContract.read(
      pairAddress,
      'totalSupply',
      []
    );

    const [token1Address, token2Address] = await Promise.all([
      pairContract.read(pairAddress, 'token0', []),
      pairContract.read(pairAddress, 'token1', [])
    ]);

    const [token1Symbol, token2Symbol] = await Promise.all([
      erc20Contract.erc20Read(
        token1Address,
        'symbol',
        []
      ),
      erc20Contract.erc20Read(
        token2Address,
        'symbol',
        []
      ),
    ]);

    setToken1Symbol(token1Symbol);
    setToken2Symbol(token2Symbol);

    const token1Logo = CHAINS_TOKENS_LIST.find((e) => {
      return e.symbol === token1Symbol;
    })?.logoURI;

    const token2Logo = CHAINS_TOKENS_LIST.find((e) => {
      return e.symbol === token2Symbol;
    })?.logoURI;    
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!pairAddress) {
      router.push('/not-found');
    }

    getPoolInfo(pairAddress as Address);
  }, [router.isReady]);

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
  const isStaked = true;

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

  return (
    <div className="max-w-[1096px] w-full mx-auto my-20 px-2">
      <div className="flex justify-between">
        <div>
          <div className="flex  text-2xl font-bold gap-4">
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
              {token1Symbol} - {token2Symbol}
            </div>
          </div>

          <div className="flex items-center gap-3 font-medium text-base mt-6">
            <div className="flex items-center gap-1 ">
              <DollarIcon />
              $44k <span className="text-secondary ">TVL</span>
            </div>
            <div className="flex items-center gap-1 ">
              <FeeIcon />
              1,88% <span className="text-secondary ">Fees APR</span>
            </div>
            <div className="flex items-center gap-1 ">
              <FlowIcon />
              $185 <span className="text-secondary ">24h Volume</span>
            </div>
            <div className="flex items-center gap-1 ">
              <ChartLineIcon />
              $20 <span className="text-secondary ">24h fees</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            className=" text-white text-sm h-[42px] px-6"
            style={{ background: '#101828' }}
            onClick={() => {
              if (nftPoolAddress !== ADDRESS_ZERO) {
                window.open(`${CHAIN_EXPLORER_URL}/address/${nftPoolAddress}`);
              }
            }}
          >
            <Link color="white" />
            Contract
          </Button>
          <Button
            className=" text-white text-sm h-[42px] px-6 "
            style={{ background: '#101828' }}
          >
            <CalculatorIcon color="white" />
            APY
          </Button>
        </div>
      </div>
      {isStaked ? <Staked /> : <NotStaked />}
    </div>
  );
};

export default PoolDetail;
