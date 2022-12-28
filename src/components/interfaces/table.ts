import {ReactNode} from 'react'

export interface IPropsTable{
    dataCount: number
    dataTitle: string
    children: ReactNode
    tableButtonLabel?: string
    openModal?: () => void;
    page: number;
    limit: number;
    nextPage: (page: number) => void;
    previousPage: (page: number) => void;
    isPreviousData: boolean;
}