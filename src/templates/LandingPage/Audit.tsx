import { Button } from '@/components/button/Button';
import CrossSword from '@/icons/CrossSword';
import AuditImg from '@/public/assets/images/audit.png';
import { Red_Rose } from 'next/font/google';
import Image from 'next/image';
const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const Audit = () => {
  return (
    <div className="w-full max-w-[1096px] mx-auto text-center py-6 bg-dark  mt-8 flex items-center justify-between px-20">
      <div className="mx-auto text-center lg:m-0 lg:text-left">
        <div
          className={
            'text-primary text-2xl font-bold mb-1 ' + redRose.className
          }
        >
          AUDITED BY
        </div>
        <Image
          src={AuditImg.src}
          alt="Audit"
          width={150}
          height={19}
          className="mx-auto mb-4 lg:m-0"
        />
      </div>
      <Button
        onClick={() => {
          // router.push('/swap');
        }}
        icon={<CrossSword />}
        className="hidden lg:!flex px-[20px]"
      >
        Read Report
      </Button>
    </div>
  );
};

export default Audit;
