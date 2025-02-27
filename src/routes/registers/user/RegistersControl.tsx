import { createContext, useContext, useState } from "react";
import Patients from "./Patients";
import Register from "./Register";
import PatientRegisters from "./PatientRegisters";
import useSWR from "swr";
import SkeletonLoading from "../../../lib/components_utils/SkeletonLoading";
import ErrorPage from "@/lib/components_utils/ErrorPage";

type PatientsData = {
    name: string,
    birthday: string,
    highFever: boolean,
    premature: boolean,
    deliveryProblems: boolean,
    lowWeight: boolean,
    deliveryType: string,
    brothersNumber: number,
    consultType: string,
    deliveryProblemsTypes: string,
    patient_id: number,
    created_at: string,
    updated_at: string
}

type PatientsArray = PatientsData[];

type RegisterData = {
    photo_id1: number;
    photo_id2: number;
    photo_id3: number;
    start_date: string,
    end_date: string,
    painLevel: number,
    sensitivityField: boolean,
    stain: boolean,
    aestheticDiscomfort: boolean,
    userObservations: string,
    specialistObservations: string,
    diagnosis: string
    mih_id: number;
}

interface RegistersContextType {
    patientsData: PatientsArray | undefined;
    selectPatient: (patientId: string) => void;
    selectRegister: (id: string, data: any) => void;
    register: RegisterData | undefined;
    patient: PatientsData | undefined;
    back: () => void;
}

const RegistersContext = createContext<RegistersContextType | undefined>(undefined);


export default function RegistersControl() {

    const { data, error, isLoading } = useSWR(`/users/patients/`)

    const [page, setPage] = useState(0);

    const [patient, setPatient] = useState<PatientsData | undefined>(undefined)

    const [register, setRegister] = useState<RegisterData | undefined>(undefined)

    if (isLoading) {
        return <SkeletonLoading />
    }
    if (error) {
        return <ErrorPage type="user"></ErrorPage>
    }

    function selectPatient(patientId: string) {

        const patientSelected = patientsData?.find(pat => pat.patient_id == Number(patientId))
        setPatient(patientSelected)
        setPage(1);

    }

    function selectRegister(registerId: string, data: any) {

        const register = data?.find((reg: RegisterData) => String(reg.mih_id) == registerId)
        setRegister(register)
        setPage(2);

    }

    function back() {

        setPage((v) => {

            if (v != 0) {
                if (v == 1) {

                    setPatient(undefined);
                }
                else if (v == 2)
                    setRegister(undefined);

                return v - 1;
            }

            return v;

        })

    }

    const patientsData: PatientsArray = data


    const pages = [

        <Patients />,
        <PatientRegisters />,
        <Register />,

    ]

    return (
        <RegistersContext.Provider
            value={{
                patientsData,
                selectPatient,
                selectRegister,
                register,
                patient,
                back
            }}>
            {pages[page]}
        </RegistersContext.Provider>
    )

}

export const useRegistersContext = () => {
    const context = useContext(RegistersContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};
