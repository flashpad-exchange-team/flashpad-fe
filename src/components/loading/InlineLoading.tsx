import ReloadIcon from '@/icons/ReloadIcon';
import styles from './loading.module.css';

interface InlineLoadingProps {
  message?: string;
  className?: string;
}

const InlineLoading = ({ message, className }: InlineLoadingProps) => {
  return (
    <div className={'text-sm flex items-center gap-3 ' + (className || '')}>
      <div className={styles.loadingContainer}>
        <ReloadIcon />
      </div>

      {message}
    </div>
  );
};
export default InlineLoading;
