import TickIcon from '@/icons/TickICon';
import WarningIcon from '../../icons/WarningIcon';
import InfoIcon from '@/icons/InfoIcon';
import { ReactNode } from 'react';
export interface NotificationProps {
  type?: 'error' | 'success' | 'info';
  message: string | ReactNode;
  hideIcon?: boolean;
}
const ToastContent = ({ type, message, hideIcon }: NotificationProps) => {
  const renderIcon = () => {
    switch (type) {
      case 'error':
        return <WarningIcon />;
      case 'success':
        return <TickIcon size={'24'} />;
      case 'info':
        return <InfoIcon />;
      default:
        return null;
    }
  };
  const renderBg = () => {
    switch (type) {
      case 'error':
        return 'bg-[#ff3522]';
      case 'success':
        return 'bg-[#17B26A]';
      case 'info':
        return 'bg-[#150E3980]';
      default:
        return null;
    }
  };
  return (
    <div
      className={`rounded-lg ${renderBg()} h-full min-h-[60px] py-4 px-6 flex items-center pr-12 w-full leading-4 gap-4 text-[14px] relative z-50 `}
    >
      <div className="w-[50] text-left">{hideIcon || renderIcon()}</div>
      {message}
    </div>
  );
};

export default ToastContent;
