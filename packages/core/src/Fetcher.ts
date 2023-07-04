import { Context } from './Context';
import { NetworkIdType } from './Network';
import { PortfolioElement } from './Portfolio';
import { formatAddress } from './utils';

export type FetcherExecutor = (
  owner: string,
  context: Context
) => Promise<PortfolioElement[]>;
export type Fetcher = {
  id: string;
  networkId: NetworkIdType;
  executor: FetcherExecutor;
};

export function runFetcherExecutor(
  fetcher: Fetcher,
  owner: string,
  context: Context
) {
  const fOwner = formatAddress(owner, fetcher.networkId);
  return fetcher.executor(fOwner, context);
}
