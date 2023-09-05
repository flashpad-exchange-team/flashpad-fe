import Link from 'next/link';

export const handleSuccessTxMessage = () => {
  return {
    mainMessage: (
      <div>
        {' '}
        You’ve successfully provied{' '}
        <span className="text-[#FFAF1D]">$0 of TOKEN A - TOKEN B </span>
        liquidity
      </div>
    ),
    subMessage: (
      <div>
        Head to the{' '}
        <Link href="/" className="text-[#FFAF1D]">
          {' '}
          dashboard page
        </Link>{' '}
        or the
        <Link href="/" className="text-[#FFAF1D]">
          {' '}
          pool page
        </Link>{' '}
        to check your poisition
      </div>
    ),
  };
};

export default function Utils() {
  return <div></div>;
}
