import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
    return res.send('pong');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3001');
});