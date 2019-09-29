import { AsyncParallelHook, SyncHook } from 'tapable';
import IModel from '../renderer/IModel';
import { ILayerStyleOptions } from './ILayerStyleService';
import { ActiveOption, AttrOption, ISourceOption } from './interface';

export interface ILayer {
  name: string;
  // visible: boolean;
  // zIndex: number;
  // type: string;
  // id: number;
  styleOptions: ILayerStyleOptions;
  plugins: ILayerPlugin[];
  hooks: {
    init: SyncHook<unknown>;
    beforeRender: SyncHook<unknown>;
    afterRender: SyncHook<unknown>;
  };
  models: IModel[];
  init(): void;
  get(name: string): any;
  set(name: string, value: any): any;
  // size(field: string, value: AttrOption): ILayer;
  // color(field: string, value: AttrOption): ILayer;
  // shape(field: string, value: AttrOption): ILayer;
  // pattern(field: string, value: AttrOption): ILayer;
  // filter(field: string, value: AttrOption): ILayer;
  // active(option: ActiveOption): ILayer;
  // style(options: ILayerStyleOptions): ILayer;
  // hide(): ILayer;
  // show(): ILayer;
  // animate(field: string, option: any): ILayer;
  prepareRender(): void;
  render(): any;
  source(data: any, option?: ISourceOption): any;
  addPlugin(plugin: ILayerPlugin): void;
}

export interface ILayerPlugin {
  apply(layer: ILayer): void;
}

/**
 * 提供 Layer 管理服务
 */
export default interface ILayerService {
  hooks: {
    /**
     * 渲染前调用
     */
    beforeRender: AsyncParallelHook<ILayer[]>;
    /**
     * 渲染后调用
     */
    afterRender: AsyncParallelHook<ILayer[]>;
  };
  add(layer: ILayer): void;
  initLayers(): void;
  renderLayers(): Promise<void>;
}
