import { Box, Heading } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface InfoCardProps{
    title: string
    children: ReactNode
}

const InfoCard = ({title, children}: InfoCardProps) => {
    return (
        <>
            <Box flex={1} display={'flex'} flexDir={'column'}>
                <Box
                    bgColor={'green.100'}
                    textAlign={'center'}
                    p={1}
                    size={'sm'}
                    as={Heading}
                >
                    {title}
                </Box>
                <Box p={3} flex={1} display={'flex'} alignItems={'center'}>
                    {children}
                </Box>
            </Box>
        </>
    )
}

export default InfoCard
