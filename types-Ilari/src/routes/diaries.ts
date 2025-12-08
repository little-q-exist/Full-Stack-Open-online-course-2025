import { Response, Router } from 'express';

import { NonSensitiveDiaryEntry } from '../types';
import toNewDiaryEntry from '../utils';

import diaryService from '../services/diaryService';

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

router.post('/', (req, res) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body);

        const newEntry = diaryService.addDiary(newDiaryEntry);

        res.json(newEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;