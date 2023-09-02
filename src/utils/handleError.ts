import customToast from '@/components/notification/customToast';

export const handleError = (error: any) => {
  console.log({ error });
  const errMsg =
    error?.shortMessage ||
    error?.message ||
    error?.toString() ||
    'An error occurred';
  customToast({
    type: 'error',
    message: errMsg,
  });
};
