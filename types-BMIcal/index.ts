import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();


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

app.listen(3003, () => {
    console.log('Server is running on http://localhost:3003');
});