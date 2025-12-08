import { NewDiaryEntry, Visibility, Weather } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isWeather = (weather: string): weather is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(weather);
};

const isVisibility = (visibility: string): visibility is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(visibility);
};

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }
    return comment;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if (typeof object !== 'object' || !object) {
        throw new Error('Incorrect or missing data');
    }

    if ('date' in object && 'weather' in object && 'visibility' in object && 'comment' in object) {
        const newEntry: NewDiaryEntry = {
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            comment: parseComment(object.comment)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

export default toNewDiaryEntry;
