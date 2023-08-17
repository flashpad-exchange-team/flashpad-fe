export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET = process.env.ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET || '0x90C163cf7C29C449548EF605545d618009F1C74A';

export const ARTHUR_FACTORY_ADDRESS_LINEA_TESTNET = process.env.ARTHUR_FACTORY_ADDRESS_LINEA_TESTNET || '0x95D37Feb6e4Df0F1d17DcB80A755f8DAb849C71F';

console.log({ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET})

export const K_5_MIN = BigInt(300);

export const K_1_DAY = BigInt(86400);

export const K_1_WEEK = BigInt(604800);

export const LINEA_TESTNET_TOKENS_LIST = [
  {
    symbol: 'FBNB',
    name: 'Binance Coin',
    address: '0xc1888F2Dc85A9C51F2f3f13fAaB5C06077bB235f',
  },
  {
    symbol: 'FUSDC',
    name: 'USD Coin',
    address: '0xEc6BC0023a2607B88D8E0F3A67a5210d7BDb7534',
  },
  {
    symbol: 'FDOGE',
    name: 'DOGE Coin',
    address: '0x42472dB3d10d5AA6dE423F876CA555f803eF8ADD',
  },
]

export const SEPOLIA_TOKENS_LIST = [
  {
    symbol: 'FBNB',
    name: 'Binance Coin',
    address: '0xEc6BC0023a2607B88D8E0F3A67a5210d7BDb7534',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x42472dB3d10d5AA6dE423F876CA555f803eF8ADD',
  },
  {
    symbol: 'DOGE',
    name: 'DOGE Coin',
    address: '0xBA31B6F6c207fFEbd26b8d03aF1a29CCC3b3ec4b',
  },
];
