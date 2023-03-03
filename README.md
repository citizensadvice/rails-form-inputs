# `<RailsFormInputs>`

[![npm version](https://badge.fury.io/js/@citizensadvice%2Frails-form-inputs.svg)](https://badge.fury.io/js/@citizensadvice%2Frails-form-inputs)

A React component to turn an object into Rails compatible form inputs.

```js
import RailsFormInputs from '@citizensadvice/rails-form-inputs';

function Form() {
  return (
    <form>
      <RailsFormInputs
        value={{ myObject: { foo: 'bar' }, array: [1, 2] }}
      />
    </form>
  );
}
```

Outputs:

```html
<form>
  <input type="hidden" name="my_object[foo]" value="bar" />
  <input type="hidden" name="array[]" value="1" />
  <input type="hidden" name="array[]" value="2" />
</form>
```

## Props

```
<RailsFormInputs
  value={value: Object} 
  transform={tranform: (key: object, value: any) => void | [object, any] | false)}
  snakeCase={snakeCase = true: Boolean}
/>
```

Note this component is wrapped in [`memo`](https://reactjs.org/docs/react-api.html#reactmemo).

### `value`

The object to serialize.

A `Set` is treated as an array, and a `Map` as an object.

Any properties with a value of `undefined` will be skipped.

### `transform`

An optional transform function.  The arguments are the key and value pair.

- Return `false` to skip outputting that item
- Return an array of `[key, value]` to change the key or value.  If you change the key it will not be snake cased.
- Return undefined to continue as normal.

### `snakeCase`

If true (default) the keys will be converted to snake case.

## `toRailsFormData(data, { transform, snakeCase = true })`

Convert the object to a `FormData` object.

```js
import { toRailsFormData } from '@citizensadvice/rails-form-inputs';

const formData = toRailsFormData({ myObject: { foo: 'bar' }, array: [1, 2] });

new URLSearchParams(formData).toString()
// => ?my_object[foo]=bar&array[]=1&array[]=2
```

## Developing

```bash
npm install

# Lint and typecheck
npm run lint

# Test
npm test

# Build
npm run build

# Release a new version
npx np
```
