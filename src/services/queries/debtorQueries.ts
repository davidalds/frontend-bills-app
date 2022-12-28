import { useQuery, useMutation } from 'react-query'
import api from '..'
import { PostDebtorData } from './interfaces/debtorQueriesInterface'

interface GetDebtorData {
    count_creditors: number
    count_debts: number
    total_price_debts: number
}

const getDebtor = async (debtorId: number) => {
    const {
        data: { count_creditors, count_debts, total_price_debts },
    } = await api.get<GetDebtorData>(`debtor/${debtorId}`)
    return { count_creditors, count_debts, total_price_debts }
}

export const useDebtor = (debtorId: number) => {
    return useQuery(['debtor', debtorId], () => getDebtor(debtorId))
}

export const useMutationDebtor = () => {
    return useMutation((data: PostDebtorData) => {
        return api.post<PostDebtorData>('debtor', data)
    })
}
