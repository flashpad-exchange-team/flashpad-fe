import { Button } from '@/components/button/Button';
import useWindowWidth from '@/hooks/useWindowWidth';
import Image from 'next/image';
import AddIcon from '@/icons/AddIcon';
import BNBICon from '@/icons/BNBIcon';
import CalculatorIcon from '@/icons/Calculator';
import DownloadIcon from '@/icons/DownloadIcon';
import LayerIcon from '@/icons/LayerIcon';
import Link from '@/icons/Link';
import SaleIcon from '@/icons/SaleIcon';
import TableDetail from './components/TableDetail';
import TableDetailSp from './components/TableDetailSp';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import useAllMerlinPoolsData from '@/hooks/useAllMerlinPoolsData';
import customToast from '@/components/notification/customToast';
import { ADDRESS_ZERO, CHAIN_EXPLORER_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import * as merlinPoolContract from '@/utils/merlinPoolContract';
import * as erc20TokenContract from '@/utils/erc20TokenContract';

const FarmMerlinDetail = () => {
  const router = useRouter();
  const {
    merlinPool,
    //...queryParams,
  } = router.query;
  console.log({ merlinPool });

  const { address: userAddress } = useAccount();
  const { data: allMerlinPools, isLoading } =
    useAllMerlinPoolsData(userAddress);

  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 768;

  const [merlinPoolAddress, setMerlinPoolAddress] = useState(ADDRESS_ZERO);
  // const [totalValueLocked, setTotalValueLocked] = useState('');

  const [token1Symbol, setToken1Symbol] = useState('');
  const [token2Symbol, setToken2Symbol] = useState('');
  const [token1Logo, setToken1Logo] = useState<string | undefined>('');
  const [token2Logo, setToken2Logo] = useState<string | undefined>('');
  const [rewardsToken1Info, setRewardsToken1Info] = useState<any>(undefined);
  const [rewardsToken2Info, setRewardsToken2Info] = useState<any>(undefined);
  const [rewardsToken1Symbol, setRewardsToken1Symbol] = useState('');
  const [rewardsToken2Symbol, setRewardsToken2Symbol] = useState('');
  const [rewardsToken1Logo, setRewardsToken1Logo] = useState<
    string | undefined
  >('');
  const [rewardsToken2Logo, setRewardsToken2Logo] = useState<
    string | undefined
  >('');
  const [rewardsToken1Decimals, setRewardsToken1Decimals] = useState(18);
  const [rewardsToken2Decimals, setRewardsToken2Decimals] = useState(18);
  const [pendingRewards1, setPendingRewards1] = useState('0');
  const [pendingRewards2, setPendingRewards2] = useState('0');
  const [totalDeposited, setTotalDeposited] = useState('0');
  const [merlinPoolSettings, setMerlinPoolSettings] = useState<any>(undefined);

  const getMerlinPoolInfo = async () => {
    if (isLoading) return;

    const merlinPoolData = allMerlinPools?.find(
      (p) => p.poolAddress.toLowerCase() === (merlinPool + '').toLowerCase()
    );
    if (!merlinPoolData) {
      router.push('/not-found');
      return;
    }

    const merlinPoolAddr = merlinPoolData.poolAddress;
    setMerlinPoolAddress(merlinPoolAddr);
    setToken1Symbol(merlinPoolData.token1);
    setToken2Symbol(merlinPoolData.token2);
    setToken1Logo(merlinPoolData.token1Logo);
    setToken2Logo(merlinPoolData.token2Logo);

    setRewardsToken1Info(merlinPoolData.rewardsToken1Info);
    setRewardsToken2Info(merlinPoolData.rewardsToken2Info);
    setRewardsToken1Symbol(merlinPoolData.rewardsToken1Symbol);
    setRewardsToken2Symbol(merlinPoolData.rewardsToken2Symbol);
    setRewardsToken1Logo(merlinPoolData.rewardsToken1Logo);
    setRewardsToken2Logo(merlinPoolData.rewardsToken2Logo);

    setPendingRewards1(merlinPoolData.pendingRewards?.pending1 || '0');
    setPendingRewards2(merlinPoolData.pendingRewards?.pending2 || '0');

    setMerlinPoolSettings(merlinPoolData.settings);

    const [userInfo, rwdToken1Decimals, rwdToken2Decimals] = await Promise.all([
      merlinPoolContract.read(merlinPoolAddr, 'userInfo', [userAddress]),
      erc20TokenContract.erc20Read(
        merlinPoolData.rewardsToken1Info.token,
        'decimals',
        []
      ),
      erc20TokenContract.erc20Read(
        merlinPoolData.rewardsToken2Info.token,
        'decimals',
        []
      ),
    ]);

    setTotalDeposited((userInfo?.totalDepositAmount || 0) + '');
    setRewardsToken1Decimals(rwdToken1Decimals ? Number(rwdToken1Decimals) : 18);
    setRewardsToken2Decimals(rwdToken2Decimals ? Number(rwdToken2Decimals) : 18);
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!merlinPool) {
      router.push('/not-found');
      return;
    }

    getMerlinPoolInfo();
  }, [allMerlinPools, isLoading]);

  const handleClickBtnContract = () => {
    if (merlinPoolAddress !== ADDRESS_ZERO) {
      window.open(`${CHAIN_EXPLORER_URL}/address/${merlinPoolAddress}`);
    } else {
      customToast({
        message: 'The Merlin pool contract address is undefined',
        type: 'warning',
      });
    }
  };

  const handleClickAddLiquidity = () => {
    router.push('/liquidity');
  };

  return (
    <div className="max-w-[1096px] w-full mx-auto my-20 px-2">
      <div className="flex flex-col md:flex-row text-2xl font-bold gap-4 justify-between">
        <div>
          <div className="relative">
            <div className="absolute">
              {token1Logo ? (
                <Image
                  alt="logo"
                  src={token1Logo as any}
                  width={40}
                  height={40}
                  className="max-w-[unset]"
                />
              ) : (
                <BNBICon size="40" />
              )}
            </div>
            <div className="absolute left-[25px]">
              {token2Logo ? (
                <Image
                  alt="logo"
                  src={token2Logo as any}
                  width={40}
                  height={40}
                  className="max-w-[unset]"
                />
              ) : (
                <BNBICon size="40" />
              )}
            </div>
          </div>
          <div className="ml-16 pl-4">
            {token1Symbol} - {token2Symbol}
          </div>
        </div>
        <div className="flex flex-wrap">
          <Button
            className="px-2 hidden md:!flex order-1 h-[52px] w-[100%] mr-2 md:w-[172px] justify-center"
            onClick={handleClickBtnContract}
          >
            <Link />
            Contract
          </Button>
          <Button className="px-2 h-[52px] w-[100%] order-3 md:order-2 mr-2 md:w-[210px] flex justify-center">
            <CalculatorIcon />
            APY Calculator
          </Button>
          <Button
            className="px-2 h-[52px] w-[100%] order-2 md:order-3 mr-2 mb-2 md:mb-0 md:mr-0 md:w-[210px] flex justify-center"
            onClick={handleClickAddLiquidity}
          >
            <AddIcon color="#0C111D" />
            Add Liquidity
          </Button>
        </div>
      </div>
      {isSmallScreen ? (
        <TableDetailSp
          data={{
            tvl: '',
            apr: '',
            rewardsToken1Info,
            rewardsToken2Info,
            rewardsToken1Symbol,
            rewardsToken2Symbol,
            rewardsToken1Decimals,
            rewardsToken2Decimals,
            totalDeposited,
            settings: merlinPoolSettings,
          }}
        />
      ) : (
        <TableDetail
          data={{
            tvl: '',
            apr: '',
            rewardsToken1Info,
            rewardsToken2Info,
            rewardsToken1Symbol,
            rewardsToken2Symbol,
            rewardsToken1Decimals,
            rewardsToken2Decimals,
            totalDeposited,
            settings: merlinPoolSettings,
          }}
        />
      )}
      <div className="flex flex-wrap justify-between items-center mt-6">
        <div className="text-2xl font-bold order-1">Staked positions</div>
        <Button
          className="px-6 flex gap-3 order-3 md:order-2 w-full md:w-[147px] md:h-[47px] justify-center"
          icon={<DownloadIcon />}
        >
          Deposit
        </Button>
        <div className="w-full bg-dark flex flex-col md:flex-row items-center gap-3 py-4 px-5 order-2 md:order-3">
          <div className=" rounded-md w-full md:w-1/3">
            <div className="bg-darkBlue px-3 py-2 rounded-md w-full flex items-center justify-between">
              <div>
                <div className="text-lightGray text-xs">AVERAGE APR</div>
                <div className=" text-sm">0%</div>
              </div>
              <div>
                <SaleIcon />
              </div>
            </div>
          </div>
          <div className=" rounded-md w-full md:w-1/3">
            <div className="bg-darkBlue px-3 py-2 rounded-md w-full flex items-center justify-between">
              <div>
                <div className="text-lightGray text-xs">TOTAL DEPOSITS</div>
                <div className=" text-sm">
                  {totalDeposited} {token1Symbol} - {token2Symbol}
                </div>
              </div>
              <div>
                <LayerIcon />
              </div>
            </div>
          </div>
          <div className=" rounded-md w-full md:w-1/3">
            <div className="bg-darkBlue px-3 py-2 rounded-md w-full flex items-center justify-between">
              <div>
                <div className="text-lightGray text-xs">
                  PENDING {rewardsToken1Symbol} REWARDS
                </div>
                <div className=" text-sm">
                  {pendingRewards1} {rewardsToken1Symbol}
                </div>
              </div>
              <div>
                {rewardsToken1Logo ? (
                  <Image
                    alt="logo"
                    src={rewardsToken1Logo as any}
                    width={32}
                    height={32}
                    className="max-w-[unset]"
                  />
                ) : (
                  <BNBICon size="32" />
                )}
              </div>
            </div>
          </div>
          {rewardsToken2Symbol && (
            <div className=" rounded-md w-full md:w-1/3">
              <div className="bg-darkBlue px-3 py-2 rounded-md w-full flex items-center justify-between">
                <div>
                  <div className="text-lightGray text-xs">
                    PENDING {rewardsToken2Symbol} REWARDS
                  </div>
                  <div className=" text-sm">
                    {pendingRewards2} {rewardsToken2Symbol}
                  </div>
                </div>
                <div>
                  {rewardsToken2Logo ? (
                    <Image
                      alt="logo"
                      src={rewardsToken2Logo as any}
                      width={32}
                      height={32}
                      className="max-w-[unset]"
                    />
                  ) : (
                    <BNBICon size="32" />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmMerlinDetail;