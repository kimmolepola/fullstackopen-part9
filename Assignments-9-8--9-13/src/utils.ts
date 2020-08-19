import { NewPatientEntry, Gender } from './types';

/* 
eslint-disable 
@typescript-eslint/no-explicit-any, 
@typescript-eslint/explicit-module-boundary-types,
@typescript-eslint/no-unsafe-member-access
*/

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation ' + String(occupation));
    }
    return occupation;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + String(gender));
    }
    return gender;
};

const isSsn = (ssn: string): boolean => {
    if ((ssn.length == 11 || ssn.length == 10) // Exercise hardcoded data includes a real world invalid SSN with 10 characters
        && Array.from(ssn.substring(0, 5)).every(x => !isNaN(Number(x)))
        && ssn.charAt(6) === '-') {
        return true;
    }
    return false;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect or missing SSN ' + String(ssn));
    }
    return ssn;
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth: ' + String(date));
    }
    return date;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + String(name));
    }
    return name;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
};

export { toNewPatientEntry };