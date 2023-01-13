import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Inputs } from './inputs.js';
import { Data, Transform } from './types';

interface RailsFormInputsProps {
  value: Data,
  transform?: Transform,
  snakeCase?: boolean,
}

const RailsFormInputs : React.FC<RailsFormInputsProps> = memo(
  ({ value, transform, snakeCase }: RailsFormInputsProps) => (
    <Inputs value={value} transform={transform} snakeCase={snakeCase} />
  ),
);

RailsFormInputs.propTypes = {
  value: PropTypes.object.isRequired,
  transform: PropTypes.func,
  snakeCase: PropTypes.bool,
};

RailsFormInputs.defaultProps = {
  transform: undefined,
  snakeCase: true,
};

RailsFormInputs.displayName = 'RailsFormInputs';

export default RailsFormInputs;
export { toRailsFormData } from './to_rails_form_data.js';
