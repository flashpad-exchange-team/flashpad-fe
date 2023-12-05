import { Button } from '@/components/button/Button';
import AuditShieldIcon from '@/icons/AuditShieldIcon';
import ReadIcon from '@/icons/Read';
import AuditImg from '@/public/assets/images/audit.png';
import { Red_Rose } from 'next/font/google';
import Image from 'next/image';
const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const Audit = () => {
  return (
    <div className="w-full max-w-[1096px] mx-auto text-center py-6 bg-dark mt-8 lg:mt-32 block lg:flex items-center justify-center lg:justify-between px-20">
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
          className="mx-auto mb-6 mt-4 lg:mt-0 lg:mb-4 lg:m-0"
        />
      </div>
      <div className="relative w-[222px] h-[120px]  hidden lg:block">
        <div className="absolute top-[-50px]">
          <AuditShieldIcon />
        </div>
      </div>
      <Button
        onClick={() =>
          window.open('https://docs.flashpad.io/references/audits/phase-1-done')
        }
        icon={<ReadIcon />}
        className="flex  px-3 lg:px-[20px] h-[48px] mx-auto lg:mx-0"
      >
        Read Report
      </Button>
    </div>
  );
};

export default Audit;
