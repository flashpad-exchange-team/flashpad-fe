import { useLoading } from '@/context/LoadingContext';
import LogoLoading from '@/icons/LogoLoading';
import styles from './loading.module.css';
const LoadingIndicator = () => {
  const { isLoading, loadingInfo } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000] top-[0px] z-50 ">
      <span className={styles.loader}></span>
      <div className="absolute text-center">
        <LogoLoading />
        {loadingInfo && (
          <div className="text-xl absolute top-[160px] w-[300px] left-[-110px]">
            {loadingInfo}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingIndicator;
