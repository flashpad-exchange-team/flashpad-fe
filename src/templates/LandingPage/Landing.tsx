import { Header } from '@/layout/header/Header';
import { Logo } from '../Logo';
import ArthurKingdom from './ArthurKingdom';
import Audit from './Audit';
import Banner from './Banner';
import Features from './Features';
// import Founder from './Founder';
import Partner from './Partner';
import Roadmap from './Roadmap';
import Tokenomic from './Tokenomic';

const Landing = () => {
  return (
    <>
      <Header logo={<Logo xl />} fixed />
      <Banner />
      <Features />
      {/* <Founder /> */}
      <Audit />
      <Partner />
      <Tokenomic />
      <Roadmap />
      <ArthurKingdom />
    </>
  );
};

export { Landing };
