export type Data = object | Iterable<any>;
export type Transform = (
  key: object,
  value: any,
) => void | [object, any] | false;

export interface InputsProps {
  depth?: number;
  isArrayItem?: boolean;
  key?: React.Key;
  prefix?: string;
  snakeCase?: boolean;
  transform?: Transform;
  value: Data;
  yieldObject?: (props: any) => any;
  yieldValue?: (props: any) => any;
}

export interface FormDataItem {
  key: string;
  value: string;
  name: string;
}
