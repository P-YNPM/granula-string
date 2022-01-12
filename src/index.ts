type InRangeOfOption = Readonly<{
    min: number;
    max?: number;
    excludeBlankSpace?: boolean;
}>;

const isBlank = (s: string) =>
    s.split('').filter((c) => ' ' === c).length === s.length;

const isEmpty = (s: string) => s === '';

const isEqual = (s: string, o: string) => s === o;

const inRangeOf = (
    s: string,
    { min, max, excludeBlankSpace }: InRangeOfOption
) => {
    if (min < 0) {
        throw new Error(`Expect min to be >= 0, got min: "${min}" instead`);
    }
    const vMax = max ?? Number.MAX_SAFE_INTEGER;
    if (vMax >= Number.MAX_VALUE) {
        throw new Error(
            `Expect max to be <= ${Number.MAX_VALUE}, got max: "${vMax}" instead`
        );
    }
    if (excludeBlankSpace) {
        const len = s.split('').filter((char) => !isBlank(char)).length;
        return len >= min && len <= vMax;
    }
    return s.length >= min && s.length <= vMax;
};

const isPositiveFloat = (s: string) => /^[+]?\d+(\.\d+)$/.test(s);

const isNegativeFloat = (s: string) => /^-\d+(\.\d+)?$/.test(s);

const isPositiveInt = (s: string) => /^[+]?\d+$/.test(s);

const isNegativeInt = (s: string) => /^-\d+$/.test(s);

const isFloat = (s: string) => isPositiveFloat(s) || isNegativeFloat(s);

const isInt = (s: string) => isPositiveInt(s) || isNegativeInt(s);

const isAlphabet = (s: string) => /^[a-zA-Z]+$/.test(s);

const isWhiteSpace = (s: string) => /^\s+$/.test(s);

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const unCapitalize = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

const reverse = (s: string) => Array.from(toArray(s)).reverse().join('');

/**
 * @toArray
 * Immutable version of array. Attempt to mutate would cause run time error
 * */
const toArray = (s: string) => Object.freeze(s.split(''));

class GranulaString extends String {
    private constructor(private readonly s: string) {
        super(s);
    }

    static createFromString = (s: string | String) =>
        new GranulaString(typeof s === 'string' ? s : s.valueOf());

    isEmpty = () => isEmpty(this.s);

    isBlank = () => isBlank(this.s);

    isEqual = (s: string) => isEqual(this.s, s);

    inRangeOf = (inRangeOfOption: InRangeOfOption) =>
        inRangeOf(this.s, inRangeOfOption);

    isPositiveFloat = () => isPositiveFloat(this.s);

    isNegativeFloat = () => isNegativeFloat(this.s);

    isPositiveInt = () => isPositiveInt(this.s);

    isNegativeInt = () => isNegativeInt(this.s);

    isFloat = () => isFloat(this.s);

    isInt = () => isInt(this.s);

    isAlphabet = () => isAlphabet(this.s);

    isWhiteSpace = () => isWhiteSpace(this.s);

    capitalize = () => capitalize(this.s);

    unCapitalize = () => unCapitalize(this.s);

    reverse = () => reverse(this.s);

    toArray = () => toArray(this.s);

    toParentString = () => new String(this.s);
}

export {
    GranulaString,
    isBlank,
    isEmpty,
    inRangeOf,
    isEqual,
    isPositiveFloat,
    isNegativeFloat,
    isFloat,
    isPositiveInt,
    isNegativeInt,
    isInt,
    isAlphabet,
    isWhiteSpace,
    capitalize,
    unCapitalize,
    toArray,
    reverse,
};
