const calculateBmi = (heightInCm: number, weightInKg: number): String => {
    const BMI = weightInKg / ((heightInCm / 100) * (heightInCm / 100));
    if (BMI < 18.5) {
        return "thin"
    } else if (BMI >= 18.5 && BMI < 24) {
        return "normal"
    } else if (BMI >= 24 && BMI < 28) {
        return "overweight"
    } else if (BMI >= 28) {
        return "mild obesity"
    }
}

console.log(calculateBmi(180, 74));