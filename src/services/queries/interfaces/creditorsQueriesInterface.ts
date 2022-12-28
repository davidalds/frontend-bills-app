import { GetDebtsData } from "./debtsQueriesInterface"

export interface Creditor {
    id: number
    name: string
    email: string | null
    creditor_type: string
}

export interface GetCreditorsData {
    count: number
    rows: Creditor[]
}

export interface GetCreditorData{
    creditor: Creditor
    total_price_debts: number | null
    debts: GetDebtsData
}

export interface PostCreditorsData {
    name: string
    email?: string
    creditor_type: 'Fisico' | 'Juridico'
    DebtorId: number
}
