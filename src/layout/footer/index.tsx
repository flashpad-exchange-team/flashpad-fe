import useWindowWidth from '@/hooks/useWindowWith';
import FooterMobile from './FooterMobile';
import FooterDesktop from './FooterDesktop';

const Footer = () => {
  const windowWidth = useWindowWidth();

  // Define breakpoints for responsiveness
  const isSmallScreen = windowWidth < 768;
  const isMediumScreen = windowWidth >= 768 && windowWidth < 1024;
  const isLargeScreen = windowWidth >= 1024;

  return isSmallScreen ? <FooterMobile /> : <FooterDesktop />;
};

export default Footer;
