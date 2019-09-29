export type CallbackType = (...params: any[]) => any[];
export interface IAttributeCfg {
  readonly type?: string;
  readonly scales?: any[];
  readonly values?: any[];
  readonly callback?: CallbackType;
  readonly names?: string[];
}
