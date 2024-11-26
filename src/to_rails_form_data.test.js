import formToRackParams from '@citizensadvice/form-to-rack-params';
import { toRailsFormData } from './index.tsx';

it('searialises a string', () => {
  const data = {
    string: 'foo',
    empty: '',
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    string: 'foo',
    empty: '',
  });
});

it('searialises a number', () => {
  const data = {
    number: 1,
    zero: 0,
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    number: '1',
    zero: '0',
  });
});

it('searialises null to an empty string', () => {
  const data = {
    null: null,
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    null: '',
  });
});

it('ignores undefined values', () => {
  const data = {
    foo: undefined,
    bar: 'fee',
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    bar: 'fee',
  });
});

it('searialises NaN to an empty string', () => {
  const data = {
    nan: NaN,
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    nan: '',
  });
});

it('searialises booleans', () => {
  const data = {
    true: true,
    false: false,
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    true: '1',
    false: '0',
  });
});

it('searialises dates', () => {
  const data = {
    date: new Date(0),
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    date: '1970-01-01T00:00:00.000Z',
  });
});

it('serialises arrays', () => {
  const data = {
    array: ['a', 'b', 'c'],
    emptyArray: [],
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    array: ['a', 'b', 'c'],
    empty_array: [''],
  });
});

it('serialises objects', () => {
  const data = {
    object: {
      foo: 'bar',
      foe: 'thumb',
    },
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    object: {
      foo: 'bar',
      foe: 'thumb',
    },
  });
});

it('serialises an array of objects', () => {
  const data = {
    objects: [{ item: 'one' }, { item: 'two' }, { item: 'three' }],
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    objects: [{ item: 'one' }, { item: 'two' }, { item: 'three' }],
  });
});

it('serialises a set', () => {
  const data = {
    set: new Set(['one', 'two', 'three']),
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    set: ['one', 'two', 'three'],
  });
});

it('serialises a set of objects', () => {
  const data = {
    set: new Set([{ id: 1 }, { id: 2 }, { id: 3 }]),
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    set: [{ id: '1' }, { id: '2' }, { id: '3' }],
  });
});

it('serialises a map', () => {
  const data = {
    map: new Map([
      ['first', 'one'],
      ['second', 'two'],
      ['third', 'three'],
    ]),
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    map: {
      first: 'one',
      second: 'two',
      third: 'three',
    },
  });
});

it('serialises non-string properties', () => {
  const data = {
    map: new Map([
      [0, 'one'],
      [null, 'two'],
      [Symbol('third'), 'three'],
      [
        {
          toString() {
            return 'fourth';
          },
        },
        'four',
      ],
    ]),
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    map: {
      0: 'one',
      null: 'two',
      'symbol(third)': 'three',
      fourth: 'four',
    },
  });
});

it('serialises a custom iterator', () => {
  function* iterator() {
    let i = 0;
    while (i < 4) {
      yield [String.fromCharCode(97 + i), i];
      i += 1;
    }
  }
  const data = {
    iterator: iterator(),
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    iterator: {
      a: '0',
      b: '1',
      c: '2',
      d: '3',
    },
  });
});

it('snake cases keys', () => {
  const data = {
    camelCase: 'foo',
    object: { childKey: 'bar' },
  };

  expect(formToRackParams(toRailsFormData(data))).toEqual({
    camel_case: 'foo',
    object: {
      child_key: 'bar',
    },
  });
});

it('keeps _destroy', () => {
  const data = {
    _destroy: true,
  };

  expect(formToRackParams(toRailsFormData(data))).toEqual({
    _destroy: '1',
  });
});

it('does not error for an undefined value', () => {
  expect(formToRackParams(toRailsFormData(undefined))).toEqual({});
});

it('does not error for a null value', () => {
  expect(formToRackParams(toRailsFormData(null))).toEqual({});
});

it('does not error for a string value', () => {
  expect(formToRackParams(toRailsFormData('foo'))).toEqual({});
});

