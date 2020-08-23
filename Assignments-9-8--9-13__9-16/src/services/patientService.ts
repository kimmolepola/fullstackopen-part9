import patientData from '../../data/patients.json';
import { PatientEntry, PublicPatient, PatientEntryUnpreparedData, NewPatientEntry, Patient } from '../types';
import { toNewPatientEntry } from '../utils';

const findById = (id: string): Patient => {
    return patients.find(x => x.id === id);
};

const prepareData = (patientData: Array<PatientEntryUnpreparedData>): Array<PatientEntry> => {
    return patientData.map(x => {
        const data = toNewPatientEntry(x) as PatientEntry;
        data.entries = [];
        if (x.entries != undefined) {
            data.entries = x.entries;
        }
        data.id = x.id;
        return data;
    });
};

const patients: Array<PatientEntry> = prepareData(patientData);

const publicPatient: Array<PublicPatient> = patients;

const generateId = (patientsArray: Array<PatientEntry>): string => {
    return String(Math.max(...patientsArray.map(p => Number('0x' + p.id.split('-')[0]))) + 1)
        + patientsArray[0].id.substring(patientsArray[0].id.indexOf('-'));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = { id: generateId(patients), entries: [], ...entry };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getEntriesNoSsn = (): Array<PublicPatient> => {
    return publicPatient.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const getEntries = (): Array<PatientEntry> => {
    return patients;
};

export default { addEntry, getEntries, getEntriesNoSsn, findById };