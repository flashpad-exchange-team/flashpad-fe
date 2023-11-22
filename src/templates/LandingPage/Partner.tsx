import AWSIcon from '@/icons/AWSIcon';
import LineaIcon from '@/icons/LineaIcon';
import Mises from '@/icons/Mises';
import { Red_Rose } from 'next/font/google';
import Image from 'next/image';

const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
import AuditImg from '@/public/assets/images/audit.png';

const Partner = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto text-center pt-[60px] pb-4 lg:pb-[72px] bg-dark mt-10 lg:mt-28 ">
      <div
        className={
          'text-white text-[32px] lg:text-[40px] font-semibold uppercase text-center mb-4 lg:mb-10 ' +
          redRose.className
        }
      >
        Partners
      </div>
      <div className="block lg:flex justify-between px-8 lg:px-36">
        <div
          className="flex justify-center cursor-pointer my-6 lg:my-0"
          onClick={() => window.open('https://www.mises.site/')}
        >
          <AWSIcon />
        </div>
        <div
          className="flex justify-center cursor-pointer my-6 lg:my-0"
          onClick={() => window.open('https://www.mises.site/')}
        >
          <Mises />
        </div>
        <div
          className="flex justify-center cursor-pointer my-6 lg:my-0"
          onClick={() => window.open('https://www.mises.site/')}
        >
          <LineaIcon />
        </div>
        <div
          className="flex justify-center cursor-pointer my-6 lg:my-0"
          onClick={() => window.open('https://www.mises.site/')}
        >
          <Image
            src={AuditImg.src}
            alt="Audit"
            width={190}
            height={41}
            className="mx-auto mb-4 lg:m-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Partner;
