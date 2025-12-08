import diaryData from '../../data/entries';

import {
    DiaryEntry,
    NonSensitiveDiaryEntry,
    NewDiaryEntry,
} from '../types';

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => { 
    const newDiaryEntry: DiaryEntry = {
        id: diaries.length + 1,
        ...entry,
    };

    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(diary => diary.id === id);
    return entry;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById
};