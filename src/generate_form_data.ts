import { underscore } from './underscore.js';
import type { InputsProps, FormDataItem } from './types.js';

function emptyArray(item: any): boolean {
  return (
    (Array.isArray(item) || item instanceof Set) &&
    ![...item].some((v) => v !== undefined)
  );
}

export function* generateData({
  value,
  prefix = '',
  depth = 0,
  isArrayItem = false,
  transform,
  snakeCase = true,
  yieldObject = generateData,
  yieldValue = (v) => v,
}: InputsProps): Generator<FormDataItem, undefined, unknown> {
  if (!value || typeof value !== 'object') {
    return;
  }
  const iterator: Iterable<any> =
    Symbol.iterator in value ? (value as Iterable<any>) : Object.entries(value);

  let index = -1;
  for (const next of iterator) {
    index += 1;
    let keepKey = false;
    let property: any = index;
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

    if (emptyArray(item)) {
      // For an empty array, include a default item for arrays so Rails will know they are empty
      key = `${key}[]`;
      name = `${name}[]`;
      item = '';
    } else if (
      item !== null &&
      typeof item === 'object' &&
      !(item instanceof Date)
    ) {
      yield* yieldObject({
        value: item,
        prefix: name,
        depth: depth + 1,
        isArrayItem: Array.isArray(item) || item instanceof Set,
        snakeCase,
        transform,
        key,
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

    yield yieldValue({ name, value: item, key });
  }
}
