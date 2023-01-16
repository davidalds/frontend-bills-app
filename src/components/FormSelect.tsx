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
    isInvalid?: boolean
    isRequired?: boolean
    isReadOnly?: boolean
    placeholder?: boolean
    size?: 'lg' | 'md' | 'sm'
    onChangeStatus?: (e: any) => void
    children: ReactNode
}

const FormSelect: ForwardRefRenderFunction<
    HTMLSelectElement,
    IPropsFormInput
> = (
    {
        label,
        errors,
        isInvalid = false,
        isRequired = false,
        isReadOnly = false,
        placeholder = true,
        size = 'md',
        onChangeStatus,
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
                {...rest}
                required={false}
                pointerEvents={isReadOnly ? 'none' : 'auto'}
                onChange={onChangeStatus}
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
