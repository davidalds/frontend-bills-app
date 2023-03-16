export interface IPropsDebtsForm {
    isOpen: boolean
    onClose: () => void
    creditorId?: number
}

type StatusType = 'Paga' | 'Devendo'

export interface DebtsFormValues {
    title: string
    description?: string
    price: number
    debtday: Date
    payday: Date
    status: StatusType
    DebtorId: number
    CreditorId: number
}
