import express from 'express';

import diagnosesServices from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(diagnosesServices.getDiagnoses());
});

export default router;