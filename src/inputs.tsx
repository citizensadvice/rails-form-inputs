import React, { memo } from "react";
import { InputsProps } from "./types.js";
import { generateData } from "./generate_form_data.js";

export const Inputs: React.FC<InputsProps> = memo(
  // Have to set the type as any because React.FC does not allow an array
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/41808
  ({
    depth = 0,
    prefix = "",
    isArrayItem = false,
    snakeCase = true,
    yieldObject = defaultYieldObject, // eslint-disable-line @typescript-eslint/no-use-before-define
    yieldValue = defaultYieldValue, // eslint-disable-line @typescript-eslint/no-use-before-define
    ...props
  }: InputsProps) =>
    [
      ...generateData({
        depth,
        prefix,
        isArrayItem,
        snakeCase,
        yieldObject,
        yieldValue,
        ...props,
      }),
    ] as any,
);

const defaultYieldObject = ({ key, ...props }: InputsProps) =>
  // eslint-disable-next-line react/jsx-props-no-spreading
  [<Inputs key={key} {...props} />];
const defaultYieldValue = ({
  key,
  name,
  value,
}: {
  key: React.Key;
  name: string;
  value: string;
}) => <input key={key} type="hidden" name={name} value={value} />;

Inputs.displayName = "Inputs";
