import { useQuery, useMutation } from 'react-query'
import api from '..'
import { getDebts } from './debtsQueries'
import {
    GetCreditorData,
    GetCreditorsData,
    PatchCreditorData,
} from './interfaces/creditorsQueriesInterface'
import { PostCreditorsData } from './interfaces/creditorsQueriesInterface'

const getCreditors = async (user_id: number, page?: number, limit?: number) => {
    const {
        data: { rows, count },
    } = await api.get<GetCreditorsData>(
        `creditors/${user_id}/?limit=${limit || ''}&offset=${
            page && limit ? (page - 1) * limit : ''
        }`
    )
    return { count, rows }
}

export const useCreditors = (user_id: number, page: number, limit: number) => {
    return useQuery(
        ['creditors', user_id, page],
        () => getCreditors(user_id, page, limit),
        { keepPreviousData: true }
    )
}

export const useCreditorsSelect = (user_id: number) => {
    return useQuery(['creditors_select', user_id], () => getCreditors(user_id))
}

export const getCreditor = async (user_id: number, creditor_id: number) => {
    const {
        data: { creditor, debts, total_price_debts },
    } = await api.get<GetCreditorData>(`creditor/${user_id}/${creditor_id}`)
    return { creditor, debts, total_price_debts }
}

export const useCreditor = (debtor_id: number, creditor_id: number) => {
    return useQuery(['creditor', creditor_id], () =>
        getCreditor(debtor_id, creditor_id)
    )
}

export const useMutationCreditors = () => {
    return useMutation((data: PostCreditorsData) => {
        return api.post<PostCreditorsData>('creditor', data)
    })
}

export const useMutationCreditor = (debtorId: number, creditorId: number) => {
    return useMutation((data: PatchCreditorData) => {
        return api.patch<PatchCreditorData>(
            `creditor/${debtorId}/${creditorId}/`,
            data
        )
    })
}

export const useMutationDeleteCreditor = (
    debtorId: number,
    creditorId: number
) => {
    return useMutation(() => {
        return api.delete(`creditor/${debtorId}/${creditorId}/`)
    })
}

export const useCreditorDebts = (
    debtor_id: number,
    page: number,
    limit: number,
    creditor_id: number
) => {
    return useQuery(['creditor_debts', creditor_id, page], () =>
        getDebts(debtor_id, page, limit, '', creditor_id)
    )
}
