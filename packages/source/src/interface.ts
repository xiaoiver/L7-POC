export type DataType = string | object[] | object;
export interface ISourceCFG {
  data: DataType;
  parser?: object;
  transfroms?: object;
}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface IFeatureKey {
  [key: string]: {
    index: number;
    idField: any;
  };
}
// 解析后返回数据类型
export interface IParseDataItem {
  coordinates: any[];
  id: number;
  [key: string]: any;
}
export interface IParserData {
  dataArray: IParseDataItem[];
  featureKeys: IFeatureKey;
}
