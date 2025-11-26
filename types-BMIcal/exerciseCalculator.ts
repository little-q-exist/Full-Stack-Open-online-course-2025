interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const arrayAverage = (array: number[]) => {
    return array.reduce((pre, cur) => pre += cur, 0) / array.length;
}

const arrayNotZero = (array: number[]) => {
    return array.reduce((accum, cur) => {
        if (cur > 0) accum += 1;
        return accum;
    }, 0)
}

const rateResult = (acutal: number, expected: number) => {
    const ratePercent = acutal / expected;
    if (ratePercent <= 0.25) {
        return 0;
    } else if (ratePercent > 0.25 && ratePercent <= 0.5) {
        return 1;
    } else if (ratePercent > 0.5 && ratePercent <= 0.75) {
        return 2;
    } else {
        return 3;
    }
}

const rateCommentor = (rate: number) => {
    switch (rate) {
        case 0:
            return 'Bad'
        case 1:
            return 'Medium'
        case 2:
            return 'not too bad but could be better'
        case 3:
            return 'good'
    }
}

const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): ExerciseResult => {
    const trainingDays = arrayNotZero(dailyExerciseHours);
    const averageHours = arrayAverage(dailyExerciseHours);
    const success = averageHours >= targetAmount;
    const rating = rateResult(averageHours, targetAmount);
    const ratingDescription = rateCommentor(rating);

    return {
        periodLength: dailyExerciseHours.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetAmount,
        average: averageHours
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
