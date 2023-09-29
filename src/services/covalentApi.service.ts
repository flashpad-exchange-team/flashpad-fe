import { Client } from '@covalenthq/client-sdk';
import { COVALENT_API_KEY, IS_LINEA } from '@/utils/constants';

export const covalentClient = new Client(COVALENT_API_KEY);

export const getNFTsOwnedByAddress = async (
  address: string,
  erc721Contract: string,
) => {
  const chain = IS_LINEA ? 'linea-testnet' : 'matic-mumbai';
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
    const nftContractBalance = response.data?.items?.find((it) =>
      it.contract_address.toLowerCase() === erc721Contract.toLowerCase()
    );
    return nftContractBalance?.nft_data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
