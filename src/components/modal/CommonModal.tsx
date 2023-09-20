import React, { useRef } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth';

interface ModalProps {
  isOpen: boolean;
  onRequestClose?: () => void;
  children: any;
  height?: string;
  className?: string;
  paddingBottom?: string;
  width?: string;
}

const CommonModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  width,
}) => {
  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 768;
  const parentRef = useRef(null as any);
  const handleParentClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === parentRef.current && onRequestClose) {
      onRequestClose();
    }
  };

  return isOpen ? (
    <>
      <div
        className="parent justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-[#000000E5]"
        onClick={handleParentClick}
        ref={parentRef}
      >
        <div
          className={` child overflow-auto max-h-[92vh] relative w-auto my-6 mx-auto max-w-[90vw] bg-[#0A071E] p-[20px] pb-[30px]`}
          style={{ width: isSmallScreen ? '90vw' : width }}
        >
          {children}
        </div>
      </div>
    </>
  ) : null;
};

export default CommonModal;