it('ignores undefined array values', () => {
  const data = {
    foo: [undefined, 'bar'],
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    foo: ['bar'],
  });
});

it('treats an array of only undefined values as empty', () => {
  const data = {
    foo: [undefined, undefined],
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    foo: [''],
  });
});

it('treats a set of only undefined values as empty', () => {
  const data = {
    foo: new Set([undefined, undefined]),
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    foo: [''],
  });
});

it('ignores undefined iterator values', () => {
  function* iterator() {
    yield ['a', '1'];
    yield ['b', undefined];
    yield ['c', null];
  }
  const data = {
    iterator: iterator(),
  };
  expect(formToRackParams(toRailsFormData(data))).toEqual({
    iterator: {
      a: '1',
      c: '',
    },
  });
});

it('serializes a complex object', () => {
  const data = {
    caseNote: {
      foo: 'baz',
      fooBar: [1, 2],
      foeThumb: new Set([1, 2]),
      false: false,
      true: true,
      fee: { thumb: 'fi' },
      fog: [
        { id: 1, value: 'x' },
        { id: 2, value: 'y' },
        { id: 3, _destroy: true },
        { id: null, value: 'new' },
      ],
    },
  };

  expect(formToRackParams(toRailsFormData(data))).toEqual({
    case_note: {
      foo: 'baz',
      foo_bar: ['1', '2'],
      foe_thumb: ['1', '2'],
      false: '0',
      true: '1',
      fee: {
        thumb: 'fi',
      },
      fog: [
        {
          id: '1',
          value: 'x',
        },
        {
          id: '2',
          value: 'y',
        },
        {
          id: '3',
          _destroy: '1',
        },
        {
          id: '',
          value: 'new',
        },
      ],
    },
  });
});

