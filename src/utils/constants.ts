import { Address } from 'viem';
import { linea, lineaTestnet, polygonMumbai } from 'wagmi/chains';

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

export const IS_LINEA = process.env.NEXT_PUBLIC_IS_LINEA === 'true' || true;

export const ADDRESS_ZERO: Address =
  '0x0000000000000000000000000000000000000000';

export const MAX_UINT256 =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const FLASHPAD_API_URL =
  process.env.NEXT_PUBLIC_FLASHPAD_API_URL || 'https://testnet-api.flashpad.io';

export const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;

export const ALCHEMY_MUMBAI_API_KEY =
  process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_API_KEY;

export const LINEA_INFURA_RPC = process.env.NEXT_PUBLIC_LINEA_INFURA_RPC;

export const MUMBAI_ALCHEMY_RPC = process.env.NEXT_PUBLIC_MUMBAI_ALCHEMY_RPC;

export const RPC_URL = IS_LINEA ? LINEA_INFURA_RPC : MUMBAI_ALCHEMY_RPC;

export const MUMBAI_EXPLORER_URL =
  process.env.NEXT_PUBLIC_MUMBAI_EXPLORER_URL ||
  'https://mumbai.polygonscan.com';

export const LINEA_EXPLORER_URL =
  process.env.NEXT_PUBLIC_LINEA_EXPLORER_URL ||
  'https://goerli.lineascan.build';

export const CHAIN_EXPLORER_URL = IS_LINEA
  ? LINEA_EXPLORER_URL
  : MUMBAI_EXPLORER_URL;

export const APP_BASE_CHAIN = IS_LINEA
  ? ENVIRONMENT === 'production'
    ? linea
    : lineaTestnet
  : polygonMumbai;

// Linea network
export const FLASHPAD_ROUTER_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_FLASHPAD_ROUTER_ADDRESS_LINEA ||
  '0xBeEE10e632A02352788fc0Afcd92b9e79d702d8A';

export const FLASHPAD_FACTORY_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_FLASHPAD_FACTORY_ADDRESS_LINEA ||
  '0xb19c2510dA6d5799FD23e43DA2CA8f5669C1C78d';

export const FLASH_TOKEN_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_FLASH_TOKEN_ADDRESS_LINEA ||
  '0x85030dBAAc0739312dC9983363ca57E22A3AA2C1';

export const X_FLASH_TOKEN_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_X_FLASH_TOKEN_ADDRESS_LINEA ||
  '0x9E48B10A010d0AF0217c63aef50589B10C0d1128';

export const FLASHPAD_MASTER_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_FLASHPAD_MASTER_ADDRESS_LINEA ||
  '0xAb7Aa215aC9eAeAE65601B8250Ae851Fb3E97D32';

export const THUNDER_POOL_FACTORY_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_THUNDER_POOL_FACTORY_ADDRESS_LINEA ||
  '0x5F622d1d08C7488d8632B8A42122f672041dd396';

export const NFT_POOL_FACTORY_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_NFT_POOL_FACTORY_ADDRESS_LINEA ||
  '0x9374d8c4a89706f0f4d7B497ae12cd15CF3676D9';

export const YIELD_BOOSTER_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_YIELD_BOOSTER_ADDRESS_LINEA ||
  '0x1727305d518423A15C588b82F94068cACDB9aF86';

export const POSITION_HELPER_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_POSITION_HELPER_ADDRESS_LINEA ||
  '0x3AC30f682866b7D4a9048074967BcAeB74E1Ae31';

export const DIVIDENDS_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_DIVIDENDS_ADDRESS_LINEA ||
  '0x562438cB4b59F9eD78e336792Ae83BE46E72CCe4';

export const LAUNCHPAD_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_LAUNCHPAD_ADDRESS_LINEA ||
  '0xE41B229e860Ce5676e7F7a0697347f56ff630642';

export const WETH_ADDRESS_LINEA =
  process.env.NEXT_PUBLIC_WETH_ADDRESS_LINEA ||
  '0xbe2C5113EebFe4C083da31346534CEA1cd2bBC46';

// Mumbai testnet
export const FLASHPAD_ROUTER_ADDRESS_MUMBAI =
  process.env.NEXT_PUBLIC_FLASHPAD_ROUTER_ADDRESS_MUMBAI ||
  '0x764EcF27DF3df771D1c79f48A05aB18d2b6BBa10';

export const FLASHPAD_FACTORY_ADDRESS_MUMBAI =
  process.env.NEXT_PUBLIC_FLASHPAD_FACTORY_ADDRESS_MUMBAI ||
  '0x943931387b8659A74752c8D7B890870899b4Fdaf';

export const FLASH_TOKEN_ADDRESS_MUMBAI =
  process.env.NEXT_PUBLIC_FLASH_TOKEN_ADDRESS_MUMBAI ||
  '0x9F423958b0e02d6C60D1714a37bc627C23C7d048';

export const X_FLASH_TOKEN_ADDRESS_MUMBAI =
  process.env.NEXT_PUBLIC_X_FLASH_TOKEN_ADDRESS_MUMBAI ||
  '0xB0B291F942C0f71F6E9b02fd038BC4e8cEac3965';

