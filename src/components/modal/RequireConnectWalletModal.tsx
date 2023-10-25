import { useModal } from '@/context/ModalContext';
import CloseIcon from '@/icons/CloseIcon';
import DividerDown from '@/icons/DividerDown';
import WalletIcon from '@/icons/WalletIcon';
import { Button } from '../button/Button';

const RequireWalletConnectModal = () => {
  const { toggleConnectWallet, toggleRequireConnect, isOpenRequireConnect } =
    useModal();

  if (!isOpenRequireConnect) return null;

  return (
    <div
      className="fixed inset-0  bg-[#000000E5] top-[0px] z-50 flex items-center justify-center"
      style={{ zIndex: 100 }}
    >
      <div className="w-[648px] bg-[#0A071E] p-6 text-center">
        <div className="flex items-center justify-between mb-2">
          <div></div>
          <div className="cursor-pointer">
            <CloseIcon />
          </div>
        </div>
        <div className="text-primary text-xl font-semibold">
          Please connect your wallet
        </div>
        <div className=" text-xl font-semibold">for the full experience!</div>

        <div className="mt-4 mb-4">
          <Button
            icon={<WalletIcon />}
            className="px-4 mx-auto !py-2"
            onClick={() => {
              toggleRequireConnect();
              toggleConnectWallet();
            }}
          >
            Connect Wallet
          </Button>
        </div>

        <DividerDown />
      </div>
    </div>
  );
};

export default RequireWalletConnectModal;
