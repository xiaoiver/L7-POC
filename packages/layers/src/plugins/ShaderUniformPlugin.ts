import {
  CameraUniform,
  ICameraService,
  ILayer,
  ILayerPlugin,
  lazyInject,
  TYPES,
} from '@l7-poc/core';

/**
 * 在渲染之前需要获取当前 Shader 所需 Uniform，例如：
 * 1. 从相机服务中获取 View & ProjectionMatrix，当前缩放等级等等
 * 2. 从坐标系服务中获取当前坐标系，例如是否是偏移坐标系
 * 3. 当前 Layer 本身的样式属性
 */
export default class ShaderUniformPlugin implements ILayerPlugin {
  @lazyInject(TYPES.ICameraService)
  private readonly cameraService: ICameraService;

  public apply(layer: ILayer) {
    layer.hooks.beforeRender.tap('ShaderUniformPlugin', () => {
      // 相机参数
      layer.addUniforms({
        [CameraUniform.ProjectionMatrix]: this.cameraService.getProjectionMatrix(),
        [CameraUniform.ViewMatrix]: this.cameraService.getViewMatrix(),
        [CameraUniform.Zoom]: this.cameraService.getZoom(),
        [CameraUniform.ProjectionScale]: Math.pow(
          2,
          this.cameraService.getZoom(),
        ),
      });

      // TODO：脏检查，决定是否需要渲染
    });
  }
}