export const FLASHPAD_MASTER_ADDRESS_MUMBAI =
  process.env.NEXT_PUBLIC_FLASHPAD_MASTER_ADDRESS_MUMBAI ||
  '0x226596f693F12FF580A832b047c66FECC5397d25';

export const THUNDER_POOL_FACTORY_ADDRESS_MUMBAI =
  process.env.NEXT_PUBLIC_THUNDER_POOL_FACTORY_ADDRESS_MUMBAI ||
  '0x95D37Feb6e4Df0F1d17DcB80A755f8DAb849C71F';

export const NFT_POOL_FACTORY_ADDRESS_MUMBAI =
  process.env.NEXT_PUBLIC_NFT_POOL_FACTORY_ADDRESS_MUMBAI ||
  '0x3DE501F374fd285C61E96F1039be564438D3eA33';

export const YIELD_BOOSTER_ADDRESS_MUMBAI =
  process.env.NEXT_PUBLIC_YIELD_BOOSTER_ADDRESS_MUMBAI ||
  '0x47474a6B2a0514055b90C9a0F919A0d9f1FF1722';

export const POSITION_HELPER_ADDRESS_MUMBAI =
  process.env.NEXT_PUBLIC_POSITION_HELPER_ADDRESS_MUMBAI ||
  '0x90C163cf7C29C449548EF605545d618009F1C74A';

export const WETH_ADDRESS_MUMBAI =
  process.env.NEXT_PUBLIC_WETH_ADDRESS_MUMBAI ||
  '0xc82f14458f68f076A4f2E756dB24B56A3C670bB4';

export const FLASHPAD_FACTORY_ADDRESS = IS_LINEA
  ? FLASHPAD_FACTORY_ADDRESS_LINEA
  : FLASHPAD_FACTORY_ADDRESS_MUMBAI;

export const FLASHPAD_ROUTER_ADDRESS = IS_LINEA
  ? FLASHPAD_ROUTER_ADDRESS_LINEA
  : FLASHPAD_ROUTER_ADDRESS_MUMBAI;

export const FLASH_TOKEN_ADDRESS = IS_LINEA
  ? FLASH_TOKEN_ADDRESS_LINEA
  : FLASH_TOKEN_ADDRESS_MUMBAI;

export const X_FLASH_TOKEN_ADDRESS = IS_LINEA
  ? X_FLASH_TOKEN_ADDRESS_LINEA
  : X_FLASH_TOKEN_ADDRESS_MUMBAI;

export const FLASHPAD_MASTER_ADDRESS = IS_LINEA
  ? FLASHPAD_MASTER_ADDRESS_LINEA
  : FLASHPAD_MASTER_ADDRESS_MUMBAI;

export const THUNDER_POOL_FACTORY_ADDRESS = IS_LINEA
  ? THUNDER_POOL_FACTORY_ADDRESS_LINEA
  : THUNDER_POOL_FACTORY_ADDRESS_MUMBAI;

export const NFT_POOL_FACTORY_ADDRESS = IS_LINEA
  ? NFT_POOL_FACTORY_ADDRESS_LINEA
  : NFT_POOL_FACTORY_ADDRESS_MUMBAI;

export const YIELD_BOOSTER_ADDRESS = IS_LINEA
  ? YIELD_BOOSTER_ADDRESS_LINEA
  : YIELD_BOOSTER_ADDRESS_MUMBAI;

export const POSITION_HELPER_ADDRESS = IS_LINEA
  ? POSITION_HELPER_ADDRESS_LINEA
  : POSITION_HELPER_ADDRESS_MUMBAI;

export const DEFAULT_SLIPPAGE =
  process.env.NEXT_PUBLIC_DEFAULT_SLIPPAGE || '0.5';
export const DEFAULT_DEADLINE =
  process.env.NEXT_PUBLIC_DEFAULT_DEADLINE || '10';
export const DEFAULT_MAX_HOPS = process.env.NEXT_PUBLIC_DEFAULT_MAX_HOPS || '4';

export const DEFAULT_TIME_LOCK = '0';

export const K_5_MIN = BigInt(300);

export const K_1_DAY = BigInt(86400);

export const K_1_WEEK = BigInt(604800);

export const minutesToSeconds = (minutes: number) => {
  return BigInt(minutes * 60);
};

export const daysToSeconds = (days: number) => {
  return BigInt(days * 86400);
};

export const secondsToDays = (seconds: number | string | BigInt) => {
  return Number(seconds) / 86400;
};

export interface IERC20TokenMetadata {
  chainId?: number;
  chainURI?: string;
  tokenId?: string;
  tokenType?: string[];
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  createdAt?: string;
  updatedAt?: string;
  logoURI?: string;
  [key: string]: any;
  id?: string
}

