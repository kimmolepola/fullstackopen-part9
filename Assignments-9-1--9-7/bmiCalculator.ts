const calculateBmi = (values: args): string => {
    const bmi = values.mass_kg / (values.height_m * values.height_m);
    switch (true) {
        case bmi < 15: return "Very severely underweight";
        case bmi < 16: return "Severely underweight";
        case bmi < 18.5: return "Underweight";
        case bmi < 25: return "Normal (healthy weight)";
        case bmi < 30: return "Overweight";
        case bmi < 35: return "Obese Class I (Moderately obese)";
        case bmi < 40: return "Obese Class II (Severely obese)";
        default: return "Obese Class III (Very severely obese)";
    }
};

interface args {
    height_m: number,
    mass_kg: number,
}

const parseArgs = (argv: Array<string>): args => {
    const height_cm = Number(argv[2]);
    const height_m = height_cm * 0.01;
    const mass_kg = Number(argv[3]);
    return { height_m, mass_kg };
};
//console.log(calculateBmi(180, 74));
if (process.argv[2] != undefined && process.argv[3] != undefined) {
    console.log(calculateBmi(parseArgs(process.argv)));
}

export { calculateBmi };