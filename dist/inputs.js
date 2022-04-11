import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { underscore } from './underscore';
export function* inputs({ value , prefix ='' , depth =0 , isArrayItem =false , transform ,  }) {
    let iterator = value;
    if (!value[Symbol.iterator]) {
        iterator = Object.entries(value);
    }
    let index = -1;
    for (const next of iterator){
        index += 1;
        let keepKey = false;
        let property = index;
        let item = next;
        // An object or map will return [key, value] pairs
        if (Array.isArray(next) && next.length === 2) {
            [property, item] = next;
        }
        if (transform) {
            const transformed = transform(property, item);
            if (transformed === false) {
                continue;
            }
            if (transformed) {
                [property, item] = transform(property, item);
                keepKey = true;
            }
        }
        if (item === undefined) {
            continue;
        }
        let name = prefix;
        if (depth === 0) {
            name += keepKey ? property : underscore(property);
        } else if (isArrayItem) {
            name += '[]';
        } else {
            name += `[${keepKey ? property : underscore(property)}]`;
        }
        let key = property;
        if (isArrayItem) {
            key += `_${index}`;
        }
        if (Array.isArray(item) && item.length === 0 || item instanceof Set && item.size === 0) {
            // For an empty array, include a default item for arrays so Rails will know they are empty
            key = `${key}[]`;
            name = `${name}[]`;
            item = '';
        } else if (item !== null && typeof item === 'object' && !(item instanceof Date)) {
            yield /*#__PURE__*/ React.createElement(Inputs, {
                value: item,
                prefix: name,
                depth: depth + 1,
                isArrayItem: Array.isArray(item) || item instanceof Set,
                key: key,
                transform: transform
            });
            continue;
        } else if (Number.isNaN(item)) {
            item = '';
        } else if (item instanceof Date) {
            item = item.toISOString();
        } else if (typeof item === 'boolean') {
            item = item ? '1' : '0';
        } else {
            item = String(item ?? '');
        }
        yield /*#__PURE__*/ React.createElement("input", {
            type: "hidden",
            key: key,
            name: name,
            value: item
        });
    }
}
const Inputs = /*#__PURE__*/ memo((props)=>[
        ...inputs(props)
    ]
);
Inputs.propTypes = {
    prefix: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    depth: PropTypes.number.isRequired,
    isArrayItem: PropTypes.bool
};
Inputs.defaultProps = {
    isArrayItem: false
};
Inputs.displayName = 'Inputs';

//# sourceMappingURL=inputs.js.map