export const LINEA_TOKENS_LIST: IERC20TokenMetadata[] = [
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenId:
      'https://goerli.lineascan.build/token/0xD2340c4ec834bf43c05B9EcCd60EeD3a20892Dcc',
    tokenType: ['native'],
    address: '0xD2340c4ec834bf43c05B9EcCd60EeD3a20892Dcc',
    name: 'APE',
    symbol: 'APE',
    decimals: 18,
    createdAt: '2023-04-10',
    updatedAt: '2023-04-10',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png',
  },
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenId:
      'https://goerli.lineascan.build/token/0x5471ea8f739dd37E9B81Be9c5c77754D8AA953E4',
    tokenType: ['native'],
    address: '0x5471ea8f739dd37E9B81Be9c5c77754D8AA953E4',
    name: 'Test BNB',
    symbol: 'tBNB',
    decimals: 18,
    createdAt: '2023-06-23',
    updatedAt: '2023-06-23',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  },
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenId:
      'https://goerli.lineascan.build/token/0xeEfF322f4590A1A84BB3486d4BA0038669A811aD',
    tokenType: ['native'],
    address: '0xeEfF322f4590A1A84BB3486d4BA0038669A811aD',
    name: 'Test DOGE',
    symbol: 'tDOGE',
    decimals: 18,
    createdAt: '2023-06-27',
    updatedAt: '2023-06-27',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
  },
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenId:
      'https://goerli.lineascan.build/token/0x6F03052743CD99ce1b29265E377e320CD24Eb632',
    tokenType: ['bridged'],
    address: '0x6F03052743CD99ce1b29265E377e320CD24Eb632',
    name: 'HOP',
    symbol: 'HOP',
    decimals: 18,
    createdAt: '2023-04-27',
    updatedAt: '2023-04-27',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/20547.png',
    extension: {
      rootChainId: 5,
      rootChainURI: 'https://goerli.etherscan.io/block/0',
      rootAddress: '0x38aF6928BF1Fd6B3c768752e716C49eb8206e20c',
    },
  },
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenId:
      'https://goerli.lineascan.build/token/0xcAA61BCAe7D37Fe9C33c0D8671448254eef44D63',
    tokenType: ['native'],
    address: '0xcAA61BCAe7D37Fe9C33c0D8671448254eef44D63',
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
    createdAt: '2023-06-23',
    updatedAt: '2023-06-23',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
  },
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenId:
      'https://goerli.lineascan.build/token/0x7823e8dcc8bfc23ea3ac899eb86921f90e80f499',
    tokenType: ['bridged'],
    address: '0x7823e8dcc8bfc23ea3ac899eb86921f90e80f499',
    name: 'Uniswap',
    symbol: 'UNI',
    decimals: 18,
    createdAt: '2023-06-26',
    updatedAt: '2023-06-26',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    extension: {
      rootChainId: 5,
      rootChainURI: 'https://goerli.etherscan.io/block/0',
      rootAddress: '0x41E5E6045f91B61AACC99edca0967D518fB44CFB',
    },
  },
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenId:
      'https://goerli.lineascan.build/token/0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
    tokenType: ['bridged'],
    address: '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
    name: 'Test USD Coin',
    symbol: 'tUSDC',
    decimals: 18,
    createdAt: '2023-06-23',
    updatedAt: '2023-06-23',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    extension: {
      rootChainId: 5,
      rootChainURI: 'https://goerli.etherscan.io/block/0',
      rootAddress: '0xd35cceead182dcee0f148ebac9447da2c4d449c4',
    },
  },
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenId:
      'https://goerli.lineascan.build/token/0x1990BC6dfe2ef605Bfc08f5A23564dB75642Ad73',
    tokenType: ['bridged'],
    address: '0x1990BC6dfe2ef605Bfc08f5A23564dB75642Ad73',
    name: 'Test USD Tether',
    symbol: 'tUSDT',
    decimals: 6,
    createdAt: '2023-06-27',
    updatedAt: '2023-06-27',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    extension: {
      rootChainId: 5,
      rootChainURI: 'https://goerli.etherscan.io/block/0',
      rootAddress: '0xfad6367E97217cC51b4cd838Cc086831f81d38C2',
    },
  },
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenId:
      'https://goerli.lineascan.build/token/0x347b29EFca2f921fFc776Cdc01AF785f043368c6',
    tokenType: ['bridged'],
    address: '0x347b29EFca2f921fFc776Cdc01AF785f043368c6',
    name: 'USD Tether',
    symbol: 'USDT',
    decimals: 6,
    createdAt: '2023-06-27',
    updatedAt: '2023-06-27',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    extension: {
      rootChainId: 5,
      rootChainURI: 'https://goerli.etherscan.io/block/0',
      rootAddress: '0xfad6367E97217cC51b4cd838Cc086831f81d38C2',
    },
  },
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenId:
      'https://goerli.lineascan.build/token/0xDbcd5BafBAA8c1B326f14EC0c8B125DB57A5cC4c',
    tokenType: ['native'],
    address: '0xDbcd5BafBAA8c1B326f14EC0c8B125DB57A5cC4c',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    decimals: 18,
    createdAt: '2023-06-23',
    updatedAt: '2023-06-23',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png',
  },
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenId:
      'https://goerli.lineascan.build/token/0x2C1b868d6596a18e32E61B901E4060C872647b6C',
    tokenType: ['native'],
    address: '0x2C1b868d6596a18e32E61B901E4060C872647b6C',
    name: 'Wrapped Ethereum',
    symbol: 'WETH',
    decimals: 18,
    createdAt: '2023-06-26',
    updatedAt: '2023-06-26',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png',
  },
  {
    chainId: 59140,
    chainURI: 'https://goerli.lineascan.build/block/0',
    tokenType: ['native'],
    address: WETH_ADDRESS_LINEA as Address,
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    address: '0xc1888F2Dc85A9C51F2f3f13fAaB5C06077bB235f',
    decimals: 8,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xEc6BC0023a2607B88D8E0F3A67a5210d7BDb7534',
    decimals: 8,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
  },
  {
    symbol: 'DOGE',
    name: 'DOGE Coin',
    address: '0x42472dB3d10d5AA6dE423F876CA555f803eF8ADD',
    decimals: 8,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
  },
  {
    symbol: 'SHIB',
    name: 'Shiba Coin',
    address: '0x8B57916D9C0a6D97422590eF545Dd721cF46734b',
    decimals: 8,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
    // logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
  },
  {
    symbol: 'FLASH',
    name: 'FLASH',
    address: FLASH_TOKEN_ADDRESS_LINEA as Address,
    decimals: 18,
    logoURI:
      'https://miro.medium.com/v2/resize:fill:176:176/1*SofrInDrWUdEp91z7iv28w.png',
  },
  {
    symbol: 'xFLASH',
    name: 'xFLASH',
    address: X_FLASH_TOKEN_ADDRESS_LINEA as Address,
    decimals: 18,
    logoURI:
      'https://miro.medium.com/v2/resize:fill:176:176/1*SofrInDrWUdEp91z7iv28w.png',
  },
];

