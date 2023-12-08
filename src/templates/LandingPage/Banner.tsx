import { Button } from '@/components/button/Button';
import CrossSword from '@/icons/CrossSword';
import WhitePaperIcon from '@/icons/WhitePaperIcon';
import { Red_Rose } from 'next/font/google';
import { useRouter } from 'next/router';
import Bg from 'public/assets/images/landing-pg.png'; // Import your image
const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
const Banner = () => {
  const router = useRouter();
  return (
    <div className="w-full z-0">
      <div
        className="block xl:grid grid-cols-2  h-[666px] pb-8 lg:h-[800px] 2k:h-[33vw] px-7 xl:pl-20 m-auto mb-6 w-full relative "
        style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}
      >
        <div className="relative w-full xl:w-auto pt-36 ml-auto mr-0">
          <div
            className={
              'text-[32px] lg:text-[48px] leading-[32px] lg:leading-[48px] font-bold mb-8 uppercase  xl:max-w-[700px] text-center xl:text-left text-[#0A071E] ' +
              redRose.className
            }
          >
            A Native DEX & Launchpad Combination On Linea{' '}
          </div>

          <div className="text-[17px] xl:text-lg leading-6 xl:leading-7 font-[500] xl:max-w-[600px] text-center xl:text-left  text-[#0A071E]">
            Seamless features and inspired by proven model.
          </div>
          <div className="text-[17px] xl:text-lg leading-6 xl:leading-7 font-[500] xl:max-w-[600px] text-center xl:text-left  text-[#0A071E]">
            Inspired by the great power of thunder and Thunder, with all
            utilities running like a Flash
          </div>

          <div className="block lg:flex gap-4 items-center mt2 lg:mt-8">
            <Button
              onClick={() => {
                router.push('/swap');
              }}
              icon={<CrossSword color="#fff" />}
              className="flex px-[28px] !bg-[#0A071E] !text-white my-3 mx-auto lg:m-0 w-full lg:w-auto  justify-center"
            >
              Launch App
            </Button>
            <Button
              onClick={() => {
                window.open('https://docs.flashpad.io/');
              }}
              icon={<WhitePaperIcon color="#fff" />}
              className="flex px-[28px] !bg-[#0A071E] !text-white my-3 mx-auto lg:m-0 w-full lg:w-auto justify-center"
            >
              Whitepaper
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
