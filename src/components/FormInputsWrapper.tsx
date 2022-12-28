import React, { ReactNode } from 'react'

import { SimpleGrid } from '@chakra-ui/react'

interface IPropsFormInputWrapper {
    columns: number
    children: ReactNode
}

const FormInputsWrapper = ({ columns, children }: IPropsFormInputWrapper) => {
    return (
        <SimpleGrid spacing={10} columns={columns} w={'100%'} pb={2}>
            {children}
        </SimpleGrid>
    )
}

export default FormInputsWrapper
