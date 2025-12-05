import { Response, Router } from 'express';

import { NonSensitiveDiaryEntry } from '../types';

import diaryService from '../services/diaryService';

const router = Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
    res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

export default router;