import Link from 'next/link';
import type { ReactNode } from 'react';
import { Button } from '@/components/button/Button';
// import { useAccount, useConnect, useDisconnect } from 'wagmi'
// import { InjectedConnector } from 'wagmi/connectors/injected'
import CrossSword from '@/icons/CrossSword';
type INavbarProps = {
  logo: ReactNode;
};

const Header = (props: INavbarProps) => {
  // const { address, isConnected } = useAccount()
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // })
  // const { disconnect } = useDisconnect()
  return (

    <div className="flex flex-wrap items-center justify-between bg-[#00000080] h-[80px] px-20">
      <div>
        <Link href="/">{props.logo}</Link>
      </div>
      <nav>
        <ul className="navbar flex items-center text-xl font-medium text-white">

          {/* <li>
            <Link href="/">Launch App</Link>
          </li>
          <li className='ml-8' >
            {
              isConnected ? <Button onClick={() => disconnect()}>{address ? (address.slice(0, 8) + '...' + address.slice(36, 42)) : ''}</Button> : <Button onClick={() => connect()}>Connect Wallet</Button>
            }
          </li> */}
          <Button onClick={() => { }} icon={<CrossSword />}>Launch App</Button>
        </ul>
      </nav>
    </div>
  );
}




export { Header };
