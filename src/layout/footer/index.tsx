import useWindowWidth from '@/hooks/useWindowWith';
import FooterDesktop from './FooterDesktop';
import FooterMobile from './FooterMobile';

const Footer = () => {
  const windowWidth = useWindowWidth();

  const isSmallScreen = windowWidth < 768;

  return isSmallScreen ? <FooterMobile /> : <FooterDesktop />;
};

export default Footer;
