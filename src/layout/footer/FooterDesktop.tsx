import { Button } from '@/components/button/Button';
import ListSocial from '@/components/listSocial/ListSocial';
import ArthurSmallIcon from '@/icons/ArthurSmallIcon';
import { Logo } from '@/templates/Logo';

const FooterDesktop = () => {
  return (
    <div className="min-h-[220px] h-[calc(100vh-756px)] bg-dark ">
      <div className="max-w-[1440px]  flex justify-between px-20 pt-12 mx-auto ">
        <div>
          <Logo xl className="mb-6" />
          <ListSocial />
        </div>
        <div>
          <div className="text-primary text-base mb-[5px] ">Resources</div>
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
        </div>
        <div>
          <div className="text-primary text-base mb-[5px] ">Help</div>
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
        </div>
        <div>
          <div className="text-primary text-base mb-[5px] ">Tools</div>
          <div className=" text-base mb-[4px]">Analytics</div>
          <div className=" text-base mb-[4px]">Bridge</div>
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
    </div>
  );
};

export default FooterDesktop;
