interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (values: exercise_args): Result => {
    const periodLength = values.hours.length;
    const trainingDays = values.hours.filter(hours => hours > 0).length;
    const average = values.hours.reduce((acc, cur) => acc + cur) / values.hours.length;
    const success = average < values.target ? false : true;
    const rating = Math.min(Math.floor(average / values.target * 3), 3);
    const ratingDescription = rating === 1 ? 'better next time' : rating === 2 ? 'not too bad but could be better' : 'good';
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: values.target,
        average,
    };
};

interface exercise_args {
    hours: Array<number>,
    target: number,
}

const parse = (argv: Array<string>): exercise_args => {
    const hours: Array<number> = [];
    for (let i = 3; i < argv.length; i++) {
        hours.push(Number(argv[i]));
    }
    return { hours, target: Number(argv[2]) };
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
if (process.argv[2] != undefined && process.argv[3] != undefined) {
    console.log(calculateExercises(parse(process.argv)));
}

export { calculateExercises };