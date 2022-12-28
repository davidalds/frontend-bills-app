import React, { useCallback, useState } from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import HeaderMenu from './HeaderMenu'
import { LinkInterface } from './interfaces/links'

const Layout = () => {
    const [links, setLinks] = useState<LinkInterface[]>([])

    const submitLinks = useCallback((links: LinkInterface[]) => {
        if (links) {
            setLinks(links)
        }
    }, [])

    return (
        <Grid
            templateAreas={`
                "nav header header header"
                "nav main main main"
                "nav main main main"
                "nav main main main"
            `}
            minH={'100vh'}
            gridTemplateRows={'60px 1fr'}
            gridTemplateColumns={'250px 1fr'}
        >
            <GridItem bgColor={'green.300'} area={'header'} boxShadow={'xl'}>
                <HeaderMenu links={links} />
            </GridItem>
            <GridItem bgColor={'gray.700'} area={'nav'}>
                <Navbar />
            </GridItem>
            <GridItem area={'main'}>
                <Box p={6}>
                    <Outlet context={{ submitLinks }} />
                </Box>
            </GridItem>
        </Grid>
    )
}

export default Layout
