import { memo } from 'react';
import PropTypes from 'prop-types';
import { Inputs } from './inputs';

interface RailsFormInputsProps {
  value: object | Iterable<any>,
  transform?: (key: object, value: any) => void | [object, any] | false,
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
