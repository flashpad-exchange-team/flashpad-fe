import Link from 'next/link';
import type { ReactNode } from 'react';
import { Button } from '@/components/button/Button';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import CrossSword from '@/icons/CrossSword';
import WalletIcon from '@/icons/WalletIcon';
import { useRouter } from 'next/router'; // Import the useRouter hook

type INavbarProps = {
  logo: ReactNode;
  mode?: string
};

const Header = (props: INavbarProps) => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const router = useRouter(); // Initialize the useRouter hook

  return (

    <div className="flex flex-wrap items-center justify-between bg-[#00000080] h-[80px] px-20">
      <div>
        <Link href="/">{props.logo}</Link>
      </div>
      <nav>
        <ul className="navbar flex items-center text-xl font-medium text-white">
          {
            props.mode === 'app' ? <>
              {
                isConnected ? <Button onClick={() => disconnect()}>{address ? (address.slice(0, 8) + '...' + address.slice(36, 42)) : ''}</Button> : <Button onClick={() => connect()} icon={<WalletIcon />}>Connect Wallet</Button>
              }
            </> : <Button onClick={() => { router.push('/liquidity') }} icon={<CrossSword />}>Launch App</Button>
          }
        </ul>
      </nav>
    </div>
  );
}




export { Header };
