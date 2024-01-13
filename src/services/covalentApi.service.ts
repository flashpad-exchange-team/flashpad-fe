import { Client } from '@covalenthq/client-sdk';
import { APP_BASE_CHAIN, COVALENT_API_KEY } from '@/utils/constants';
import { Chains } from '@covalenthq/client-sdk/dist/services/Client';

export const covalentClient = new Client(COVALENT_API_KEY);

export const getNFTsOwnedByAddress = async (
  address: string,
  erc721Contract: string,
) => {
  let chain: Chains;
  switch (APP_BASE_CHAIN.id) {
    case 80001:
      chain = 'matic-mumbai';
      break;
    case 59144:
      chain = 'linea-mainnet';
      break;
    case 59140:
    default:
      chain = 'linea-testnet';
  }

  try {
    const response = await covalentClient.NftService.getNftsForAddress(
      chain,
      address,
      {
        noNftAssetMetadata: false,
        noSpam: false,
        withUncached: true
      }
    );
    const owner = response.data?.address;
    const nftContractBalance = response.data?.items?.find((it) =>
      it.contract_address.toLowerCase() === erc721Contract.toLowerCase()
    );
    return nftContractBalance?.nft_data.map((e) => ({
      ...e,
      owner,
    })) || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
