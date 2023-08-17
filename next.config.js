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
    ARTHUR_ROUTER_ADDRESS_LINEA_TESTNET: '0x9F423958b0e02d6C60D1714a37bc627C23C7d048',
    ARTHUR_FACTORY_ADDRESS_LINEA_TESTNET: '0xAEa8dd2bA90de46170C5ABBbBE5A187acddF21E8',
    ARTHUR_ROUTER_ADDRESS_SEPOLIA: '0x6EA6965E4E53F891180F1707Ca9d9767CCD33614',
    ARTHUR_FACTORY_ADDRESS_SEPOLIA: '0x943931387b8659A74752c8D7B890870899b4Fdaf',
  }
});
