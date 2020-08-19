export enum Gender { Male = 'male', Female = 'female', Other = 'other' }

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type PatientEntryNoSsn = Omit<PatientEntry, 'ssn'>;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export interface PatientEntryUnpreparedData {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}