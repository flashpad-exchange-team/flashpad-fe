import Mises from '@/icons/Mises';
import { Red_Rose } from 'next/font/google';
const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
const Partner = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto text-center pt-8 pb-12 bg-dark mt-8 ">
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
          <Mises />
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
          <Mises />
        </div>
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => window.open('https://www.mises.site/')}
        >
          <Mises />
        </div>
      </div>
    </div>
  );
};

export default Partner;
