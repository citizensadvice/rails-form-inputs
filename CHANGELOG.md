# Changelog

## [v1.2.0] 2023-01-13

- Added `toRailsFormData` to convert an object to a `FormData` instance

## [v1.1.0] 2022-11-10

- Providing a non-object `value` will now not result in JavaScript error. It will still result in a prop-type error.
- `undefined` array values will be ignored

## [v1.0.1] 2022-11-09

- Fix React 17 incompatibility due to [issues with the `react/jsx-runtime`](https://github.com/facebook/react/issues/20235) import.

## [v1.0.0] 2022-11-09

- Initial release
