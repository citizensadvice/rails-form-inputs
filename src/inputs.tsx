import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { InputsProps } from './types.js';
import { generateData } from './generate_form_data.js';

export const Inputs : React.FC<InputsProps> = memo(
  // Have to set the type as any because React.FC does not allow an array
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/41808
  (props : InputsProps) => [...generateData(props)] as any,
);

Inputs.propTypes = {
  prefix: PropTypes.string,
  value: PropTypes.any.isRequired,
  depth: PropTypes.number,
  isArrayItem: PropTypes.bool,
  snakeCase: PropTypes.bool,
  transform: PropTypes.func,
  yieldObject: PropTypes.func,
  yieldValue: PropTypes.func,
};

Inputs.defaultProps = {
  depth: 0,
  prefix: '',
  isArrayItem: false,
  snakeCase: true,
  transform: undefined,
  // eslint-disable-next-line react/jsx-props-no-spreading
  yieldObject: ({ key, ...props }) => [<Inputs key={key} {...props} />],
  yieldValue: ({ key, name, value }) => <input key={key} type="hidden" name={name} value={value} />,
};

Inputs.displayName = 'Inputs';
