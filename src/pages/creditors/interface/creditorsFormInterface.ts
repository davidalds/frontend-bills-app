import { Creditor } from './../../../services/queries/interfaces/creditorsQueriesInterface'
export interface IPropsCreditorsForm {
    isOpen: boolean
    onClose: () => void
    data?: Creditor
}

export interface CreditorFormValues {
    name: string
    email?: string
    creditor_type: 'Fisico' | 'Juridico'
    DebtorId: number
}
