import React, { useEffect, useRef } from 'react';
import useWindowWidth from '@/hooks/useWindowWith';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
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
  const modalRef = useRef(null as any);
  const handleClickOutside = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      const isDatePicker = e.target.classList.contains('cursor-pointer');
      const isModalContent = e.target.closest('.modal-content');
      if (!isDatePicker && !isModalContent) {
        onRequestClose();
      }
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return isOpen ? (
    <>
      <div className="justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-[#000000E5]">
        <div
          ref={modalRef}
          className={`overflow-auto max-h-[92vh] relative w-auto my-6 mx-auto max-w-[90vw] bg-[#0A071E] p-[20px] pb-[30px]`}
          style={{ width: isSmallScreen ? '90vw' : width }}
        >
          {children}
        </div>
      </div>
    </>
  ) : null;
};

export default CommonModal;
