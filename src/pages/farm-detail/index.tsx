import { Button } from '@/components/button/Button';
import useWindowWidth from '@/hooks/useWindowWidth';
import BNBICon from '@/icons/BNBIcon';
import DownloadIcon from '@/icons/DownloadIcon';
import LayerIcon from '@/icons/LayerIcon';
import SaleIcon from '@/icons/SaleIcon';
import TokenLogoIcon from '@/icons/TokenLogoIcon';
import TableDetail from './components/TableDetail';
import TableDetailSp from './components/TableDetailSp';
const FarmDetail = () => {
  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 768;

  return (
    <div className="max-w-[1096px] w-full mx-auto mb-20 mt-28 px-2">
      <div className="flex  text-2xl font-bold gap-4">
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
      {isSmallScreen ? <TableDetailSp /> : <TableDetail />}
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
                <div className=" text-sm">0 Token A - Token B</div>
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
                  PENDING VELA REWARDS
                </div>
                <div className=" text-sm">0 Token</div>
              </div>
              <div>
                <TokenLogoIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmDetail;
