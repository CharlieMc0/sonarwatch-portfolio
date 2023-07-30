import { Fetcher } from '../../Fetcher';
import { Job } from '../../Job';
import poolsJob from './poolsJob';
import clmmPositionFetcher from './clmmsPositionsFetcher';

export const jobs: Job[] = [poolsJob];
export const fetchers: Fetcher[] = [clmmPositionFetcher];
