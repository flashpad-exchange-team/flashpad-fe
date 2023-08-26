import { Button } from '@/components/button/Button';
import ConnectWalletModal from '@/components/modal/ConnectWalletModal';
import { useModal } from '@/context/ModalContext';
import AddIcon from '@/icons/AddIcon';
import AnalyticsIcon from '@/icons/AnalyticsIcon';
import ArrowDown from '@/icons/ArrowDown';
import CrossSword from '@/icons/CrossSword';
import LaunchPadIcon from '@/icons/LaunchpadIcon';
import Linea from '@/icons/Linea';
import Liquidity from '@/icons/Liquidity';
import Swap from '@/icons/Swap';
import TradeIcon from '@/icons/TradeIcon';
import WalletIcon from '@/icons/WalletIcon';
import { Menu, MenuItem } from '@szhsin/react-menu';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import the useRouter hook
import { ReactNode } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

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
        icon: <Swap width="18px" />,
      },
      {
        name: 'Liquidity',
        path: '/liquidity',
        icon: <Liquidity width="18px" />,
      },
    ],
  },
  {
    icon: <LaunchPadIcon />,
    iconActive: <LaunchPadIcon active />,
    name: 'Earn',
    path: '/earn',
    subMenu: [
      {
        name: 'Farming',
        path: '/farming',
        icon: <Liquidity width="18px" />,
      },
      {
        name: 'Staking',
        path: '/staking',
        icon: <Liquidity width="18px" />,
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
  const { disconnect } = useDisconnect();

  const router = useRouter();
  const { isOpenConnectWallet, toggleConnectWallet } = useModal();

  const handleConnectWallet = () => {
    if (!isConnected) {
      toggleConnectWallet();
      return;
    }
    disconnect();
  };

  const currentPath = router.pathname;
  return (
    <>
      <ConnectWalletModal
        isOpen={isOpenConnectWallet}
        toggleOpen={toggleConnectWallet}
      />
      <div className="bg-[#00000080] h-[80px] items-center flex ">
        <div className=" m-auto w-full flex flex-wrap items-center justify-between px-4 lg:px-20  max-w-[1440px]">
          <div
            className={clsx([
              'flex gap-5 ',
              props.mode === 'app' ? '' : 'mx-auto lg:mx-0',
            ])}
          >
            <Link href="/" className="lg:mr-2">
              {props.logo}
            </Link>
            {props.mode === 'app' &&
              MENU_ITEMS.map((menuItem: any) =>
                menuItem.subMenu ? (
                  <Menu
                    key={menuItem.path}
                    menuButton={
                      <div
                        className={clsx([
                          ' text-[18px] gap-1 items-center cursor-pointer hover:text-[#FFAF1D] hoverItem hidden lg:flex',
                          menuItem.path === currentPath ||
                          menuItem?.subMenu?.some(
                            (subMenu: any) => subMenu.path === currentPath
                          )
                            ? 'text-[#FFAF1D] active'
                            : '',
                        ])}
                      >
                        {menuItem.icon}
                        {menuItem.name}
                        <ArrowDown
                          stroke={
                            menuItem.path === currentPath ||
                            menuItem?.subMenu?.some(
                              (subMenu: any) => subMenu.path === currentPath
                            )
                              ? ''
                              : 'white'
                          }
                        />
                      </div>
                    }
                    transition
                  >
                    {menuItem?.subMenu?.map((item: any) => (
                      <MenuItem
                        className={clsx(['bg-[#000000] '])}
                        key={item.name}
                        onClick={() => router.push(item.path)}
                      >
                        <div
                          className={clsx([
                            'flex items-center gap-2',
                            item.path === currentPath
                              ? 'text-[#FFAF1D] active'
                              : '',
                          ])}
                        >
                          {item.icon}
                          {item.name}
                        </div>
                      </MenuItem>
                    ))}
                  </Menu>
                ) : (
                  <div
                    className={clsx([
                      'flex text-[18px] gap-1 items-center cursor-pointer hover:text-[#FFAF1D] hoverItem hidden lg:flex',
                      menuItem.path === currentPath
                        ? 'text-[#FFAF1D] active'
                        : '',
                    ])}
                    key={menuItem.path}
                  >
                    {menuItem.icon}
                    {menuItem.name}
                  </div>
                )
              )}
          </div>
          <nav>
            <ul className="navbar flex items-center text-[14px] lg:text-xl font-medium text-white">
              {props.mode === 'app' ? (
                <>
                  <Linea className="mr-8 hidden lg:block" />
                  {
                    <Button
                      icon={<WalletIcon />}
                      className="px-4 "
                      onClick={handleConnectWallet}
                    >
                      {isConnected && address
                        ? address.slice(0, 5) + '...' + address.slice(37, 42)
                        : 'Connect Wallet'}
                    </Button>
                  }
                </>
              ) : (
                <Button
                  onClick={() => {
                    router.push('/liquidity');
                  }}
                  icon={<CrossSword />}
                  className="hidden lg:flex px-[42px]"
                >
                  Launch App
                </Button>
              )}
            </ul>
          </nav>
        </div>
      </div>
      {props.mode === 'app' && (
        <div className="bg-[#0C111D] h-[78px] flex items-center justify-center fixed left-0 bottom-0 w-full lg:hidden">
          <div className="flex gap-6 ">
            {MENU_ITEMS.map((menuItem: any) =>
              menuItem.subMenu ? (
                <Menu
                  key={menuItem.path}
                  menuButton={
                    <div
                      className={clsx([
                        ' text-[14px] cursor-pointer ',
                        menuItem.path === currentPath ||
                        menuItem?.subMenu?.some(
                          (subMenu: any) => subMenu.path === currentPath
                        )
                          ? 'text-[#FFAF1D] active'
                          : '',
                      ])}
                    >
                      <div className=" w-fit ml-auto mr-auto mb-1 smallSVG">
                        {menuItem.icon}
                      </div>
                      {menuItem.name}
                    </div>
                  }
                  transition
                >
                  {menuItem?.subMenu?.map((item: any) => (
                    <MenuItem
                      className={clsx(['bg-[#000000] '])}
                      key={item.name}
                      onClick={() => router.push(item.path)}
                    >
                      <div
                        className={clsx([
                          'flex items-center gap-2',
                          item.path === currentPath
                            ? 'text-[#FFAF1D] active'
                            : '',
                        ])}
                      >
                        {item.icon}
                        {item.name}
                      </div>
                    </MenuItem>
                  ))}
                </Menu>
              ) : (
                <div
                  className={clsx([
                    ' text-[14px] gap-1 cursor-pointer text-center',
                    menuItem.path === currentPath
                      ? 'text-[#FFAF1D] active'
                      : '',
                  ])}
                  key={menuItem.path}
                >
                  <div className=" w-fit ml-auto mr-auto mb-1 smallSVG">
                    {menuItem.icon}
                  </div>{' '}
                  {menuItem.name}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export { Header };
