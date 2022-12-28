export interface IPropsCreditorsForm{
    isOpen: boolean
    onClose: () => void
}

export interface CreditorFormValues{
    name: string
    email?: string
    creditor_type: "Fisico" | "Juridico"
    DebtorId: number
}