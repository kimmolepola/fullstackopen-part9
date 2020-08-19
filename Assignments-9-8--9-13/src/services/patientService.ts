import patientData from '../../data/patients.json';
import { PatientEntry, PatientEntryNoSsn, PatientEntryUnpreparedData, NewPatientEntry } from '../types';
import { toNewPatientEntry } from '../utils';

const prepareData = (patientData: Array<PatientEntryUnpreparedData>): Array<PatientEntry> => {
    return patientData.map(x => {
        const data = toNewPatientEntry(x) as PatientEntry;
        data.id = x.id;
        return data;
    });
};

const patients: Array<PatientEntry> = prepareData(patientData);

const patientsNoSnn: Array<PatientEntryNoSsn> = patients;

const generateId = (patientsArray: Array<PatientEntry>): string => {
    return String(Math.max(...patientsArray.map(p => Number('0x' + p.id.split('-')[0]))) + 1)
        + patientsArray[0].id.substring(patientsArray[0].id.indexOf('-'));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = { id: generateId(patients), ...entry };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getEntriesNoSsn = (): Array<PatientEntryNoSsn> => {
    return patientsNoSnn.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const getEntries = (): Array<PatientEntry> => {
    return patients;
};

export default { addEntry, getEntries, getEntriesNoSsn };