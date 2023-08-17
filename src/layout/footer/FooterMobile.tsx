import { Button } from '@/components/button/Button';
import ListSocial from '@/components/listSocial/ListSocial';
import ArrowDown from '@/icons/ArrowDown';
import ArthurSmallIcon from '@/icons/ArthurSmallIcon';
import { Logo } from '@/templates/Logo';
import { useState } from 'react';

const FooterMobile = () => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const toggleShow1 = () => setShow1(!show1);
  const toggleShow2 = () => setShow2(!show2);
  const toggleShow3 = () => setShow3(!show3);

  return (
    <div className="bg-[#00000080] mb-[75px] h-100% min-h-[450px]  px-4 pt-4 text  pb-10">
      <div className="text-center mb-3">
        <Logo xl />
      </div>
      <div>
        <Button className="w-full mb-2 text-bold flex items-center justify-center">
          <ArthurSmallIcon />
          $111.111.1
        </Button>
        <Button className="w-full text-bold flex items-center justify-center">
          TVL : 12M$
        </Button>
      </div>
      <div>
        <div
          className="text-[#FFAF1D] text-[18px] mt-6 flex items-center justify-between "
          onClick={toggleShow1}
        >
          Resources <ArrowDown stroke="white" />
        </div>
        {show1 && (
          <>
            <div className=" text-[16px] mb-[4px] mt-4">Audit</div>
            <div className=" text-[16px] mb-[4px]">Contact us</div>
            <div className=" text-[16px] mb-[4px]">Contracts</div>
            <div className=" text-[16px] mb-[4px]">Documentation</div>
          </>
        )}
      </div>
      <div>
        <div
          className="text-[#FFAF1D] text-[18px] mt-6 flex items-center justify-between "
          onClick={toggleShow2}
        >
          Help <ArrowDown stroke="white" />
        </div>{' '}
        {show2 && (
          <>
            <div className=" text-[16px] mb-[4px] mt-4">FAQ</div>
            <div className=" text-[16px] mb-[4px]">Guides</div>
            <div className=" text-[16px] mb-[4px]">Support</div>
          </>
        )}
      </div>
      <div>
        <div
          className="text-[#FFAF1D] text-[18px] mt-6 flex items-center justify-between "
          onClick={toggleShow3}
        >
          Tools <ArrowDown stroke="white" />
        </div>{' '}
        {show3 && (
          <>
            <div className=" text-[16px] mb-[4px] mt-4">Analytics</div>
            <div className=" text-[16px] mb-[4px]">Bridge</div>
          </>
        )}
      </div>

      <div>
        <ListSocial />
      </div>
    </div>
  );
};

export default FooterMobile;
