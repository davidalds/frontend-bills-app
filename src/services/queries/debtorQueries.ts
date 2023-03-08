import { useQuery, useMutation } from 'react-query'
import api from '..'
import { PostChangePasswordData } from './interfaces/changePasswordQueriesInterface'
import { PostDebtorData } from './interfaces/debtorQueriesInterface'

interface GetDebtorData {
    count_creditors: number
    count_debts: number
    total_price_debts: number
    payed_debts: number
    open_debts: number
    canceled_debts: number
}

const getDebtor = async (debtorId: number) => {
    const {
        data: {
            count_creditors,
            count_debts,
            total_price_debts,
            payed_debts,
            open_debts,
            canceled_debts,
        },
    } = await api.get<GetDebtorData>(`debtor/${debtorId}`)
    return {
        count_creditors,
        count_debts,
        total_price_debts,
        payed_debts,
        open_debts,
        canceled_debts,
    }
}

export const useDebtor = (debtorId: number) => {
    return useQuery(['debtor', debtorId], () => getDebtor(debtorId))
}

export const useMutationDebtor = () => {
    return useMutation((data: PostDebtorData) => {
        return api.post<PostDebtorData>('debtor', data)
    })
}

export const useMutationRecoverPassword = () => {
    return useMutation((data: { email: string }) => {
        return api.post<{ email: string }>('recover', data)
    })
}

export const useMutationChangePassword = () => {
    return useMutation((data: PostChangePasswordData) => {
        return api.post<PostChangePasswordData>('changePassword', data)
    })
}
