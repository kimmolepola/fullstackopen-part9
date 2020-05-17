interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: Array<number>, target: number) => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(hours => hours > 0).length;
    const average = hours.reduce((acc, cur) => acc + cur) / hours.length;
    const success = average < target ? false : true;
    const rating = Math.min(Math.floor(average / target * 3), 3)
    const ratingDescription = rating === 1 ? 'better next time' : rating === 2 ? 'not too bad but could be better' : 'good'
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));