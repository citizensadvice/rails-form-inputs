# `RailsFormInputs`

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
  transform={tranform: Function}
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

## Developing

```bash
npm install

# Lint and typecheck
npm run lint

# Test
npm test

# Build
npm build

# Release a new version
npx np
```
