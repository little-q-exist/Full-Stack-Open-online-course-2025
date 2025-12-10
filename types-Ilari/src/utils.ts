import { NewDiaryEntry, Visibility, Weather } from './types';

import { z } from 'zod';

export const newDiaryEntrySchema = z.object({
    date: z.iso.date(),
    weather: z.enum(Weather),
    visibility: z.enum(Visibility),
    comment: z.string().optional(),
});

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    return newDiaryEntrySchema.parse(object);
};

export default toNewDiaryEntry;
