// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export enum Gender { Male = 'male', Female = 'female', Other = 'other' }

export type NewPatientEntry = Omit<PatientEntry, 'id' | 'entries'>;

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;

export type Patient = PatientEntry | undefined;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export interface PatientEntryUnpreparedData {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries?: Entry[];
}

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}