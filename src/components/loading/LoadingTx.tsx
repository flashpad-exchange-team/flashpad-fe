import { useLoading } from '@/context/LoadingContext';
import DividerDown from '@/icons/DividerDown';
import ReloadIcon from '@/icons/ReloadIcon';
import styles from './loading.module.css';
const LoadingTx = () => {
  const { isLoadingTx, loadingTxInfo } = useLoading();

  if (!isLoadingTx) return null;

  return (
    <div
      className="fixed inset-0  bg-[#000000E5] top-[0px]  flex items-center justify-center"
      style={{ zIndex: 100 }}
    >
      <div className="w-[648px] bg-[#0A071E] p-6 text-center">
        <div className="flex items-center justify-between mb-2">
          <div>{loadingTxInfo?.tokenPairs}</div>
        </div>
        <div className={styles.loadingContainer}>
          <ReloadIcon />
        </div>
        <div className="text-2xl my-2 font-bold">{loadingTxInfo?.title}</div>
        <div className="text-lg text-[#98A2B3] mb-2">
          {loadingTxInfo?.message}
        </div>
        <DividerDown />
      </div>
    </div>
  );
};

export default LoadingTx;
