import ArrowRight from '@/icons/ArrowRight';
import QuestionIcon from '@/icons/QuestionIcon';

const NotStaked = () => {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-dark">
        <tbody>
          <tr>
            <td className="py-4 text-sm  px-4 border-b border-[#344054] text-left w-[155px]">
              Incentives Settings
            </td>
            <td className="py-4 text-sm font-bold px-4 border-b border-[#344054] text-left w-[120px]"></td>
            <td className="py-4 text-sm font-bold px-4 border-b border-[#344054] text-left w-[120px]"></td>
            <td className="py-4 text-sm font-bold px-4 border-b border-[#344054] text-left w-[120px]"></td>
            <td className="py-4 text-sm font-bold px-4 border-b border-[#344054] text-left w-[120px]"></td>
            <td className="py-4 text-sm font-bold px-4 border-b border-[#344054] text-left w-[120px]"></td>
            <td className="py-4 text-sm font-bold px-4 border-b border-[#344054] text-left w-[120px]"></td>
          </tr>
          <tr className="hover:bg-darkBlue cursor-pointer">
            <td className="py-4 text-sm font-semibold px-4 border-b border-[#344054] text-left w-[150px]">
              <div className=" text-lightGray">APR Range</div>
              <div className="text-secondary flex items-center gap-1">
                20.3% <ArrowRight /> <span className="text-primary">20.3%</span>{' '}
                <QuestionIcon />
              </div>
            </td>
            <td className="py-4 text-sm font-semibold px-4 border-b border-[#344054] text-right w-[200px]">
              <div className="text-lightGray">Daily Emissions</div>
              <div>1.44 TOKEN</div>
            </td>
            <td className="py-4 text-sm font-semibold px-4 border-b border-[#344054] text-right w-[200px]">
              <div className="text-lightGray">TOKENB/XTOPKEN</div>
              <div className="flex gap-2 items-center justify-end">20%/80%</div>
            </td>
            <td className="py-4 text-sm font-semibold px-4 border-b border-[#344054] text-left w-[200px]">
              <div className="text-xs text-lightGray">Max Total MULT</div>
              <div className="flex gap-1 items-center justify-start">
                <div>3X</div>
              </div>
            </td>
            <td className="py-4 text-sm font-semibold px-4 border-b border-[#344054] text-left w-[200px]">
              <div className="text-xs text-lightGray">Max Boost MULT</div>
              <div className="flex gap-1 items-center justify-start">
                <div>2X</div>
              </div>
            </td>
            <td className="py-4 text-sm font-semibold px-4 border-b border-[#344054] text-left w-[200px]">
              <div className="text-xs text-lightGray">Max Lock MULT</div>
              <div className="flex gap-1 items-center justify-start">
                <div>2X</div>
              </div>
            </td>{' '}
            <td className="py-4 text-sm font-semibold px-4 border-b border-[#344054] text-left w-[200px]">
              <div className="text-xs text-lightGray">Max Lock </div>
              <div className="flex gap-1 items-center justify-start">
                <div>183 days</div>
              </div>
            </td>{' '}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NotStaked;
