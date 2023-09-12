import React, { useEffect, useRef } from 'react';

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
  const modalRef = useRef(null as any);
  const handleClickOutside = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onRequestClose();
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
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#000000E5]">
        <div
          ref={modalRef}
          className={`relative w-auto my-6 mx-auto max-w-[90vw] bg-[#0A071E] p-[20px] pb-[30px]`}
          style={{ width }}
        >
          {children}
        </div>
      </div>
    </>
  ) : null;
};

export default CommonModal;
