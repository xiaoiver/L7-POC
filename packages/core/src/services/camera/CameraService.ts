import { inject, injectable } from 'inversify';
import { ILogger, LoggingContext } from 'inversify-logging';
import ICameraService from './CameraService';
import { TYPES } from '../../types';
import { IMapCamera } from '../map/IMapService';

@injectable()
@LoggingContext('CameraService')
export default class CameraService implements ICameraService {
  private mapCamera: Partial<IMapCamera>;

  @inject(TYPES.ILogService) logger: ILogger;

  update(mapCamera: Partial<IMapCamera>) {
    this.logger.info('camera updated...');
    this.mapCamera = mapCamera;
  }
}