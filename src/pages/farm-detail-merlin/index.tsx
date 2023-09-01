import { Button } from '@/components/button/Button';
import { useLoading } from '@/context/LoadingContext';
import useWindowWidth from '@/hooks/useWindowWith';
import AddIcon from '@/icons/AddIcon';
import BNBICon from '@/icons/BNBIcon';
import Caculator from '@/icons/Caculator';
import DownloadIcon from '@/icons/DownloadIcon';
import LayerIcon from '@/icons/LayerIcon';
import Link from '@/icons/Link';
import SaleIcon from '@/icons/SaleIcon';
import TokenLogoIcon from '@/icons/TokenLogoIcon';
import Footer from '@/layout/footer';
import { Header } from '@/layout/header/Header';
import { Logo } from '@/templates/Logo';
import Bg from 'public/assets/images/app-bg.png'; // Import your image
import { useEffect, useState } from 'react';
import TableDetail from './components/TableDetail';
import TableDetailSp from './components/TableDetailSp';
const FarmDetail = () => {
  const { startLoading, stopLoading } = useLoading();
  const [isClient, setIsClient] = useState(false); // Check content mismatch error
  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 768;
  useEffect(() => {
    setIsClient(true);

    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 1000);
  }, []);

  return isClient ? (
    <div
      style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}
      className=" min-h-[100vh] "
    >
      <Header logo={<Logo xl />} mode="app" />
      <div className="max-w-[1096px] w-full mx-auto my-20 px-2">
        <div className="flex flex-col md:flex-row text-[24px] font-bold gap-4 justify-between">
          <div>
            <div className="relative">
              <div className="absolute">
                <BNBICon size={40} />
              </div>
              <div className="absolute left-[25px]">
                <BNBICon size={40} />
              </div>
            </div>
            <div className="ml-16">Token A - Token B</div>
          </div>
          <div className="flex flex-wrap">
            <Button className="px-2 hidden md:!flex order-1 h-[52px] w-[100%] mr-2 md:w-[172px] justify-center">
              <Link />
              Contract
            </Button>
            <Button className="px-2 h-[52px] w-[100%] order-3 md:order-2 mr-2 md:w-[210px] flex justify-center">
              <Caculator />
              APY Caculator
            </Button>
            <Button className="px-2 h-[52px] w-[100%] order-2 md:order-3 mr-2 mb-2 md:mb-0 md:mr-0 md:w-[210px] flex justify-center">
              <AddIcon color="#0C111D" />
              Add Liquidity
            </Button>
          </div>
        </div>
        {isSmallScreen ? <TableDetailSp /> : <TableDetail />}
        <div className="flex flex-wrap justify-between items-center mt-6">
          <div className="text-[24px] font-bold order-1">Staked positions</div>
          <Button
            className="px-6 flex gap-3 order-3 md:order-2 w-full md:w-[147px] md:h-[47px] justify-center"
            icon={<DownloadIcon />}
          >
            Deposit
          </Button>
          <div className="w-full bg-[#00000080] flex flex-col md:flex-row items-center gap-3 py-4 px-5 order-2 md:order-3">
            <div className=" rounded-md w-full md:w-1/3">
              <div className="bg-[#150E3980] px-3 py-2 rounded-md w-full flex items-center justify-between">
                <div>
                  <div className="text-[#344054] text-[12px]">AVERAGE APR</div>
                  <div className=" text-[14px]">0%</div>
                </div>
                <div>
                  <SaleIcon />
                </div>
              </div>
            </div>
            <div className=" rounded-md w-full md:w-1/3">
              <div className="bg-[#150E3980] px-3 py-2 rounded-md w-full flex items-center justify-between">
                <div>
                  <div className="text-[#344054] text-[12px]">
                    TOTAL DEPOSITS
                  </div>
                  <div className=" text-[14px]">0 Token A - Token B</div>
                </div>
                <div>
                  <LayerIcon />
                </div>
              </div>
            </div>
            <div className=" rounded-md w-full md:w-1/3">
              <div className="bg-[#150E3980] px-3 py-2 rounded-md w-full flex items-center justify-between">
                <div>
                  <div className="text-[#344054] text-[12px]">
                    PENDING VELA REWARDS
                  </div>
                  <div className=" text-[14px]">0 Token</div>
                </div>
                <div>
                  <TokenLogoIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    'Render'
  );
};

export default FarmDetail;
