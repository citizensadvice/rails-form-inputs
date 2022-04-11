function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
import React from 'react';
import { screen, render } from '@testing-library/react';
import formToRackParams from '@citizensadvice/form-to-rack-params';
import RailsFormInputs from '.';
function Form(props) {
    return(// The form needs a name for getByRole to work
    /*#__PURE__*/ React.createElement("form", {
        "aria-label": "form"
    }, /*#__PURE__*/ React.createElement(RailsFormInputs, _extends({}, props))));
}
it('searialises a string', ()=>{
    const value = {
        string: 'foo',
        empty: ''
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: value
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        string: 'foo',
        empty: ''
    });
});
it('searialises a number', ()=>{
    const data = {
        number: 1,
        zero: 0
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        number: '1',
        zero: '0'
    });
});
it('searialises null to an empty string', ()=>{
    const data = {
        null: null
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        null: ''
    });
});
it('ignores undefined values', ()=>{
    const data = {
        foo: undefined,
        bar: 'fee'
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        bar: 'fee'
    });
});
it('searialises NaN to an empty string', ()=>{
    const data = {
        nan: NaN
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        nan: ''
    });
});
it('searialises booleans', ()=>{
    const data = {
        true: true,
        false: false
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        true: '1',
        false: '0'
    });
});
it('searialises dates', ()=>{
    const data = {
        date: new Date(0)
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        date: '1970-01-01T00:00:00.000Z'
    });
});
it('serialises arrays', ()=>{
    const data = {
        array: [
            'a',
            'b',
            'c'
        ],
        emptyArray: []
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        array: [
            'a',
            'b',
            'c'
        ],
        empty_array: [
            ''
        ]
    });
});
it('serialises objects', ()=>{
    const data = {
        object: {
            foo: 'bar',
            foe: 'thumb'
        }
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        object: {
            foo: 'bar',
            foe: 'thumb'
        }
    });
});
it('serialises an array of objects', ()=>{
    const data = {
        objects: [
            {
                item: 'one'
            },
            {
                item: 'two'
            },
            {
                item: 'three'
            }, 
        ]
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        objects: [
            {
                item: 'one'
            },
            {
                item: 'two'
            },
            {
                item: 'three'
            }, 
        ]
    });
});
it('serialises a set', ()=>{
    const data = {
        set: new Set([
            'one',
            'two',
            'three'
        ])
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        set: [
            'one',
            'two',
            'three'
        ]
    });
});
it('serialises a set of objects', ()=>{
    const data = {
        set: new Set([
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            }
        ])
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        set: [
            {
                id: '1'
            },
            {
                id: '2'
            },
            {
                id: '3'
            }, 
        ]
    });
});
it('serialises a map', ()=>{
    const data = {
        map: new Map([
            [
                'first',
                'one'
            ],
            [
                'second',
                'two'
            ],
            [
                'third',
                'three'
            ]
        ])
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        map: {
            first: 'one',
            second: 'two',
            third: 'three'
        }
    });
});
it('serialises a custom iterator', ()=>{
    function* iterator() {
        let i = 0;
        while(i < 4){
            yield [
                String.fromCharCode(97 + i),
                i
            ];
            i += 1;
        }
    }
    const data = {
        iterator: iterator()
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        iterator: {
            a: '0',
            b: '1',
            c: '2',
            d: '3'
        }
    });
});
it('snake cases keys', ()=>{
    const data = {
        camelCase: 'foo',
        object: {
            childKey: 'bar'
        }
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        camel_case: 'foo',
        object: {
            child_key: 'bar'
        }
    });
});
it('keeps _destroy', ()=>{
    const data = {
        _destroy: true
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        _destroy: '1'
    });
});
it('serializes a complex object', ()=>{
    const data = {
        caseNote: {
            foo: 'baz',
            fooBar: [
                1,
                2
            ],
            foeThumb: new Set([
                1,
                2
            ]),
            false: false,
            true: true,
            fee: {
                thumb: 'fi'
            },
            fog: [
                {
                    id: 1,
                    value: 'x'
                },
                {
                    id: 2,
                    value: 'y'
                },
                {
                    id: 3,
                    _destroy: true
                },
                {
                    id: null,
                    value: 'new'
                }, 
            ]
        }
    };
    render(/*#__PURE__*/ React.createElement(Form, {
        value: data
    }));
    expect(formToRackParams(screen.getByRole('form'))).toEqual({
        case_note: {
            foo: 'baz',
            foo_bar: [
                '1',
                '2'
            ],
            foe_thumb: [
                '1',
                '2'
            ],
            false: '0',
            true: '1',
            fee: {
                thumb: 'fi'
            },
            fog: [
                {
                    id: '1',
                    value: 'x'
                },
                {
                    id: '2',
                    value: 'y'
                },
                {
                    id: '3',
                    _destroy: '1'
                },
                {
                    id: '',
                    value: 'new'
                }, 
            ]
        }
    });
});
describe('transform', ()=>{
    it('omits keys that are transformed to undefined', ()=>{
        const data = {
            foo: [
                1,
                2
            ],
            fig: 'fog'
        };
        function transform(key) {
            if (key === 'foo') {
                return false;
            }
            return undefined;
        }
        render(/*#__PURE__*/ React.createElement(Form, {
            value: data,
            transform: transform
        }));
        expect(formToRackParams(screen.getByRole('form'))).toEqual({
            fig: 'fog'
        });
    });
    it('maps key names to new names', ()=>{
        const data = {
            foo: [
                1,
                2
            ],
            bar: {
                foe: 'fee'
            },
            thumb: 'fox',
            fig: 'fog'
        };
        function transform(key, value) {
            if (key === 'foo') {
                return [
                    'frog',
                    [
                        3,
                        4
                    ]
                ];
            }
            if (key === 'thumb') {
                return [
                    'fyi',
                    value
                ];
            }
            if (key === 'fig') {
                return [
                    'fig',
                    'fog'
                ];
            }
            return undefined;
        }
        render(/*#__PURE__*/ React.createElement(Form, {
            value: data,
            transform: transform
        }));
        expect(formToRackParams(screen.getByRole('form'))).toEqual({
            frog: [
                '3',
                '4'
            ],
            bar: {
                foe: 'fee'
            },
            fyi: 'fox',
            fig: 'fog'
        });
    });
    it('does not modify the case of mapped keys', ()=>{
        const data = {
            fooBar: 'fox',
            foeFee: 'fog'
        };
        function transform(key, value) {
            if (key === 'fooBar') {
                return [
                    'thyThumb',
                    value
                ];
            }
            return undefined;
        }
        render(/*#__PURE__*/ React.createElement(Form, {
            value: data,
            transform: transform
        }));
        expect(formToRackParams(screen.getByRole('form'))).toEqual({
            thyThumb: 'fox',
            foe_fee: 'fog'
        });
    });
});

//# sourceMappingURL=index.test.js.map