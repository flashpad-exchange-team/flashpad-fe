import { useLoading } from '@/context/LoadingContext';
import DividerDown from '@/icons/DividerDown';
import ReloadIcon from '@/icons/ReloadIcon';
import styles from './loading.module.css';
const LoadingTx = () => {
  const { isLoadingTx, loadingTxInfo } = useLoading();

  if (!isLoadingTx) return null;

  return (
    <div className="fixed inset-0  bg-[#000000E5] top-[0px] z-50 flex items-center justify-center">
      <div className="w-[648px] bg-[#0A071E] p-6 text-center">
        <div className="flex items-center justify-between mb-2">
          <div>{loadingTxInfo?.tokenPairs}</div>
        </div>
        <div className={styles.loadingContainer}>
          <ReloadIcon />
        </div>
        <div className="text-[24px] my-2 font-bold">{loadingTxInfo?.title}</div>
        <div className="text-[18px] text-[#98A2B3] mb-2">
          {loadingTxInfo?.message}
        </div>
        <DividerDown />
      </div>
    </div>
  );
};

export default LoadingTx;
