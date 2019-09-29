type CallBack = (...args: any[]) => any;
export type AttrOption = string | number | boolean | any[] | CallBack;
export type ActiveOption =
  | boolean
  | {
      fill: string;
    };
interface ITransform {
  type: string;
  [key: string]: any;
  callback: CallBack;
}

export interface ISourceOption {
  parser?: {
    type: string;
    x?: string;
    y?: string;
    x1?: string;
    y2?: string;
    coordinates?: any[];
    [key: string]: any;
  };
  transforms?: ITransform[];
}
