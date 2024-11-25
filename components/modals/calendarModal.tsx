"use client"
import Modal from "@/components/modals/modal"
import { type ReactNode, useEffect, useMemo, useState } from "react"
import type { EventType } from "@/sanity/types"
import Select from "@/components/select/select"
import { getEventTypeLabel } from "@/sanity/lib/utils"
import AddToCalendarDropdown from "@/components/dropdown/addToCalendarDropdown"
import { useSearchParams } from "next/navigation"

const CalendarModal: Component = () => {
    const searchParams = useSearchParams()
    const initState = searchParams.has("abonner")
    return (
        <Modal
            initialState={initState}
            size={"xl"}
            label={"Abonner på arrangementer"}
            modalTitle={"Abonner på arrangementer i kalenderen din"}
            modalContent={<ModalContent />}
            trigger={toggle => (
                <button
                    onClick={toggle}
                    className={"text-root-primary dark:text-root-light"}
                    aria-label={"Åpne meny"}>
                    Abonner på arrangementer
                </button>
            )}
        />
    )
}

export default CalendarModal

interface FormData {
    type?: EventType | null
    from?: string
    limit?: number
}

const ModalContent = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const apiUrl = `${baseUrl}/api/arrangement/ical`

    const [params, setParams] = useState<Record<string, string>>({})

    /**
     * Bygger en URL basert fra apiUrl, params fra form og dagens dato.
     */
    const url = useMemo(() => {
        params["from"] = new Date().toISOString()
        return (
            apiUrl +
            "?" +
            Object.entries(params)
                .map(([key, value]) => `${key}=${value}`)
                .join("&")
        )
    }, [params])

    /**
     * Bygger en Record<string, string> fra FormData og setter params til denne.
     * Alle values blir konvertert til string. Hvis value er null | undefined, fjernes key fra record.
     * @param form FormData objektet som skal konverteres til Record<string, string>
     */
    function onFormChange(form: FormData): void {
        const record: Record<string, string> = {}
        for (const [key, value] of Object.entries(form)) {
            if (value) {
                record[key] = value?.toString() ?? ""
            }
        }
        setParams(record)
    }

    return (
        <div>
            <h6 className={"dark:text-white"}>Abonnere på framtidige arrangementer</h6>
            <p className={"text-gray-600 dark:text-gray-200"}>
                Velg type arrangement du vil abonnere på
            </p>
            <div className={"flex flex-col gap-5 pt-2"}>
                <CalendarForm onChange={onFormChange} />
                <div>
                    <AddToCalendarDropdown eventUrl={url} />
                </div>
            </div>
        </div>
    )
}

/**
 * Form for å velge type arrangementer som man vil abonnere på.
 * @param onChange Funksjon som kalles når formen endres
 */
const CalendarForm: Component<{ onChange: (form: FormData) => void }> = ({ onChange }) => {
    const [form, setForm] = useState<FormData>({})

    useEffect(() => {
        onChange(form)
    }, [form])

    const defaultType = { value: "*", label: "Alle" }
    const eventTypes: EventType[] = ["bedpres", "social", "workshop", "other"]
    const typeOptions = [defaultType].concat(
        eventTypes.map(type => ({
            value: type,
            label: getEventTypeLabel(type),
        })),
    )
    return (
        <Select
            label={"Type arrangement"}
            defaultItem={defaultType.value}
            items={typeOptions}
            onChange={value =>
                setForm({
                    ...form,
                    type: value !== defaultType.value ? (value as EventType) : null,
                })
            }
        />
    )
}
