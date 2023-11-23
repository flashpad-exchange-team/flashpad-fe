import { Button } from '@/components/button/Button';
import ListSocial from '@/components/listSocial/ListSocial';
import ArrowDown from '@/icons/ArrowDown';
import ArthurSmallIcon from '@/icons/ArthurSmallIcon';
import { Logo } from '@/templates/Logo';
import { convertToInternationalCurrencySystem } from '@/utils/convert';
import { useState } from 'react';

const FooterMobile = ({ info }) => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const toggleShow1 = () => setShow1(!show1);
  const toggleShow2 = () => setShow2(!show2);
  const toggleShow3 = () => setShow3(!show3);

  return (
    <div className="bg-dark mb-[75px] h-100% min-h-[450px]  px-4 pt-4 text  pb-10">
      <div className="text-center mb-3">
        <Logo xl />
      </div>
      <div>
        <Button className="w-full mb-2 text-bold flex items-center justify-center">
          <ArthurSmallIcon />
          {convertToInternationalCurrencySystem(111111.1)}
        </Button>
        <Button className="w-full text-bold flex items-center justify-center">
          TVL : {convertToInternationalCurrencySystem(info?.totalTVL) || 0}$
        </Button>
      </div>
      <div>
        <div
          className="text-primary text-lg mt-6 flex items-center justify-between "
          onClick={toggleShow1}
        >
          Resources <ArrowDown stroke="white" />
        </div>
        {show1 && (
          <>
            <a
              // href="https://docs.arthur.exchange/present-to-the-king-all-link"
              target="_blank"
              className="block text-base mb-[4px]"
            >
              Audit
            </a>
            <a
              href="https://docs.arthur.exchange/present-to-the-king-all-link"
              target="_blank"
              className="block text-base mb-[4px]"
            >
              Contact us
            </a>
            <a
              href="https://docs.arthur.exchange/contract-info/"
              target="_blank"
              className="block text-base mb-[4px]"
            >
              Contracts
            </a>
            <a
              href="https://docs.arthur.exchange/"
              target="_blank"
              className="block text-base mb-[4px]"
            >
              Documentation
            </a>
          </>
        )}
      </div>
      <div>
        <div
          className="text-primary text-lg mt-6 flex items-center justify-between "
          onClick={toggleShow2}
        >
          Help <ArrowDown stroke="white" />
        </div>
        {show2 && (
          <>
            <a
              href="https://docs.arthur.exchange/let-arthur-guide-you/"
              target="_blank"
              className="block text-base mb-[4px]"
            >
              FAQ
            </a>{' '}
            <a
              href="https://docs.arthur.exchange/practice-on-dex/"
              target="_blank"
              className="block text-base mb-[4px]"
            >
              Guides
            </a>{' '}
          </>
        )}
      </div>
      <div>
        <div
          className="text-primary text-lg mt-6 flex items-center justify-between "
          onClick={toggleShow3}
        >
          Tools <ArrowDown stroke="white" />
        </div>
        {show3 && (
          <>
            <div className=" text-base mb-[4px] mt-4">Analytics</div>
            <div className=" text-base mb-[4px]">Bridge</div>
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
