import express from 'express';
import { calculator, Operation } from './calculater';

const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.post('/calculate', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { num1, num2, operation } = req.body;

    const result = calculator(Number(num1), Number(num2), operation as Operation);
    res.json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});