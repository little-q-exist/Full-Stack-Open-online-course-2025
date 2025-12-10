import { Router, NextFunction, Request, Response } from 'express';

import { ZodError } from 'zod';

import patientsServices from '../services/patients';
import { NewPatientSchema } from '../utils';
import { NewPatient, Patient } from '../types';

const router = Router();

router.get('/', (_req, res) => {
    res.json(patientsServices.getPatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ZodError) {
        res.status(400).json({ error: error.issues });
    } else if (error instanceof Error) {
        res.status(400).json({ error: 'unknown error' });
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsServices.addPatient(req.body);
    res.json(addedPatient);
});

router.use(errorHandler);

export default router;