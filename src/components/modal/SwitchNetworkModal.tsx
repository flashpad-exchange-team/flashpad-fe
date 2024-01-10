import CloseIcon from '@/icons/CloseIcon';
import CommonModal from './CommonModal';
import { Button } from '../button/Button';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import customToast from '../notification/customToast';
import { useSwitchNetwork } from 'wagmi';
import { APP_BASE_CHAIN } from '@/utils/constants';

interface SwitchNetworkModalProps {
  isOpen: boolean;
  toggleOpen: () => void;
}
const SwitchNetworkModal = ({
  isOpen,
  toggleOpen,
}: SwitchNetworkModalProps) => {
  const { switchNetworkAsync } = useSwitchNetwork();

  const handleSwitchNetwork = async () => {
    if (!switchNetworkAsync) {
      customToast({
        message: `Please switch to ${APP_BASE_CHAIN.name} on your browser wallet`,
        type: 'error',
      });
    } else {
      try {
        await switchNetworkAsync(APP_BASE_CHAIN.id);
      } catch (error: any) {
        customToast({
          message: error.message,
          type: 'error',
        });
        console.log(error);
      }
    }
    toggleOpen();
  };

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="550px">
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          Switch Network
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[14px] text-center">
        You need to switch to {APP_BASE_CHAIN.name} network to continue using
        <br />
        Flashpad
      </div>
      <div className="block lg:flex items-center gap-2">
        <Button
          onClick={handleSwitchNetwork}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
        >
          Switch To {APP_BASE_CHAIN.name}
        </Button>
      </div>
    </CommonModal>
  );
};

export default SwitchNetworkModal;
