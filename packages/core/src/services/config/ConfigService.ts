import { inject, injectable } from 'inversify';
import IGlobalConfigService, { IGlobalConfig } from './IConfigService';

@injectable()
export default class GlobalConfigService implements IGlobalConfigService {
  private config: Partial<IGlobalConfig>;

  public getConfig() {
    return this.config;
  }

  public setAndCheckConfig(config: Partial<IGlobalConfig>) {
    this.config = config;
    // TODO: validate config
    return true;
  }
}
