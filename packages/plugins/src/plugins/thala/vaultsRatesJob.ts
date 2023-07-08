import { Cache, Job, JobExecutor } from '@sonarwatch/portfolio-core';
import {
  platformId,
  programAdressThala,
  vaultCollateralParamsFilter,
} from './constants';
import { getClientAptos } from '../../utils/clients';
import { VaultCollateralParamsRessource } from './types';
import { fp64ToFloat } from './helpers';
import { getAccountResources, getNestedType } from '../../utils/aptos';

const executor: JobExecutor = async (cache: Cache) => {
  const connection = getClientAptos();
  console.log('connection:', connection.nodeUrl);
  const vaultsRate = await getAccountResources(connection, programAdressThala);
  console.log('vaultsRate:', vaultsRate);
  if (!vaultsRate) return;

  vaultsRate.forEach((resource) => {
    if (!resource.type.startsWith(vaultCollateralParamsFilter)) return;
    if (!resource.data) return;
    const vaultData = resource.data as VaultCollateralParamsRessource;
    if (!vaultData) return;
    cache.setItem(
      getNestedType(resource.type),
      fp64ToFloat(BigInt(vaultData.interest_annual_rate_ratio.v)),
      {
        prefix: `${platformId}-vaultsRates`,
      }
    );
  });
};

const job: Job = {
  id: `${platformId}-vaults-rates`,
  executor,
};
export default job;
