import { memo } from 'react';
import PropTypes from 'prop-types';
import { inputs } from './inputs';

const RailsFormInputs = memo(({ value, transform, snakeCase }) => (
  [...inputs({ value, transform, snakeCase })]
));

RailsFormInputs.propTypes = {
  value: PropTypes.object.isRequired,
  transform: PropTypes.func,
  snakeCase: PropTypes.bool,
};

RailsFormInputs.defaultProps = {
  transform: null,
  snakeCase: true,
};

RailsFormInputs.displayName = 'RailsFormInputs';

export default RailsFormInputs;
