import customToast from '@/components/notification/customToast';
import { APP_BASE_CHAIN } from './constants';

const handleSwitchNetwork = async (switchNetworkAsync: any) => {
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
};

export default handleSwitchNetwork;
