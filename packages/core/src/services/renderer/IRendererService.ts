import IAttribute, { IAttributeInitializationOptions } from './IAttribute';
import IBuffer, { IBufferInitializationOptions } from './IBuffer';
import IElements, { IElementsInitializationOptions } from './IElements';
import IModel, { IModelInitializationOptions } from './IModel';

export default interface IRendererService {
  init($container: HTMLDivElement): Promise<void>;
  createModel(options: IModelInitializationOptions): IModel;
  createAttribute(options: IAttributeInitializationOptions): IAttribute;
  createBuffer(options: IBufferInitializationOptions): IBuffer;
  createElements(options: IElementsInitializationOptions): IElements;
}
