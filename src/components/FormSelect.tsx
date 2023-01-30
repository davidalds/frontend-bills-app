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
    name: string
    isInvalid?: boolean
    isRequired?: boolean
    isReadOnly?: boolean
    placeholder?: boolean
    size?: 'lg' | 'md' | 'sm'
    children: ReactNode
}

const FormSelect: ForwardRefRenderFunction<
    HTMLSelectElement,
    IPropsFormInput
> = (
    {
        label,
        errors,
        name,
        isInvalid = false,
        isRequired = false,
        isReadOnly = false,
        placeholder = true,
        size = 'md',
        children,
        ...rest
    },
    ref
) => {
    return (
        <FormControl isInvalid={isInvalid} isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <Select
                placeholder={placeholder ? "Selecione uma opção" : ""}
                ref={ref}
                size={size}
                name={name}
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
