import useWindowWidth from '@/hooks/useWindowWidth';
import FooterDesktop from './FooterDesktop';
import FooterMobile from './FooterMobile';
import { getAllPoolsInfo } from '@/api/lp-pairs';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [info, setInfo] = useState({});
  const windowWidth = useWindowWidth();

  const isSmallScreen = windowWidth < 768;

  useEffect(() => {
    getAllPoolsInfo().then(setInfo);
  }, []);

  return isSmallScreen ? (
    <FooterMobile info={info} />
  ) : (
    <FooterDesktop info={info} />
  );
};

export default Footer;
