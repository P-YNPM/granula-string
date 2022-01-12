import { GranulaString } from '../src/index';

describe('Test createFromString', () => {
    test('', () => {
        expect(
            GranulaString.createFromString('I am primitive').valueOf()
        ).toEqual('I am primitive');
        expect(
            GranulaString.createFromString(new String('I am wrapper')).valueOf()
        ).toEqual('I am wrapper');
    });
});

describe('Test isEqual', () => {
    test.each([
        {
            s: '123',
            o: '123',
            expected: true,
        },
        {
            s: '1234',
            o: '123',
            expected: false,
        },
    ])('', ({ s, o, expected }) =>
        expect(GranulaString.createFromString(s).isEqual(o)).toEqual(expected)
    );
});

describe('Test Int', () => {
    test.each([
        {
            s: '123',
            n: false,
            p: true,
            w: true,
        },
        {
            s: '-1234',
            n: true,
            p: false,
            w: true,
        },
        {
            s: '3.142',
            n: false,
            p: false,
            w: false,
        },
        {
            s: 'asd',
            n: false,
            p: false,
            w: false,
        },
    ])('', ({ s, n, p, w }) => {
        const granula = GranulaString.createFromString(s);
        expect(granula.isPositiveInt()).toEqual(p);
        expect(granula.isNegativeInt()).toEqual(n);
        expect(granula.isInt()).toEqual(w);
    });
});

describe('Test Float', () => {
    test.each([
        {
            s: '3.142',
            n: false,
            p: true,
            w: true,
        },
        {
            s: '-3.142',
            n: true,
            p: false,
            w: true,
        },
        {
            s: '123',
            n: false,
            p: false,
            w: false,
        },
        {
            s: 'asd',
            n: false,
            p: false,
            w: false,
        },
    ])('', ({ s, n, p, w }) => {
        const granula = GranulaString.createFromString(s);
        expect(granula.isPositiveFloat()).toEqual(p);
        expect(granula.isNegativeFloat()).toEqual(n);
        expect(granula.isFloat()).toEqual(w);
    });
});

describe('Test isAlphabet', () => {
    test.each([
        {
            s: 'asd',
            e: true,
        },
        {
            s: '123',
            e: false,
        },
        {
            s: '\n',
            e: false,
        },
    ])('', ({ s, e }) =>
        expect(GranulaString.createFromString(s).isAlphabet()).toEqual(e)
    );
});

describe('Test reverse', () => {
    test.each([
        {
            s: 'Hello I am Granula',
            e: 'alunarG ma I olleH',
        },
        {
            s: '123',
            e: '321',
        },
    ])('', ({ s, e }) =>
        expect(GranulaString.createFromString(s).reverse()).toEqual(e)
    );
});

describe('Test toArray', () => {
    test.each([
        {
            s: 'Hello I am Granula',
            e: 18,
        },
        {
            s: '',
            e: 0,
        },
    ])('', ({ s, e }) =>
        expect(GranulaString.createFromString(s).toArray().length).toEqual(e)
    );
});

describe('Test unCapitalize', () => {
    test.each([
        {
            s: 'iASASAS ASAS AS',
            u: 'iASASAS ASAS AS',
        },
        {
            s: 'IASASAS',
            u: 'iASASAS',
        },
    ])('', ({ s, u }) =>
        expect(GranulaString.createFromString(s).unCapitalize()).toEqual(u)
    );
});

describe('Test capitalize', () => {
    test.each([
        {
            s: 'iabcdasd 123 !@',
            c: 'Iabcdasd 123 !@',
        },
        {
            s: 'iASASAS',
            c: 'IASASAS',
        },
    ])('', ({ s, c }) =>
        expect(GranulaString.createFromString(s).capitalize()).toEqual(c)
    );
});

describe('Test isEmpty', () => {
    test('', () => {
        const granula = GranulaString.createFromString('');
        expect(granula.isEmpty()).toEqual(true);
        expect(granula.isBlank()).toEqual(true);
        expect(granula.isWhiteSpace()).toEqual(false);
    });
});

describe('Test isBlank and isWhiteSpace', () => {
    test('', () => {
        const granula = GranulaString.createFromString('          ');
        expect(granula.isEmpty()).toEqual(false);
        expect(granula.isWhiteSpace()).toEqual(true);
        expect(granula.isBlank()).toEqual(true);

        const granula2 = GranulaString.createFromString('\n\n\t');
        expect(granula2.isEmpty()).toEqual(false);
        expect(granula2.isWhiteSpace()).toEqual(true);
        expect(granula2.isBlank()).toEqual(false);
    });
});

describe('Test inRangeOf min', () => {
    test.each([
        {
            option: {
                min: 11,
            },
            value: '1234567890',
            expected: false,
        },
        {
            option: {
                min: 10,
            },
            value: '12345 789 ',
            expected: true,
        },
        {
            option: {
                min: 10,
                excludeBlankSpace: true,
            },
            value: '12345 789 ',
            expected: false,
        },
        {
            option: {
                min: 10,
                excludeBlankSpace: true,
            },
            value: '123 456 789 0 ',
            expected: true,
        },
    ])('data => %p', ({ option, value, expected }) =>
        expect(GranulaString.createFromString(value).inRangeOf(option)).toEqual(
            expected
        )
    );
});

describe('Test inRangeOf max', () => {
    test.each([
        {
            option: {
                min: 8,
                max: 9,
            },
            value: '1234567890',
            expected: false,
        },
        {
            option: {
                min: 10,
                max: 10,
            },
            value: '12345 789 ',
            expected: true,
        },
        {
            option: {
                min: 10,
                max: 10,
                excludeBlankSpace: true,
            },
            value: '12345 789 ',
            expected: false,
        },
        {
            option: {
                min: 10,
                max: 10,
                excludeBlankSpace: true,
            },
            value: '123 456 789 0 ',
            expected: true,
        },
    ])('data => %p', ({ option, value, expected }) =>
        expect(GranulaString.createFromString(value).inRangeOf(option)).toEqual(
            expected
        )
    );
});

describe('Test throw error for invalid min and max', () => {
    test.each([
        {
            option: {
                min: -1,
            },
        },
        {
            option: {
                min: 0,
                max: Number.MAX_VALUE + 1,
            },
        },
    ])('', ({ option }) =>
        expect(() =>
            GranulaString.createFromString('').inRangeOf(option)
        ).toThrowError()
    );
});
