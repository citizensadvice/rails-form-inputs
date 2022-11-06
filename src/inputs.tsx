import { memo } from 'react';
import PropTypes from 'prop-types';
import { underscore } from './underscore';

interface InputProps {
  prefix?: string,
  value: object | Iterable<any>,
  transform?: (key: object, value: any) => void | [object, any] | false,
  isArrayItem?: boolean,
  snakeCase?: boolean,
  depth?: number,
}

export const Inputs : React.FC<InputProps> = memo(
  // Has to type as any as React.FC does not accept an array because https://github.com/DefinitelyTyped/DefinitelyTyped/issues/41808
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  (props : InputProps) => [...inputs(props)] as any,
);

Inputs.propTypes = {
  prefix: PropTypes.string,
  value: PropTypes.any.isRequired,
  depth: PropTypes.number,
  isArrayItem: PropTypes.bool,
  snakeCase: PropTypes.bool,
  transform: PropTypes.func,
};

Inputs.defaultProps = {
  depth: 0,
  prefix: '',
  isArrayItem: false,
  snakeCase: true,
  transform: undefined,
};

Inputs.displayName = 'Inputs';

function* inputs({
  value,
  prefix = '',
  depth = 0,
  isArrayItem = false,
  transform,
  snakeCase = true,
} : InputProps) {
  const iterator : Iterable<any> = Symbol.iterator in value
    ? value as Iterable<any>
    : Object.entries(value);

  let index = -1;
  for (const next of iterator) {
    index += 1;
    let keepKey = false;
    let property : any = index;
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
        [property, item] = transformed;
        keepKey = true;
      }
    }

    if (item === undefined) {
      continue;
    }

    property = String(property);
    let name = prefix;
    if (depth === 0) {
      name += keepKey || !snakeCase ? property : underscore(property);
    } else if (isArrayItem) {
      name += '[]';
    } else {
      // The escaping rules for [ and ] in a name are based on rack test suite
      // https://github.com/rack/rack/blob/main/test/spec_utils.rb describe.each([
      const part = keepKey || !snakeCase ? property : underscore(property);
      if ((part.includes('[') || part.includes(']')) && part[0] !== '[') {
        name += part;
      } else {
        name += `[${part}]`;
      }
    }

    let key = property;
    if (isArrayItem) {
      key += `_${index}`;
    }

    if ((Array.isArray(item) && item.length === 0) || (item instanceof Set && item.size === 0)) {
      // For an empty array, include a default item for arrays so Rails will know they are empty
      key = `${key}[]`;
      name = `${name}[]`;
      item = '';
    } else if (item !== null && typeof item === 'object' && !(item instanceof Date)) {
      yield (
        <Inputs
          value={item}
          prefix={name}
          depth={depth + 1}
          isArrayItem={Array.isArray(item) || item instanceof Set}
          key={key}
          transform={transform}
        />
      );
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

    yield <input type="hidden" key={key} name={name} value={item} />;
  }
}
