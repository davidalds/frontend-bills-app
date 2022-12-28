import { useOutletContext } from 'react-router-dom'
import { LinkInterface } from './interfaces/links'

interface OutletInterface {
    submitLinks: (links: LinkInterface[]) => void
}

export const useOutlet = () => {
    return useOutletContext() as OutletInterface
}
