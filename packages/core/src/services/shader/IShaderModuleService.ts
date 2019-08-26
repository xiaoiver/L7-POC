/**
 * 提供 ShaderModule 管理服务
 */

export interface IModuleParams {
  vs: string;
  fs: string;
  uniforms?: {
    [key: string]: any;
  }
}

export default interface IShaderModuleService {
  registerModule(moduleName: string, moduleParams: IModuleParams): void;
  getModule(moduleName: string): IModuleParams;

  /**
   * 注册 L7 内置 shader module
   */
  registerBuiltinModules(): void;
}