export const MUMBAI_TOKENS_LIST: IERC20TokenMetadata[] = [
  {
    chainId: 80001,
    tokenType: ['native'],
    address: WETH_ADDRESS_MUMBAI as Address,
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  {
    symbol: 'FBNB',
    name: 'Binance Coin',
    address: '0xf6256d44c86edc560d2912a937a0ae485ad37cae',
    decimals: 8,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  },
  {
    symbol: 'FUSDC',
    name: 'USD Coin',
    address: '0xbc1feea515fc2375f04531e7997c79b29dc5e3cc',
    decimals: 8,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
  },
  {
    symbol: 'FDOGE',
    name: 'DOGE Coin',
    address: '0x3e050b8990dee1f11da42dafafaf61237f33c676',
    decimals: 8,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
  },
  {
    symbol: 'FLASH',
    name: 'Flash Token',
    address: FLASH_TOKEN_ADDRESS_MUMBAI as Address,
    decimals: 18,
  },
  {
    symbol: 'xFLASH',
    name: 'XFlash Token',
    address: X_FLASH_TOKEN_ADDRESS_MUMBAI as Address,
    decimals: 18,
  },
];

export const LINEA_MAINNET_TOKENS_LIST: IERC20TokenMetadata[] = [

  // {
  //   "chainId": 59144,
  //   "chainURI": "https://lineascan.build/block/0",
  //   "tokenId": "https://lineascan.build/address/0xe0f0035FFaba23872AC4D7F2240c0b5265a000f1",
  //   "tokenType": [
  //     "canonical-bridge"
  //   ],
  //   "address": "0xe0f0035FFaba23872AC4D7F2240c0b5265a000f1",
  //   "name": "ALT",
  //   "symbol": "ALT",
  //   "decimals": 18,
  //   "createdAt": "2023-11-04",
  //   "updatedAt": "2023-11-04",
  //   "extension": {
  //     "rootChainId": 1,
  //     "rootChainURI": "https://etherscan.io/block/0",
  //     "rootAddress": "0xC1e2A416ea16d2d7FDc8Ff0890C60109a262A176"
  //   }
  // },
  // {
  //   "chainId": 59144,
  //   "chainURI": "https://lineascan.build/block/0",
  //   "tokenId": "https://lineascan.build/address/0x1578f35532FA091EcED8638730F9dB829930ce16",
  //   "tokenType": [
  //     "canonical-bridge"
  //   ],
  //   "address": "0x1578f35532FA091EcED8638730F9dB829930ce16",
  //   "name": "Angle Protocol",
  //   "symbol": "agEUR",
  //   "decimals": 18,
  //   "createdAt": "2023-08-22",
  //   "updatedAt": "2023-08-22",
  //   "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/15024.png",
  //   "extension": {
  //     "rootChainId": 1,
  //     "rootChainURI": "https://etherscan.io/block/0",
  //     "rootAddress": "0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8"
  //   }
  // },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xff8069906C1BdD7650c889f54639a5fcE486ca3e",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0xff8069906C1BdD7650c889f54639a5fcE486ca3e",
    "name": "Ankr Staked ETH",
    "symbol": "ankrETH",
    "decimals": 18,
    "createdAt": "2023-10-17",
    "updatedAt": "2023-10-17",
    "logoURI": "https://assets.coingecko.com/coins/images/13403/large/aETHc.png?1696513165",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0xE95A203B1a91a908F9B9CE46459d101078c2c3cb"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x6bAA318CF7C51C76e17ae1EbE9Bbff96AE017aCB",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x6bAA318CF7C51C76e17ae1EbE9Bbff96AE017aCB",
    "name": "ApeCoin",
    "symbol": "APE",
    "decimals": 18,
    "createdAt": "2023-08-08",
    "updatedAt": "2023-08-08",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x4d224452801aced8b2f0aebe155379bb5d594381"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x660edb0A46c3f69be9eFF5446318593b9469F9e2",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x660edb0A46c3f69be9eFF5446318593b9469F9e2",
    "name": "Balancer",
    "symbol": "BAL",
    "decimals": 18,
    "createdAt": "2023-12-10",
    "updatedAt": "2023-12-10",
    "logoURI": "https://assets.coingecko.com/coins/images/11683/large/Balancer.png?1696511572",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0xba100000625a3754423978a60c9317c58a424e3D"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x5B16228B94b68C7cE33AF2ACc5663eBdE4dCFA2d",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x5B16228B94b68C7cE33AF2ACc5663eBdE4dCFA2d",
    "name": "ChainLink Token",
    "symbol": "LINK",
    "decimals": 18,
    "createdAt": "2023-08-08",
    "updatedAt": "2023-08-08",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x514910771af9ca656af840dff83e8264ecf986ca"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5",
    "name": "Dai Stablecoin",
    "symbol": "DAI",
    "decimals": 18,
    "createdAt": "2023-08-08",
    "updatedAt": "2023-08-08",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x6b175474e89094c44da98b954eedeac495271d0f"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x4aCde18aCDE7F195E6Fb928E15Dc8D83D67c1f3A",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x4aCde18aCDE7F195E6Fb928E15Dc8D83D67c1f3A",
    "name": "Deri",
    "symbol": "DERI",
    "decimals": 18,
    "createdAt": "2023-11-19",
    "updatedAt": "2023-11-19",
    "logoURI": "https://assets.coingecko.com/coins/images/13931/large/200vs200.jpg?1696513670",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0xA487bF43cF3b10dffc97A9A744cbB7036965d3b9"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x1f031f8c523b339c7a831355879e3568fa3eb263",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x1f031f8c523b339c7a831355879e3568fa3eb263",
    "name": "DeversiFi Token",
    "symbol": "DVF",
    "decimals": 18,
    "createdAt": "2023-08-10",
    "updatedAt": "2023-08-10",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/10759.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0xdddddd4301a082e62e84e43f474f044423921918"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x70359c1eeB98eb3D12eE7178359a4541ff11Cc8E",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x70359c1eeB98eb3D12eE7178359a4541ff11Cc8E",
    "name": "DSLA Protocol",
    "symbol": "DSLA",
    "decimals": 18,
    "createdAt": "2023-08-22",
    "updatedAt": "2023-08-22",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/5423.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x0A79e44c99505c7f388CA30c787ff97217E73ecC",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x0A79e44c99505c7f388CA30c787ff97217E73ecC",
    "name": "Frax Share",
    "symbol": "FXS",
    "decimals": 18,
    "createdAt": "2023-08-22",
    "updatedAt": "2023-08-22",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/6953.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xe516a5CFf996cc399EFBb48355FD5Ab83438E7a9",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0xe516a5CFf996cc399EFBb48355FD5Ab83438E7a9",
    "name": "Gnosis Token",
    "symbol": "GNO",
    "decimals": 18,
    "createdAt": "2023-08-21",
    "updatedAt": "2023-08-21",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/1659.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x6810e776880C02933D47DB1b9fc05908e5386b96"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x894134a25a5faC1c2C26F1d8fBf05111a3CB9487",
    "tokenType": [
      "bridge-reserved",
      "external-bridge"
    ],
    "address": "0x894134a25a5faC1c2C26F1d8fBf05111a3CB9487",
    "name": "Gravita Debt Token",
    "symbol": "GRAI",
    "decimals": 18,
    "createdAt": "2023-12-07",
    "updatedAt": "2023-12-07",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/25337.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x15f74458aE0bFdAA1a96CA1aa779D715Cc1Eefe4"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x0e5F2ee8C29e7eBc14e45dA7FF90566d8c407dB7",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x0e5F2ee8C29e7eBc14e45dA7FF90566d8c407dB7",
    "name": "HAPI Protocol",
    "symbol": "HAPI",
    "decimals": 18,
    "createdAt": "2023-08-07",
    "updatedAt": "2023-08-07",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/8567.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0xd9c2d319cd7e6177336b0a9c93c21cb48d84fb54"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xa5d4117511938c71615d5b714B7E58c04C112D16",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0xa5d4117511938c71615d5b714B7E58c04C112D16",
    "name": "izumi Token",
    "symbol": "iZi",
    "decimals": 18,
    "createdAt": "2023-10-17",
    "updatedAt": "2023-10-17",
    "logoURI": "https://assets.coingecko.com/coins/images/21791/large/izumi-logo-symbol.png?1696521144",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x9ad37205d608B8b219e6a2573f922094CEc5c200"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x3b2F62d42DB19B30588648bf1c184865D4C3B1D6",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x3b2F62d42DB19B30588648bf1c184865D4C3B1D6",
    "name": "Kyber Network Crystal v2",
    "symbol": "KNC",
    "decimals": 18,
    "createdAt": "2023-08-08",
    "updatedAt": "2023-08-08",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/9444.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x0e076AAFd86a71dCEAC65508DAF975425c9D0cB6",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x0e076AAFd86a71dCEAC65508DAF975425c9D0cB6",
    "name": "Lido DAO Token",
    "symbol": "LDO",
    "decimals": 18,
    "createdAt": "2023-08-08",
    "updatedAt": "2023-08-08",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/8000.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x5a98fcbea516cf06857215779fd812ca3bef1b32"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xd83af4fbd77f3ab65c3b1dc4b38d7e67aecf599a",
    "tokenType": [
      "native"
    ],
    "address": "0xd83af4fbd77f3ab65c3b1dc4b38d7e67aecf599a",
    "name": "Linea XP",
    "symbol": "LXP",
    "decimals": 18,
    "createdAt": "2023-12-06",
    "updatedAt": "2023-12-06",
    "logoURI": "https://linea.build/favicon-32x32.png"
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x974aFBd15Ad987dB9336F4Ac10d35a4FF32e31C5",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x974aFBd15Ad987dB9336F4Ac10d35a4FF32e31C5",
    "name": "Linear Token",
    "symbol": "LINA",
    "decimals": 18,
    "createdAt": "2023-11-20",
    "updatedAt": "2023-11-20",
    "logoURI": "https://assets.coingecko.com/coins/images/12509/large/1649227343-linalogo200px.png?1696512324",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x3E9BC21C9b189C09dF3eF1B824798658d5011937"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x1bE3735Dd0C0Eb229fB11094B6c277192349EBbf",
    "tokenType": [
      "native"
    ],
    "address": "0x1bE3735Dd0C0Eb229fB11094B6c277192349EBbf",
    "name": "LUBE",
    "symbol": "LUBE",
    "decimals": 18,
    "createdAt": "2023-11-19",
    "updatedAt": "2023-11-19",
    "logoURI": "https://pbs.twimg.com/profile_images/1725003585157787648/4nbkBLVA_400x400.jpg"
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x9D36f49D3d42B3A9BcC0f5Ac76fF8ef78fB2bC01",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x9D36f49D3d42B3A9BcC0f5Ac76fF8ef78fB2bC01",
    "name": "Lybra Finance",
    "symbol": "LBR",
    "decimals": 18,
    "createdAt": "2023-08-22",
    "updatedAt": "2023-08-22",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/24700.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0xF1182229B71E79E504b1d2bF076C15a277311e05"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xf3B001D64C656e30a62fbaacA003B1336b4ce12A",
    "tokenType": [
      "native"
    ],
    "address": "0xf3B001D64C656e30a62fbaacA003B1336b4ce12A",
    "name": "Mai Stablecoin",
    "symbol": "MAI",
    "decimals": 18,
    "createdAt": "2023-11-20",
    "updatedAt": "2023-11-20",
    "logoURI": "https://assets.coingecko.com/coins/images/15264/small/mimatic-red.png"
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x2442Bd7AE83b51F6664De408A385375fe4a84F52",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x2442Bd7AE83b51F6664De408A385375fe4a84F52",
    "name": "Maker",
    "symbol": "MKR",
    "decimals": 18,
    "createdAt": "2023-08-22",
    "updatedAt": "2023-08-22",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/1518.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xe742f157d65355d51c6Df82f04A703F3081c3e81",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0xe742f157d65355d51c6Df82f04A703F3081c3e81",
    "name": "Matic Token",
    "symbol": "MATIC",
    "decimals": 18,
    "createdAt": "2023-10-17",
    "updatedAt": "2023-10-17",
    "logoURI": "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1696505277",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xA6eb75B11b36FB9175fB94C5b96959879A26C2A8",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0xA6eb75B11b36FB9175fB94C5b96959879A26C2A8",
    "name": "Meta Apes Peel",
    "symbol": "PEEL",
    "decimals": 18,
    "createdAt": "2023-08-24",
    "updatedAt": "2023-08-30",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/21013.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x1ed81e03d7ddb67a21755d02ed2f24da71c27c55"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x3E5D9D8a63CC8a88748f229999CF59487e90721e",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x3E5D9D8a63CC8a88748f229999CF59487e90721e",
    "name": "MetalSwap",
    "symbol": "XMT",
    "decimals": 18,
    "createdAt": "2023-11-23",
    "updatedAt": "2023-11-23",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/15006.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x3E5D9D8a63CC8a88748f229999CF59487e90721e"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xd2bc272EA0154A93bf00191c8a1DB23E67643EC5",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0xd2bc272EA0154A93bf00191c8a1DB23E67643EC5",
    "name": "Pax Dollar",
    "symbol": "USDP",
    "decimals": 18,
    "createdAt": "2023-08-21",
    "updatedAt": "2023-08-21",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/3330.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x8E870D67F660D95d5be530380D0eC0bd388289E1"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x7da14988E4f390C2E34ed41DF1814467D3aDe0c3",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x7da14988E4f390C2E34ed41DF1814467D3aDe0c3",
    "name": "Pepe",
    "symbol": "PEPE",
    "decimals": 18,
    "createdAt": "2023-08-08",
    "updatedAt": "2023-08-08",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/24478.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x6982508145454ce325ddbe47a25d4ec3d2311933"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x13a7f090d46c74acba98c51786a5c46ed9a474f0",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x13a7f090d46c74acba98c51786a5c46ed9a474f0",
    "name": "ScamFari",
    "symbol": "SCM",
    "decimals": 18,
    "createdAt": "2023-08-11",
    "updatedAt": "2023-09-01",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/27863.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x8353b92201f19B4812EeE32EFd325f7EDe123718"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x663B43Bd9aC6E45461A73b2115eEFd7278383f20",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x663B43Bd9aC6E45461A73b2115eEFd7278383f20",
    "name": "SENET",
    "symbol": "SNT",
    "decimals": 18,
    "createdAt": "2023-12-22",
    "updatedAt": "2023-12-22",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0xC309aB7b475A9B2292b1060E0EDf7D158cdddB07"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x99AD925C1Dc14Ac7cc6ca1244eeF8043C74E99d5",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x99AD925C1Dc14Ac7cc6ca1244eeF8043C74E99d5",
    "name": "SHIBA INU",
    "symbol": "SHIB",
    "decimals": 18,
    "createdAt": "2023-08-08",
    "updatedAt": "2023-08-08",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/14341.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x536e731a8Ae166173D8875Ad55567B00F264b7b4",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x536e731a8Ae166173D8875Ad55567B00F264b7b4",
    "name": "SIDUS",
    "symbol": "SIDUS",
    "decimals": 18,
    "createdAt": "2023-10-17",
    "updatedAt": "2023-10-17",
    "logoURI": "https://assets.coingecko.com/coins/images/21401/large/SIDUS_coin_logo.png?1696520765",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x549020a9Cb845220D66d3E9c6D9F9eF61C981102"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xb6489De309cb0b37fce5821D99F7300451eE6F68",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0xb6489De309cb0b37fce5821D99F7300451eE6F68",
    "name": "SOCURE",
    "symbol": "SCR",
    "decimals": 18,
    "createdAt": "2023-10-17",
    "updatedAt": "2023-10-17",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x540E6FE50A07579968eC37e77f15BEC8DbdB79D9"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x93F4d0ab6a8B4271f4a28Db399b5E30612D21116",
    "tokenType": [
      "native"
    ],
    "address": "0x93F4d0ab6a8B4271f4a28Db399b5E30612D21116",
    "name": "Stone Liquidity Ether Token",
    "symbol": "STONE",
    "decimals": 18,
    "createdAt": "2023-09-28",
    "updatedAt": "2023-12-07",
    "logoURI": "https://static.shieldex.io/stone/stone-3.svg"
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x6EF95B6f3b0F39508e3E04054Be96D5eE39eDE0d",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x6EF95B6f3b0F39508e3E04054Be96D5eE39eDE0d",
    "name": "Symbiosis",
    "symbol": "SIS",
    "decimals": 18,
    "createdAt": "2023-08-22",
    "updatedAt": "2023-08-22",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/15084.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0xd38BB40815d2B0c2d2c866e0c72c5728ffC76dd9"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xA219439258ca9da29E9Cc4cE5596924745e12B93",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0xA219439258ca9da29E9Cc4cE5596924745e12B93",
    "name": "Tether USD",
    "symbol": "USDT",
    "decimals": 6,
    "createdAt": "2023-08-08",
    "updatedAt": "2023-08-08",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xe322E20738386766F769b0a6083f4141083d26d0",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0xe322E20738386766F769b0a6083f4141083d26d0",
    "name": "THORChain ETH.RUNE",
    "symbol": "RUNE",
    "decimals": 18,
    "createdAt": "2023-10-17",
    "updatedAt": "2023-10-17",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x3155BA85D5F96b2d030a4966AF206230e46849cb"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x636B22bC471c955A8DB60f28D4795066a8201fa3",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x636B22bC471c955A8DB60f28D4795066a8201fa3",
    "name": "Uniswap",
    "symbol": "UNI",
    "decimals": 18,
    "createdAt": "2023-08-08",
    "updatedAt": "2023-08-08",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xC84f2ce21272f17d92d2a450F1C8567bF0ff448E",
    "tokenType": [
      "native"
    ],
    "address": "0xC84f2ce21272f17d92d2a450F1C8567bF0ff448E",
    "name": "US KUMA Interest Bearing Token",
    "symbol": "USK",
    "decimals": 18,
    "createdAt": "2023-11-02",
    "updatedAt": "2023-11-02",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/27290.png"
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
    "tokenType": [
      "bridge-reserved",
      "external-bridge"
    ],
    "address": "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
    "name": "USD Coin",
    "symbol": "USDC",
    "decimals": 6,
    "createdAt": "2023-08-04",
    "updatedAt": "2023-08-04",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xB79DD08EA68A908A97220C76d19A6aA9cBDE4376",
    "tokenType": [
      "native"
    ],
    "address": "0xB79DD08EA68A908A97220C76d19A6aA9cBDE4376",
    "name": "USD+",
    "symbol": "USD+",
    "decimals": 6,
    "createdAt": "2023-08-16",
    "updatedAt": "2023-09-26",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/20317.png"
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x68592c5c98c4f4a8a4bc6da2121e65da3d1c0917",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x68592c5c98c4f4a8a4bc6da2121e65da3d1c0917",
    "name": "USDLR by Stable",
    "symbol": "USDLR",
    "decimals": 6,
    "createdAt": "2023-11-08",
    "updatedAt": "2023-11-08",
    "logoURI": "https://storage.googleapis.com/public.withstable.com/logos/usdlr/dark-circle.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x68592c5c98c4f4a8a4bc6da2121e65da3d1c0917"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x1E1F509963A6D33e169D9497b11c7DbFe73B7F13",
    "tokenType": [
      "native"
    ],
    "address": "0x1E1F509963A6D33e169D9497b11c7DbFe73B7F13",
    "name": "USDT+",
    "symbol": "USDT+",
    "decimals": 6,
    "createdAt": "2023-08-16",
    "updatedAt": "2023-09-26",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/24962.png"
  },
  {
    "chainId": 1,
    "chainURI": "https://etherscan.io/block/0",
    "tokenId": "https://etherscan.io/address/0x6729659F4D81DdbD6Ac48ddDA9C5D62c01081B5D",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x6729659F4D81DdbD6Ac48ddDA9C5D62c01081B5D",
    "name": "Velocore LP: SCM + ETH",
    "symbol": "SCM-ETH-VLP",
    "decimals": 18,
    "createdAt": "2023-10-13",
    "updatedAt": "2023-10-13",
    "extension": {
      "rootChainId": 59144,
      "rootChainURI": "https://lineascan.build/block/0",
      "rootAddress": "0xd4e9b2e8d6B360980A3a75a3C69B3C3040a89008"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4",
    "name": "Wrapped BTC",
    "symbol": "WBTC",
    "decimals": 8,
    "createdAt": "2023-08-04",
    "updatedAt": "2023-08-04",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
    "tokenType": [
      "native"
    ],
    "address": "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
    "name": "Wrapped Ether",
    "symbol": "WETH",
    "decimals": 18,
    "createdAt": "2023-08-08",
    "updatedAt": "2023-08-08",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png"
  },
  {
    "chainId": 59140,
    "chainURI": 'https://lineascan.build/block/0',
    "tokenType": ['native'],
    "address": WETH_ADDRESS_LINEA as Address,
    "name": 'Linea Ethereum',
    "symbol": 'ETH',
    "decimals": 18,
    "logoURI": 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F",
    "name": "Wrapped liquid staked Ether 2.0",
    "symbol": "wstETH",
    "decimals": 18,
    "createdAt": "2023-08-15",
    "updatedAt": "2023-08-15",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/12409.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x8C56017B172226fE024dEa197748FC1eaccC82B1",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x8C56017B172226fE024dEa197748FC1eaccC82B1",
    "name": "XFai",
    "symbol": "XFIT",
    "decimals": 18,
    "createdAt": "2023-08-22",
    "updatedAt": "2023-08-22",
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/9217.png",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x4aa41bC1649C9C3177eD16CaaA11482295fC7441"
    }
  },
  {
    "chainId": 59144,
    "chainURI": "https://lineascan.build/block/0",
    "tokenId": "https://lineascan.build/address/0x6807857Ab19c24e1a8f4B73453C477E1B59a5854",
    "tokenType": [
      "canonical-bridge"
    ],
    "address": "0x6807857Ab19c24e1a8f4B73453C477E1B59a5854",
    "name": "ԼІΝЕА",
    "symbol": "Ŀ",
    "decimals": 18,
    "createdAt": "2023-10-25",
    "updatedAt": "2023-10-25",
    "extension": {
      "rootChainId": 1,
      "rootChainURI": "https://etherscan.io/block/0",
      "rootAddress": "0x00000000fEB6A772307C6aA88AB9D57b209aCb18"
    }
  }
]

export const CHAINS_TOKENS_LIST = IS_LINEA
  ? ENVIRONMENT === 'production'
    ? LINEA_MAINNET_TOKENS_LIST
    : LINEA_TOKENS_LIST
  : MUMBAI_TOKENS_LIST;

export const RESERVOIR_MUMBAI_API_BASE_URL =
  process.env.NEXT_PUBLIC_RESERVOIR_MUMBAI_API_BASE_URL ||
  'https://api-mumbai.reservoir.tools';
export const RESERVOIR_LINEA_API_BASE_URL =
  process.env.NEXT_PUBLIC_RESERVOIR_LINEA_API_BASE_URL ||
  'https://api-linea.reservoir.tools';
export const RESERVOIR_API_KEY =
  process.env.NEXT_PUBLIC_RESERVOIR_API_KEY || '';

export const RESERVOIR_API_BASE_URL = IS_LINEA
  ? RESERVOIR_LINEA_API_BASE_URL
  : RESERVOIR_MUMBAI_API_BASE_URL;

export const COVALENT_API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY || '';

export const USD_PRICE = 1;
