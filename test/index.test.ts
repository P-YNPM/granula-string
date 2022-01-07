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

describe('Test isEmpty', () => {
    test('', () => {
        const granula = GranulaString.createFromString('');
        expect(granula.isEmpty()).toEqual(true);
        expect(granula.isBlank()).toEqual(true);
    });
});

describe('Test isBlank', () => {
    test('', () => {
        const granula = GranulaString.createFromString('          ');
        expect(granula.isEmpty()).toEqual(false);
        expect(granula.isBlank()).toEqual(true);
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
