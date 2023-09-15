import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';

export interface LockManageModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
}

const WithdrawalModal = ({ toggleOpen, isOpen }: LockManageModalProps) => {
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="550px">
      <div className="flex items-center justify-center w-full">
        <div className="text-sm mx-auto flex items-center justify-center">
          <div className="relative -mt-[30px]">
            <div className="absolute">
              <BNBICon size={34} />
            </div>
            <div className="absolute left-[25px]">
              <BNBICon size={34} />
            </div>
          </div>
          <div className="ml-[70px]">
            <div className="text-bold">Token A - Token B</div>
            <div className="text-xs font-normal">#ID-1644</div>
          </div>
        </div>
        <div className="cursor-pointer pb-[20px]" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-center text-2xl">
        <span className="text-[#E6B300]">Withdraw</span> from your position
      </div>
      <div className="text-center text-secondary mb-5">
        Recover underlying tokens from a spNFT
      </div>
      <div className="p-2 bg-blue-opacity-50 flex justify-between">
        <div className="text-[#98A2B3]">Amount</div>
        <div>0.0000000004564</div>
      </div>
      <div className="px-2 bg-blue-opacity-50 flex justify-between">
        <div className="text-[#fff]">Balance: 0.0000000000 Name - Name</div>
        <Button className="w-[50px] h-[10px] rounded-none flex justify-center items-center">
          Max
        </Button>
      </div>

      <div className="p-2 my-4 mb-5 bg-blue-opacity-50">Options</div>
      <div className="p-2 flex justify-between">
        <div>
          <div className="text-lg">LP auto-unbind</div>
          <div className="text-secondary text-sm">
            Auto unbind your underlying LP tokens
          </div>
        </div>
        <div className="flex">
          <Button className="w-[50px] bg-[#000] text-[#fff] rounded-none flex justify-center items-center">
            On
          </Button>
          <Button className="w-[50px] rounded-none flex justify-center items-center">
            OFF
          </Button>
        </div>
      </div>
      <div className="p-2 my-4 mb-5 bg-blue-opacity-50 text-xl">Estimates</div>

      <div className="p-2 flex justify-between">
        <div>Withdrawal amount</div>
        <div>$0.42</div>
      </div>

      <div className="p-2 flex justify-between">
        <div>Remaining amount</div>
        <div>$0.42</div>
      </div>

      <div className="block lg:flex items-center gap-2">
        <Button
          className="w-full justify-center mt-2 mb-2 px-[42px]"
          type="secondary"
          onClick={toggleOpen}
        >
          Cancel
        </Button>
        <Button className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]">
          Withdraw
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default WithdrawalModal;
