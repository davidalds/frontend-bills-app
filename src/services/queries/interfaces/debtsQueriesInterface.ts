import { Creditor } from './creditorsQueriesInterface'

interface Debt {
    id: number
    title: string
    status: string
    price: number
    payday: Date
    description: string
    Creditor: Creditor
}

export interface GetDebtsData {
    count: number
    rows: Debt[]
}

export interface GetDebtData extends Debt {}

export type StatusType = 'Paga' | 'Devendo' | 'Cancelada'

export interface PostDebtsData {
    title: string
    description?: string
    price: number
    payday: Date
    status: StatusType
    DebtorId: number
    CreditorId: number
}

export interface PatchDebtData{
    title?: string
    description?: string
    price?: number
    payday?: Date
    status?: StatusType
    CreditorId?: number
}