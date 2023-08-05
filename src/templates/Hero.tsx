import Link from 'next/link';

import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';
import { Button } from '@/button/Button';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const Hero = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  return (
    // <Background >
    <>
      <Section yPadding="py-6">
        <NavbarTwoColumns logo={<Logo xl />}>

          <li>
            <Link href="/">Launch App</Link>
          </li>
          <li className='ml-8' >
            {
              isConnected ? <Button onClick={() => disconnect()}>{address ? (address.slice(0, 8) + '...' + address.slice(36, 42)) : ''}</Button> : <Button onClick={() => connect()}>Connect Wallet</Button>
            }

          </li>
        </NavbarTwoColumns>
      </Section>

      <Section yPadding="pt-32 pb-32">
        <HeroOneButton
          title={
            <>
              <div className='text-white'> Welcome to</div>
              <span className="text-[#FFC700]">Arthur Exchange </span>
            </>
          }
          description="Arthur Exchange is an innovative and highly flexible DEX built to
          support the Linea ecosystem.
          Community driven and capital efficient."
        />
      </Section>
    </>

    // </Background>
  );
}

export { Hero };
