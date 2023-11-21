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
    <div className="w-full max-w-[1440px] mx-auto text-center pt-8 pb-12 bg-dark mt-24 ">
      <div
        className={
          'text-white text-[40px] font-semibold uppercase text-center mb-10 ' +
          redRose.className
        }
      >
        Partners
      </div>
      <div className="flex justify-between px-20">
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => window.open('https://www.mises.site/')}
        >
          <AWSIcon />
        </div>
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => window.open('https://www.mises.site/')}
        >
          <Mises />
        </div>
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => window.open('https://www.mises.site/')}
        >
          <LineaIcon />
        </div>
        <div
          className="flex justify-center cursor-pointer"
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
