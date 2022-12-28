export interface IPropsDebtsForm{
    isOpen: boolean
    onClose: () => void
    creditorId?: number
}

type StatusType = "Paga" | "Devendo" | "Cancelada"

export interface DebtsFormValues{
    title: string
    description?: string
    price: number
    payday: Date
    status: StatusType
    DebtorId: number
    CreditorId: number
}