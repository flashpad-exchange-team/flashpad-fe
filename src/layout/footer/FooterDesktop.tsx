import { Button } from '@/components/button/Button';
import ListSocial from '@/components/listSocial/ListSocial';
import ArthurSmallIcon from '@/icons/ArthurSmallIcon';
import { Logo } from '@/templates/Logo';
import { convertToInternationalCurrencySystem } from '@/utils/convert';
import { useRouter } from 'next/router';

interface FooterInterface {
  info: Record<string, any>;
}

const FooterDesktop = ({ info }: FooterInterface) => {
  const router = useRouter();
  return (
    <div className="min-h-[220px] h-[calc(100vh-756px)] bg-dark ">
      <div className="max-w-[1440px]  flex justify-between px-20 pt-12 mx-auto  cursor-pointer">
        <div>
          <Logo xl className="mb-6" />
          <ListSocial />
        </div>
        <div>
          <div className="text-primary text-base mb-[5px] ">Resources</div>
          <a
            // href="https://docs.flashpad.io/present-to-the-king-all-link"
            target="_blank"
            className="block text-base mb-[4px] cursor-pointer"
          >
            Audit
          </a>
          <a
            href="https://docs.flashpad.io/present-to-the-king-all-link"
            target="_blank"
            className="block text-base mb-[4px] cursor-pointer"
          >
            Contact us
          </a>
          <a
            href="https://docs.flashpad.io/contract-info/"
            target="_blank"
            className="block text-base mb-[4px] cursor-pointer"
          >
            Contracts
          </a>
          <a
            href="https://docs.flashpad.io/"
            target="_blank"
            className="block text-base mb-[4px] cursor-pointer"
          >
            Documentation
          </a>
        </div>
        <div>
          <div className="text-primary text-base mb-[5px] ">Help</div>
          <a
            href="https://docs.flashpad.io/flashing-guide/linea-learning"
            target="_blank"
            className="block text-base mb-[4px]  cursor-pointer"
          >
            FAQ
          </a>{' '}
          <a
            href="https://docs.flashpad.io/practice-on-dex/"
            target="_blank"
            className="block text-base mb-[4px] cursor-pointer"
          >
            Guides
          </a>{' '}
        </div>
        <div>
          <div className="text-primary text-base mb-[5px] ">Tools</div>
          <div className=" text-base mb-[4px]">Analytics</div>
        </div>
        <div>
          <div className="text-primary text-base mb-[5px] ">Bridge Options</div>
          <div
            className=" text-base mb-[4px] cursor-pointer"
            onClick={() => window.open('https://app.symbiosis.finance/swap')}
          >
            Symbiosis Finance
          </div>
          <div
            className=" text-base mb-[4px] cursor-pointer"
            onClick={() => router.push('/swap?feat=bridge')}
          >
            Swing.xyz
          </div>
          <div
            className=" text-base mb-[4px] cursor-pointer"
            onClick={() => window.open('https://rango.exchange/')}
          >
            Rango Exchange
          </div>
        </div>
        <div>
          <Button className="w-[200px] mb-2 text-bold flex items-center justify-center">
            <ArthurSmallIcon />${convertToInternationalCurrencySystem(111111.1)}
          </Button>
          <Button className="w-[200px] text-bold flex items-center justify-center">
            TVL : {convertToInternationalCurrencySystem(info?.totalTVL) || 0}$
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FooterDesktop;
