import { createContext, useContext, useState } from "react";
import SkeletonLoading from "../../../lib/components_utils/SkeletonLoading";
import PendingRegisters from "./PendingRegisters";
import RegisterDiagnostic from "./RegisterDiagnostic";
import useSWR from "swr";
import useSWRMutation from 'swr/mutation'
import ErrorPage from "@/lib/components_utils/ErrorPage";

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
    diagnosis: string;
    mih_id: number;
}

type RegisterArray = RegisterData[];

interface RegistersContextType {
    data: RegisterArray;
    submitting: boolean;
    submitRegister: () => void;
    setObservation: (observation: string) => void;
    setDiagnostic: (diagnosis: string) => void;
    selectRegister: (id: string) => void;
    register: RegisterData | undefined;
    back: () => void;
}

const SpecialistRegistersContext = createContext<RegistersContextType | undefined>(undefined);

async function sendRequest(url: string, { arg }: {
    arg: { diagnosis: string, specialistObservations: string }
}) {
    console.log('=== sending request to ===')
    console.log(url)
    return await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(arg)
    }).then(res => res.json())
}

export default function SpecialistRegistersControl() {

    const { data, error, isLoading, mutate } = useSWR('/mih/undiagnosed');

    const [page, setPage] = useState(0);

    const [submitting, setSubmitting] = useState(false);

    const [register, setRegister] = useState<RegisterData | undefined>(undefined)

    const { trigger, error: isError, isMutating } = useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/mih/${register?.mih_id}`, sendRequest)

    if (isLoading) {
        return <SkeletonLoading />
    }
    if (error || data.detail) {
        return <ErrorPage type="specialist"></ErrorPage>
    }

    if (isMutating) {
        return <SkeletonLoading />

    }

    console.log(data)

    function selectRegister(registerId: string) {

        const register = data?.find((reg: RegisterData) => String(reg.mih_id) == registerId)
        setRegister(register)
        setPage(1);
    }

    function setDiagnostic(diagnosis: string) {

        setRegister((prevRegister) => {
            if (!prevRegister) {
                return undefined;
            }

            return {
                ...prevRegister,
                diagnosis: diagnosis,
            };
        });


    }

    function setObservation(observation: string) {

        setRegister((prevRegister) => {
            if (!prevRegister) {
                return undefined;
            }

            return {
                ...prevRegister,
                specialistObservations: observation,
            };
        });


    }

    function back() {

        setPage((v) => {

            if (v != 0)
                return v - 1;

            return v;

        })

    }

    async function submitRegister() {

        setSubmitting(true);

        if (!register || register.diagnosis == null) {
            setSubmitting(false);
            return undefined;
        }

        await trigger({ "diagnosis": register.diagnosis, "specialistObservations": register.specialistObservations });

        mutate(undefined, { revalidate: true }); // Atualiza o cache localmente

        if (isError) {
            setSubmitting(false);
            return <ErrorPage type="specialist"></ErrorPage>
        }

        setSubmitting(false);
        back()
    }

    const pages = [
        <PendingRegisters />,
        <RegisterDiagnostic />
    ]

    return (
        <SpecialistRegistersContext.Provider
            value={{
                data,
                submitting,
                submitRegister,
                setObservation,
                setDiagnostic,
                selectRegister,
                register,
                back
            }}>
            {pages[page]}
        </SpecialistRegistersContext.Provider>
    )

}

export const useSpecialistRegistersContext = () => {
    const context = useContext(SpecialistRegistersContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};
