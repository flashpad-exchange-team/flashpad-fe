import useWindowWidth from '@/hooks/useWindowWith';
import CommonModal from './CommonModal';
import ConnectWalletDesktop from './ConnectWalletDesktop';
import ConnectWalletMobile from './ConnectWalletMobile';

export interface ConnectWalletModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
}

const ConnectWalletModal = ({
  toggleOpen,
  isOpen,
}: ConnectWalletModalProps) => {
  const windowWidth = useWindowWidth();

  const isSmallScreen = windowWidth <= 900;
  return (
    <CommonModal
      isOpen={isOpen}
      onRequestClose={toggleOpen}
      height={isSmallScreen ? '600px' : '378px'}
      className="big-modal"
      paddingBottom={'0'}
    >
      {isSmallScreen ? (
        <ConnectWalletMobile toggleOpen={toggleOpen} />
      ) : (
        <ConnectWalletDesktop toggleOpen={toggleOpen} />
      )}
    </CommonModal>
  );
};

export default ConnectWalletModal;
