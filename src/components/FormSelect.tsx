import React, { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react'
import {
    Select,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

interface IPropsFormInput {
    label: string
    errors?: FieldError
    isInvalid: boolean
    isRequired?: boolean
    isReadOnly?: boolean
    children: ReactNode
}

const FormSelect: ForwardRefRenderFunction<
    HTMLSelectElement,
    IPropsFormInput
> = (
    {
        label,
        errors,
        isInvalid,
        isRequired = false,
        isReadOnly = false,
        children,
        ...rest
    },
    ref
) => {
    return (
        <FormControl isInvalid={isInvalid} isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <Select
                placeholder="Selecione uma opção"
                ref={ref}
                {...rest}
                required={false}
                pointerEvents={isReadOnly ? 'none' : 'auto'}
            >
                {children}
            </Select>
            {errors ? (
                <FormErrorMessage>{errors.message}</FormErrorMessage>
            ) : (
                <></>
            )}
        </FormControl>
    )
}

const SelectComponent = forwardRef(FormSelect)

export default SelectComponent
