import { Button } from '@/components/button/Button';
import ListSocial from '@/components/listSocial/ListSocial';
import ArthurSmallIcon from '@/icons/ArthurSmallIcon';
import { Logo } from '@/templates/Logo';

const FooterDesktop = () => {
  return (
    <div className="h-[260px] bg-[#00000080] flex justify-between px-20 pt-12">
      <div>
        <Logo xl className="mb-6" />
        <ListSocial />
      </div>
      <div>
        <div className="text-[#FFAF1D] text-[16px] mb-[5px] ">Resources</div>
        <div className=" text-[16px] mb-[4px]">Audit</div>
        <div className=" text-[16px] mb-[4px]">Contact us</div>
        <div className=" text-[16px] mb-[4px]">Contracts</div>
        <div className=" text-[16px] mb-[4px]">Documentation</div>
      </div>
      <div>
        <div className="text-[#FFAF1D] text-[16px] mb-[5px] ">Help</div>
        <div className=" text-[16px] mb-[4px]">FAQ</div>
        <div className=" text-[16px] mb-[4px]">Guides</div>
        <div className=" text-[16px] mb-[4px]">Support</div>
      </div>
      <div>
        <div className="text-[#FFAF1D] text-[16px] mb-[5px] ">Tools</div>
        <div className=" text-[16px] mb-[4px]">Analytics</div>
        <div className=" text-[16px] mb-[4px]">Bridge</div>
      </div>
      <div>
        <Button className="w-[200px] mb-2 text-bold flex items-center justify-center">
          <ArthurSmallIcon />
          $111.111.1
        </Button>
        <Button className="w-[200px] text-bold flex items-center justify-center">
          TVL : 12M$
        </Button>
      </div>
    </div>
  );
};

export default FooterDesktop;
