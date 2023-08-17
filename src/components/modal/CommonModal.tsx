import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: any;
  height?: string;
  className?: string;
  paddingBottom?: string;
}

const CommonModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  height,
  paddingBottom,
  className,
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false} // Prevents an accessibility issue
      style={{
        overlay: {
          backgroundColor: '#000000E5', // Overlay background color
        },
        content: {
          border: 'none', // Remove border
          borderRadius: '8px', // Customize border radius
          padding: '20px', // Customize padding
          top: '50%', // Center vertically
          left: '50%', // Center horizontally
          transform: 'translate(-50%, -50%)', // Center content
          backgroundColor: '#0A071E',
          height: height || 700,
          overflow: 'hidden',
          position: 'fixed',
          paddingBottom,
        },
      }}
      className={`${styles.modal} ${
        className === 'big-modal' && styles.bigModal
      }`}
    >
      {children}
    </ReactModal>
  );
};

export default CommonModal;
