import { ReactNode } from 'react'

export interface IPropsModal {
    isOpen: boolean
    modalTitle: string
    onClose: () => void
    children?: ReactNode
}
