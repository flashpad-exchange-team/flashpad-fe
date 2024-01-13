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

export const CHAINS_TOKENS_LIST = IS_LINEA
  ? LINEA_TOKENS_LIST
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
