import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'
const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello, World!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!height || !weight) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }
    const bmi = calculateBmi(height, weight);
    return res.json({ height, weight, bmi });
});

const toNumberArray = (array: unknown): number[] | null => {
    if (!(array instanceof Array)) {
        return null;
    }
    const numberArray = array.map(item => Number(item));
    return array.every(item => !isNaN(Number(item))) ? numberArray : null;
};

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    
    if (!daily_exercises || !target) {
        return res.status(400).send({ error: 'parameters missing' });
    }
    const daily = toNumberArray(daily_exercises);
    if (!daily || isNaN(Number(target))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }
    const result = calculateExercises(daily, Number(target));
    return res.json(result);
});

app.listen(3003, () => {
    console.log('Server is running on http://localhost:3003');
});