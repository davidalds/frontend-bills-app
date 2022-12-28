import React from "react"
import { Box, Text } from "@chakra-ui/react"
import NavbarMenu from "./NavbarMenu"
import {IPropsNavbarSection} from './interfaces/navbar'

const NavbarSection = ({label, options} : IPropsNavbarSection) =>{
    return(
        <Box 
            w={'100%'}
            pl={4}
            mt={3}
        >
            <Text fontSize='md' textColor={'gray.400'}>{label}</Text>
            <NavbarMenu options={options}/>
        </Box>
    )
}

export default NavbarSection
