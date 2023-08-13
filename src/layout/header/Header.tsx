import { Button } from '@/components/button/Button';
import AddIcon from '@/icons/AddIcon';
import AnalyticsIcon from '@/icons/AnalyticsIcon';
import CrossSword from '@/icons/CrossSword';
import LaunchPadIcon from '@/icons/LaunchpadIcon';
import Linea from '@/icons/Linea';
import TradeIcon from '@/icons/TradeIcon';
import WalletIcon from '@/icons/WalletIcon';
import { Menu, MenuItem } from '@szhsin/react-menu';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import the useRouter hook
import type { ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect, useConfig } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { lineaTestnet } from 'wagmi/chains';

type INavbarProps = {
  logo: ReactNode;
  mode?: string;
};

const MENU_ITEMS = [
  {
    icon: <TradeIcon />,
    iconActive: <TradeIcon active />,
    name: 'Trade',
    path: '/',
    subMenu: [
      {
        name: 'Swap',
        path: '/swap',
      },
      {
        name: 'Liquidity',
        path: '/liquidity',
      },
    ],
  },
  {
    icon: <LaunchPadIcon />,
    iconActive: <LaunchPadIcon active />,
    name: 'Launchpad',
    path: '/launchpad',
  },
  {
    icon: <AnalyticsIcon />,
    iconActive: <AnalyticsIcon active />,
    name: 'Analytics',
    path: '/',
  },
  {
    icon: <AddIcon />,
    iconActive: <AddIcon active />,
    name: 'More',
    path: '/',
  },
];

const Header = (props: INavbarProps) => {
  const { address, isConnected } = useAccount();
  const { connectors } = useConfig();
  const { connect } = useConnect({ connector: connectors[0] });
  const { disconnect } = useDisconnect();
  const router = useRouter(); // Initialize the useRouter hook

  return (
    <div className="flex flex-wrap items-center justify-between bg-[#00000080] h-[80px] px-20">
      <div className="flex gap-5">
        <Link href="/" className="mr-2">
          {props.logo}
        </Link>
        {props.mode === 'app' &&
          MENU_ITEMS.map((menuItem: any, index: number) =>
            menuItem.subMenu ? (
              <Menu
                key={index}
                menuButton={
                  <div className="flex text-[18px] gap-1 items-center cursor-pointer hover:text-[#FFAF1D] hoverItem">
                    {menuItem.icon}
                    {menuItem.name}
                  </div>
                }
                transition
              >
                {menuItem?.subMenu?.map((item: any) => (
                  <MenuItem
                    className="bg-[#000000]"
                    key={item.name}
                    onClick={() => router.push(item.path)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            ) : (
              <div
                className="flex text-[18px] gap-1 items-center  cursor-pointer hover:text-[#FFAF1D] hoverItem"
                key={index}
              >
                {menuItem.icon}
                {menuItem.name}
              </div>
            )
          )}
      </div>
      <nav>
        <ul className="navbar flex items-center text-xl font-medium text-white">
          {props.mode === 'app' ? (
            <>
              <Linea className="mr-8" />
              {isConnected ? (
                <Button onClick={() => disconnect()} icon={<WalletIcon />}>
                  {address
                    ? address.slice(0, 8) + '...' + address.slice(36, 42)
                    : ''}
                </Button>
              ) : (
                <Button onClick={() => connect()} icon={<WalletIcon />}>
                  Connect Wallet
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={() => {
                router.push('/swap');
              }}
              icon={<CrossSword />}
            >
              Launch App
            </Button>
          )}
        </ul>
      </nav>
      <style jsx>
        {`
          .hoverItem::hover svg path {
            stroke: #ffc700;
          }
        `}
      </style>
    </div>
  );
};

export { Header };