// These tests are adapted from https://github.com/rack/rack/blob/main/test/spec_utils.rb describe.each([
describe.each([
  ['', {}],
  ['foo=', { foo: '' }],
  ['foo="bar"', { foo: '"bar"' }],
  ['foo=1&bar=2', { foo: '1', bar: '2' }],
  ['foo=bar&baz=', { foo: 'bar', baz: '' }],
  [
    'my+weird+field=q1!2"\'w%245%267%2Fz8)%3F',
    { 'my weird field': 'q1!2"\'w$5&7/z8)?' },
  ],
  ['a=b&pid%3D1234=1023', { a: 'b', 'pid=1234': '1023' }],
  ['foo[]=', { foo: [''] }],
  ['foo[]=bar', { foo: ['bar'] }],
  ['foo[]=bar&foo[=baz', { foo: ['bar'], 'foo[': 'baz' }],
  ['foo[]=bar&foo[]=', { foo: ['bar', ''] }],
  ['foo[]=1&foo[]=2', { foo: ['1', '2'] }],
  ['foo=bar&baz[]=1&baz[]=2&baz[]=3', { foo: 'bar', baz: ['1', '2', '3'] }],
  ['foo[]=bar&baz[]=1&baz[]=2&baz[]=3', { foo: ['bar'], baz: ['1', '2', '3'] }],
  ['x[y][z]=1', { x: { y: { z: '1' } } }],
  ['x[y][z][]=1', { x: { y: { z: ['1'] } } }],
  ['x[y][z][]=1&x[y][z][]=2', { x: { y: { z: ['1', '2'] } } }],
  ['x[y][][z]=1', { x: { y: [{ z: '1' }] } }],
  ['x[y][][z][]=1', { x: { y: [{ z: ['1'] }] } }],
  ['x[y][][z]=1&x[y][][w]=2', { x: { y: [{ z: '1', w: '2' }] } }],
  ['x[y][][v][w]=1', { x: { y: [{ v: { w: '1' } }] } }],
  ['x[y][][z]=1&x[y][][v][w]=2', { x: { y: [{ z: '1', v: { w: '2' } }] } }],
  ['x[y][][z]=1&x[y][][z]=2', { x: { y: [{ z: '1' }, { z: '2' }] } }],
  [
    'x[y][][z]=1&x[y][][w]=a&x[y][][z]=2&x[y][][w]=3',
    {
      x: {
        y: [
          { z: '1', w: 'a' },
          { z: '2', w: '3' },
        ],
      },
    },
  ],
  [
    'x[][y]=1&x[][z][w]=a&x[][y]=2&x[][z][w]=b',
    {
      x: [
        { y: '1', z: { w: 'a' } },
        { y: '2', z: { w: 'b' } },
      ],
    },
  ],
  [
    'x[][z][w]=a&x[][y]=1&x[][z][w]=b&x[][y]=2',
    {
      x: [
        { z: { w: 'a' }, y: '1' },
        { z: { w: 'b' }, y: '2' },
      ],
    },
  ],
  [
    'data[books][][data][page]=1&data[books][][data][page]=2',
    { data: { books: [{ data: { page: '1' } }, { data: { page: '2' } }] } },
  ],
  ['x[][y][][z]=1&x[][y][][w]=2', { x: [{ y: [{ z: '1', w: '2' }] }] }],
  [
    'x[][id]=1&x[][y][a]=5&x[][y][b]=7&x[][z][id]=3&x[][z][w]=0&x[][id]=2&x[][y][a]=6&x[][y][b]=8&x[][z][id]=4&x[][z][w]=0',
    {
      x: [
        { id: '1', y: { a: '5', b: '7' }, z: { id: '3', w: '0' } },
        { id: '2', y: { a: '6', b: '8' }, z: { id: '4', w: '0' } },
      ],
    },
  ],
  [
    '[]=1&[a]=2&b[=3&c]=4',
    {
      '[]': '1',
      '[a]': '2',
      'b[': '3',
      'c]': '4',
    },
  ],
  [
    'd[[]=5&e][]=6&f[[]]=7',
    { d: { '[': '5' }, 'e]': ['6'], f: { '[': { ']': '7' } } },
  ],
  ['g[h][i]=8&j[k]l[m]=9', { g: { h: { i: '8' } }, j: { k: { 'l[m]': '9' } } }],
  ['l[[[[[[[[]]]]]]]=10', { l: { '[[[[[[[': { ']]]]]]': '10' } } }],
  ['[foo]=1', { '[foo]': '1' }],
  ['[foo][bar]=1', { '[foo]': { bar: '1' } }],
])('%s', (query, object) => {
  it('is generated from object', () => {
    expect(
      decodeURI(new URLSearchParams(toRailsFormData(object)).toString()),
    ).toEqual(query);
  });
});

describe('transform', () => {
  it('omits keys that are transformed to undefined', () => {
    const data = {
      foo: [1, 2],
      fig: 'fog',
    };

    function transform(key) {
      if (key === 'foo') {
        return false;
      }
      return undefined;
    }

    expect(formToRackParams(toRailsFormData(data, { transform }))).toEqual({
      fig: 'fog',
    });
  });

  it('maps key names to new names', () => {
    const data = {
      foo: [1, 2],
      bar: { foe: 'fee' },
      thumb: 'fox',
      fig: 'fog',
    };

    function transform(key, value) {
      if (key === 'foo') {
        return ['frog', [3, 4]];
      }
      if (key === 'thumb') {
        return ['fyi', value];
      }
      if (key === 'fig') {
        return ['fig', 'fog'];
      }
      return undefined;
    }

    expect(formToRackParams(toRailsFormData(data, { transform }))).toEqual({
      frog: ['3', '4'],
      bar: { foe: 'fee' },
      fyi: 'fox',
      fig: 'fog',
    });
  });

  it('does not modify the case of mapped keys', () => {
    const data = {
      fooBar: 'fox',
      foeFee: 'fog',
    };

    function transform(key, value) {
      if (key === 'fooBar') {
        return ['thyThumb', value];
      }
      return undefined;
    }

    expect(formToRackParams(toRailsFormData(data, { transform }))).toEqual({
      thyThumb: 'fox',
      foe_fee: 'fog',
    });
  });
});
