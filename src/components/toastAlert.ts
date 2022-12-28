import { useToast } from '@chakra-ui/react'

type StatusType = 'success' | 'error' | 'info' | 'loading' | 'warning'

export const useToastAlert = () => {
    const toast = useToast({
        isClosable: true,
        duration: 4000,
        position: 'top',
    })

    return (title: string, status: StatusType) => toast({ title, status })
}
