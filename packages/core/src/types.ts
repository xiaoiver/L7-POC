const TYPES = {
  IGlobalConfigService: Symbol.for('IGlobalConfigService'),
  ICameraService: Symbol.for('ICameraService'),
  ICoordinateSystemService: Symbol.for('ICoordinateSystemService'),
  ILayerService: Symbol.for('ILayerService'),
  ILayerStyleService: Symbol.for('ILayerStyleService'),
  ILogService: 'ILogger',
  IMapService: Symbol.for('IMapService'),
  IRendererService: Symbol.for('IRendererService'),
  IShaderModuleService: Symbol.for('IShaderModuleService'),

  /** multi-pass */
  ClearPass: Symbol.for('ClearPass'),
  RenderPass: Symbol.for('RenderPass'),
  CopyPass: Symbol.for('CopyPass'),
  BlurHPass: Symbol.for('BlurHPass'),
  BlurVPass: Symbol.for('BlurVPass'),
};

export { TYPES };
