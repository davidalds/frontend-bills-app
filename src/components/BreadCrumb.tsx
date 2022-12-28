import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { LinkInterface } from './interfaces/links'

interface Links {
    links: LinkInterface[]
}

const BreadCrumbComponent = ({ links }: Links) => {
    return (
        <>
            <Breadcrumb color={'white'} fontWeight={'bold'}>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/">
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {links ? (
                    links.map(({ path, url }, index) => (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink as={Link} to={url}>
                                {path}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    ))
                ) : (
                    <div />
                )}
            </Breadcrumb>
        </>
    )
}

export default BreadCrumbComponent
