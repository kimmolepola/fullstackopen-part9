import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from '../types';

const PatientPage: React.FC = () => {
    const [, dispatch] = useStateValue();
    const [{ patients },] = useStateValue();
    const { id } = useParams<{ id: string }>();
    let patient = Object.values(patients).find((x) => x.id === id);

    if (!patient || !patient.dateOfBirth || !patient.ssn || !patient.entries) {
        try {
            axios.get<Patient>(`${apiBaseUrl}/patients/${id}`).then(response => {
                //dispatch({ type: "UPDATE_PATIENT", payload: response.data });
                dispatch(updatePatient(response.data));
                patient = response.data;
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>
                {patient?.name} {patient?.gender === "female" ? "♀" : (patient?.gender === "male" ? "♂" : "")}
            </h1>
            <div>
                ssn: {patient?.ssn}
            </div>
            <div>
                occupation: {patient?.occupation}
            </div>
        </div >
    );
};

export default PatientPage;