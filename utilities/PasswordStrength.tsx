export const passwordStrengthOptions = [
    {
        id: 1,
        value: "Too weak",
        minDiversity: 0,
        minLength: 0
    },
    {
        id: 2,
        value: "Weak",
        minDiversity: 2,
        minLength: 6
    },
    {
        id: 3,
        value: "Medium",
        minDiversity: 4,
        minLength: 8
    },
    {
        id: 4,
        value: "Strong",
        minDiversity: 4,
        minLength: 10
    }
];

const allowedSymbols = "!\"#\$%&'\(\)\*\+,-\./:;<=>\?@\[\\\\\\]\^_`\{|\}~";

export default interface IPasswordStrength {
    id: 1 | 2 | 3 | 4,
    value: string,
    contains: string[],
    length: number
};

export const getPasswordStrength = (password: string) => {

    let passwordCopy = password || "";

    const rules = [
        {
            regex: "[a-z]",
            message: 'lowercase'
        },
        {
            regex: '[A-Z]',
            message: 'uppercase'
        },
        {
            regex: '[0-9]',
            message: 'number'
        },
    ];

    if (allowedSymbols) {
        rules.push({
            regex: `[${allowedSymbols}]`,
            message: 'symbol'
        });
    }

    let strength: IPasswordStrength = {
        id: 1,
        contains: [],
        value: "",
        length: 0
    };

    strength.contains = rules
        .filter(rule => new RegExp(`${rule.regex}`).test(passwordCopy))
        .map(rule => rule.message);

    strength.length = passwordCopy.length;

    let fulfilledOptions = passwordStrengthOptions
        .filter(option => strength.contains.length >= option.minDiversity)
        .filter(option => strength.length >= option.minLength)
        .sort((o1, o2) => o2.id - o1.id)
        .map(option => ({ id: option.id, value: option.value }));

    Object.assign(strength, fulfilledOptions[0]);

    return strength;
};