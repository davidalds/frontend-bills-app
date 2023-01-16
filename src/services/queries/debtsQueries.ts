import { useMutation, useQuery } from 'react-query'
import api from '..'
import {
    GetDebtData,
    GetDebtsData,
    PostDebtsData,
    PatchDebtData,
    StatusType,
} from './interfaces/debtsQueriesInterface'

export const getDebts = async (
    debtorId: number,
    page: number,
    limit: number,
    statusFilter: StatusType | '',
    creditor_id?: number
) => {
    const {
        data: { count, rows },
    } = await api.get<GetDebtsData>(
        `debts/${debtorId}/${
            creditor_id ? String(creditor_id) + '/' : ''
        }?limit=${limit}&offset=${(page - 1) * limit}&status=${statusFilter}`
    )
    return { count, rows }
}

export const useDebts = (
    debtorId: number,
    page: number,
    limit: number,
    statusFilter: StatusType | ''
) => {
    return useQuery(['debts', page, statusFilter], () => getDebts(debtorId, page, limit, statusFilter), {
        keepPreviousData: true,
    })
}

const getDebt = async (debtorId: number, debtId: number) => {
    const { data } = await api.get<GetDebtData>(`debt/${debtorId}/${debtId}`)
    return data
}

export const useDebt = (debtorId: number, debtId: number) => {
    return useQuery(['debt', debtId], () => getDebt(debtorId, debtId))
}

export const useMutationDebts = () => {
    return useMutation((data: PostDebtsData) => {
        return api.post<PostDebtsData>('debt', data)
    })
}

export const useMutationDebt = (debtorId: number, debtId: number) => {
    return useMutation((data: PatchDebtData) => {
        return api.patch<PatchDebtData>(`debt/${debtorId}/${debtId}/`, data)
    })
}
