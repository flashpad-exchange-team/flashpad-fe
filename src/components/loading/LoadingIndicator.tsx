import { useLoading } from '@/context/LoadingContext';
import LogoLoading from '@/icons/LogoLoading';
import styles from './loading.module.css';
const LoadingIndicator = () => {
  const { isLoading } = useLoading();
  //   const [progress, setProgress] = useState(0);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setProgress((prevProgress) => {
  //         if (prevProgress === 100)
  //           setTimeout(() => {
  //             stopLoading();
  //             setProgress(0);
  //           }, 700);
  //         return prevProgress < 100 ? prevProgress + 2 : 100;
  //       });
  //     }, 50);

  //     return () => clearInterval(interval);
  //   }, []);

  if (!isLoading) return null;
  //   const [progress, setProgress] = useState(0);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000] top-[0px] z-50 ">
      <span className={styles.loader}></span>
      <div className="absolute text-center">
        <LogoLoading />
        {/* <div className="mt-2">{progress}%</div> */}
      </div>
    </div>
  );
};

export default LoadingIndicator;
