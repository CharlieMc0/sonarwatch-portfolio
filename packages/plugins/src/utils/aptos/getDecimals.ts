import { AptosClient } from 'aptos';
import { getCoinInfoResource } from './getCoinInfoResource';

export async function getDecimals(client: AptosClient, coinType: string) {
  const coinInfoResource = await getCoinInfoResource(client, coinType);
  if (!coinInfoResource) return null;
  return coinInfoResource.data.decimals;
}
