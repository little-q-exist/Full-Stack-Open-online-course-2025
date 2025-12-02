export const calculateBmi = (heightInCm: number, weightInKg: number): string => {
    const BMI = weightInKg / ((heightInCm / 100) * (heightInCm / 100));
    if (BMI < 18.5) {
        return "thin";
    } else if (BMI >= 18.5 && BMI < 24) {
        return "normal";
    } else if (BMI >= 24 && BMI < 28) {
        return "overweight";
    } else {
        return "mild obesity";
    }
};

export default 'default';

if (require.main === module) {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);
    console.log(calculateBmi(height, weight));
}