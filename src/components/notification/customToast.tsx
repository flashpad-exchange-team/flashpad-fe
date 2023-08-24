import { toast } from 'react-toastify';
import { NotificationProps } from './Notification';
import ToastContent from './ToastContent';

const customToast = ({
  message,
  type,
  hideIcon,
  autoClose,
}: NotificationProps) => {
  toast(<ToastContent message={message} type={type} hideIcon={hideIcon} />, {
    autoClose,
  });
};

export default customToast;
