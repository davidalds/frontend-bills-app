import React from 'react'
import { Box } from '@chakra-ui/react'

interface IProps {
    title: string
}

const NavbarHeader = ({ title }: IProps) => {
    return (
        <Box
            bgColor={'gray.600'}
            w={'100%'}
            p={4}
            fontSize={'24px'}
            fontWeight={'bold'}
            boxShadow={'xl'}
            h={'60px'}
            color={'white'}
            display={'flex'}
            alignItems={'center'}
        >
            {title}
        </Box>
    )
}

export default NavbarHeader
