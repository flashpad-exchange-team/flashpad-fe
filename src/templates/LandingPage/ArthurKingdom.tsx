import ListSocialBlack from '@/components/listSocial/ListSocialBlack';
import TitleLeftBlack from '@/icons/TitleLeftBlack';
import TitleRightBlack from '@/icons/TitleRightBlack';
import { Red_Rose } from 'next/font/google';
const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
const ArthurKingdom = () => {
  return (
    <div className="w-full mx-auto text-center h-[246px] bg-primary mt-20 mb-0">
      <div className="mx-auto max-w-[1440px]">
        <div
          className={
            'text-[#0A071E] text-[24px] lg:text-[48px] font-semibold uppercase flex justify-center items-center gap-4 mt-12 leading-10  ' +
            redRose.className
          }
        >
          <TitleLeftBlack />
          FLASHY WORLD
          <TitleRightBlack />
        </div>
        <div className="text-center ">
          <div
            className={
              'text-[#0A071E] text-[32px] font-bold mb-3 font-rem leading-0 ' +
              redRose.className
            }
          >
            Find us on
          </div>
          <div className="mx-auto w-fit pb-4">
            <ListSocialBlack />
          </div>
          <div className="text-[#0A071E] font-semibold">
            Business Contact: support@flashpad.io
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArthurKingdom;
