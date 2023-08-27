/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  images: {
    domains: ['s2.coinmarketcap.com'], // Add other domains if needed
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  env: {
    ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET: '0x90C163cf7C29C449548EF605545d618009F1C74A',
    ARTHUR_FACTORY_ADDRESS_LINEA_TESTNET: '0x95D37Feb6e4Df0F1d17DcB80A755f8DAb849C71F',
    ARTHUR_ROUTER_ADDRESS_SEPOLIA: '0x6EA6965E4E53F891180F1707Ca9d9767CCD33614',
    ARTHUR_FACTORY_ADDRESS_SEPOLIA: '0x943931387b8659A74752c8D7B890870899b4Fdaf',
    ARTHUR_ROUTER_ADDRESS_MUMBAI: '0x764EcF27DF3df771D1c79f48A05aB18d2b6BBa10',
    ARTHUR_FACTORY_ADDRESS_MUMBAI: '0x943931387b8659A74752c8D7B890870899b4Fdaf',
    INFURA_API_KEY: '05c28399eaf04b1e85c6cfa2a8393c17',
    ALCHEMY_MUMBAI_API_KEY: 'WdVyQ6veso2rTs_AyIPpYog4hbQt3uj6',
    LINEA_GOERLI_INFURA_RPC: 'https://linea-goerli.infura.io/v3/05c28399eaf04b1e85c6cfa2a8393c17',
    MUMBAI_ALCHEMY_RPC: 'https://polygon-mumbai.g.alchemy.com/v2/WdVyQ6veso2rTs_AyIPpYog4hbQt3uj6',
    DEFAULT_SLIPPAGE: '0.5',
    DEFAULT_DEADLINE: '10',
    DEFAULT_MAX_HOPS: '4',
  }
});