import TickIcon from '@/icons/TickICon';
import WarningIcon from '../../icons/WarningIcon';
import InfoIcon from '@/icons/InfoIcon';
import { ReactNode } from 'react';
export interface NotificationProps {
  type?: 'error' | 'success' | 'info';
  message: string | ReactNode;
  hideIcon?: boolean;
}
const Notification = ({ type, message, hideIcon }: NotificationProps) => {
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
        return 'bg-[#FF160033]';
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
      className={`rounded-lg ${renderBg()} min-h-[56px] flex items-center pl-4 pr-6 leading-4 mb-2 gap-2 text-[14px]`}
    >
      {hideIcon || renderIcon()}
      {message}
    </div>
  );
};

export default Notification;
