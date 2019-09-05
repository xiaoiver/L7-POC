import { inject, injectable } from 'inversify';
import { ILogger, LoggingContext } from 'inversify-logging';
import { TYPES } from '../../types';
import { IMapCamera } from '../map/IMapService';
import ICameraService from './CameraService';

@injectable()
@LoggingContext('CameraService')
export default class CameraService implements ICameraService {
  @inject(TYPES.ILogService) public logger: ILogger;
  private mapCamera: Partial<IMapCamera>;

  public update(mapCamera: Partial<IMapCamera>) {
    this.logger.info('camera updated...');
    this.mapCamera = mapCamera;
  }
}
