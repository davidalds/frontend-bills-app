import React from 'react'
import NavbarHeader from './NavbarHeader'
import {AiOutlineHome} from 'react-icons/ai'
import {BsPeople} from 'react-icons/bs'
import {SlNotebook} from 'react-icons/sl'

import { VStack } from '@chakra-ui/react'
import NavbarSection from './NavbarSection'

const Navbar = () => {
    return (
        <VStack>
            <NavbarHeader title={'Bills App'} />
            <NavbarSection
                label={'Navegação'}
                options={[
                    {
                        icon: AiOutlineHome,
                        title: 'Home',
                        link: '/',
                    },
                    {
                        icon: BsPeople,
                        title: 'Credores',
                        link: '/credores'
                    },
                    {
                        icon: SlNotebook,
                        title: 'Dívidas',
                        link: '/dividas'
                    }
                ]}
            />
        </VStack>
    )
}

export default Navbar
