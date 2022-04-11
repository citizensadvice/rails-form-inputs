import { memo } from 'react';
import PropTypes from 'prop-types';
import { inputs } from './inputs';
const RailsFormInputs = /*#__PURE__*/ memo(({ value , transform  })=>[
        ...inputs({
            value,
            transform
        })
    ]
);
RailsFormInputs.propTypes = {
    value: PropTypes.object.isRequired,
    transform: PropTypes.func
};
RailsFormInputs.defaultProps = {
    transform: null
};
RailsFormInputs.displayName = 'RailsFormInputs';
export default RailsFormInputs;

//# sourceMappingURL=index.js.map