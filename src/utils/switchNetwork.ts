import customToast from '@/components/notification/customToast';
import { APP_BASED_CHAIN } from './constants';

const handleSwitchNetwork = async (switchNetworkAsync: any) => {
  if (!switchNetworkAsync) {
    customToast({
      message: `Please switch to ${APP_BASED_CHAIN.name} on your browser wallet`,
      type: 'error',
    });
  } else {
    try {
      await switchNetworkAsync(APP_BASED_CHAIN.id);
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
