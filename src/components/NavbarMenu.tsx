import React from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { IPropsNavbarMenu } from './interfaces/navbar'

const NavbarMenu = ({ options }: IPropsNavbarMenu) => {
    return (
        <VStack mt={1} w={'100%'}>
            {options.map(({icon, title, link}, index) => (
                <Box key={index} textColor={'white'} w={'100%'} as={Link} to={link} py={1} display={'flex'} alignItems={'center'}>
                    <Icon as={icon} mr={2}/>
                    {title}
                </Box>
            ))}
        </VStack>
    )
}

export default NavbarMenu
