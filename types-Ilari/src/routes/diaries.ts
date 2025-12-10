import { NextFunction, Response, Router, Request } from 'express';

import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';
import { newDiaryEntrySchema } from '../utils';

import diaryService from '../services/diaryService';
import { ZodError } from 'zod';

const router = Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
    res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const diary = diaryService.findById(Number(req.params.id));
    if (diary) {
        res.send(diary);
    } else {
        res.sendStatus(404);
    }
});

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newDiaryEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorHandler = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
    const newDiaryEntry = newDiaryEntrySchema.parse(req.body);
    const newEntry = diaryService.addDiary(newDiaryEntry);

    res.json(newEntry);
});

router.use(errorHandler);

export default router;