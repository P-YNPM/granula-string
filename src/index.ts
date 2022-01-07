const isBlank = (s: string) =>
    s.split('').filter((c) => ' ' === c).length === s.length;

const isEmpty = (s: string) => s === '';

type InRangeOfOption = Readonly<{
    min: number;
    max?: number;
    excludeBlankSpace?: boolean;
}>;

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

class GranulaString extends String {
    private constructor(private readonly s: string) {
        super(s);
    }

    static createFromString = (s: string | String) =>
        new GranulaString(typeof s === 'string' ? s : s.valueOf());

    isEmpty = () => isEmpty(this.s);

    isBlank = () => isBlank(this.s);

    inRangeOf = (inRangeOfOption: InRangeOfOption) =>
        inRangeOf(this.s, inRangeOfOption);

    toParentString = () => new String(this.s);
}

export { GranulaString, isBlank, isEmpty, inRangeOf };
