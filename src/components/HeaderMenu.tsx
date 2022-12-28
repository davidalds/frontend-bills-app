import React from 'react'

import {
    Button,
    Flex,
    Icon,
    Square,
    Box,
    Avatar,
    Text,
    HStack,
} from '@chakra-ui/react'
import { IoExitOutline } from 'react-icons/io5'
import { useAuth } from '../pages/login/authentication/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import BreadCrumbComponent from './BreadCrumb'
import { LinkInterface } from './interfaces/links'


interface Links {
    links: LinkInterface[]
}

const HeaderMenu = ({links}: Links) => {
    const auth = useAuth()
    const navigate = useNavigate()

    const logout = () => {
        auth.signout(() => navigate('/login'))
    }

    return (
        <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            h={'100%'}
            px={2}
        >
            <BreadCrumbComponent links={links}/>
            <HStack>
                <HStack
                    boxShadow={'base'}
                    bgColor={'gray.700'}
                    as={Link}
                    to={'/debtor'}
                    transition={'all 0.2s'}
                    rounded={'base'}
                    _hover={{ bgColor: 'gray.500' }}
                    py={1}
                    px={2}
                >
                    <Box alignItems={'center'} justifyContent={'center'}>
                        <Avatar size={'sm'} bg={'gray.200'} />
                    </Box>
                    <Box alignItems={'center'} flex={1}>
                        <Text
                            color={'white'}
                            fontSize={'sm'}
                            fontWeight={'bold'}
                        >
                            Acessar Perfil
                        </Text>
                    </Box>
                </HStack>
                <Square bgColor={'white'} p={2} as={Button} onClick={logout}>
                    <Icon as={IoExitOutline} color={'gray.800'} w={5} h={5} />
                </Square>
            </HStack>
        </Flex>
    )
}

export default HeaderMenu
