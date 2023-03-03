export type Data = object | Iterable<any>;
export type Transform = (key: object, value: any) => void | [object, any] | false;

export interface InputsProps {
  prefix?: string,
  value: Data,
  transform?: Transform,
  isArrayItem?: boolean,
  snakeCase?: boolean,
  depth?: number,
  yieldObject?: (props: any) => any,
  yieldValue?: (props: any) => any,
}

export interface FormDataItem {
  key: string,
  value: string,
  name: string,
}
