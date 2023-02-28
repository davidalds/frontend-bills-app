import { useEffect } from 'react'
import { Creditor } from '../services/queries/interfaces/creditorsQueriesInterface'

export const useDataEntriesCreditor = (
    data: Creditor | undefined,
    f: (key: any, value: any) => void
) => {
    useEffect(() => {
        if (data) {
            Object.entries(data).map(([key, value]) => f(key, value))
        }
    }, [data, f])
}
