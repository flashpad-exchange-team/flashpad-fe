import Link from 'next/link';

import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  // <Background >
  <>
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>

        <li>
          <Link href="/">Launch App</Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-32 pb-32">
      <HeroOneButton
        title={
          <>
            <div className='text-white'> Welcome to</div>
            <span className="text-[#FFC700]">Arthur Exchange</span>
          </>
        }
        description="Arthur Exchange is an innovative and highly flexible DEX built to
        support the Arbitrum ecosystem.
        Community driven and capital efficient."
      />
    </Section>
  </>

  // </Background>
);

export { Hero };
