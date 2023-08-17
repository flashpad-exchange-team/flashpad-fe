/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
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
  }
});
