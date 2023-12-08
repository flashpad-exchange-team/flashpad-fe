import { Button } from '@/components/button/Button';
import Notification from '@/components/notification/Notification';
import clsx from 'clsx';
import { useRouter } from 'next/router';

interface PoolsComponentProps {}

const PoolsComponent = ({}: PoolsComponentProps) => {
  const router = useRouter();

  return (
    <div className={clsx(['max-w-[1096px] w-full mx-auto mb-20 mt-28 px-2'])}>
      <div className="block lg:flex items-center justify-between">
        <div>
          <div className="font-bold">Pools</div>
          <div className="text-sm text-[#98A2B3] mt-2 font-semibold">
            Create positions into pools to earn swap fees and ART.
          </div>
        </div>
      </div>
      <div className="flex ml-1 my-4 ">
        <Button
          className={`w-[100px] ${'!bg-[#000] text-[#fff]'} x!rounded-[4px] !text-[16px] flex justify-center items-center`}
          onClick={() => router.push('/pools')}
        >
          LP V2
        </Button>
        <Button
          className={`w-[100px]  !rounded-[4px] !text-[16px] flex justify-center items-center`}
        >
          LP V3
        </Button>
      </div>

      <div className="mt-5 h-[340px]">
        <Notification message="Coming soon." type="info" />
      </div>
    </div>
  );
};

export default PoolsComponent;
