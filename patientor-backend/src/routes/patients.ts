import express from 'express';

import patientsServices from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientsServices.getPatients());
});

export default router;