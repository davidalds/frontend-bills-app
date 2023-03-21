export interface NotifyDebtsInterface {
    total: number
    debts: {
        id: number
        title: string
        payday: Date
    }[]
}
