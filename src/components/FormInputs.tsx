import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from '@chakra-ui/react'
import { NumberFormatValues } from 'react-number-format'

interface IPropsFormInput {
    label: string
    name: string
    type: string
    errors?: FieldError
    isInvalid?: boolean
    format?: any
    isRequired?: boolean
    isReadOnly?: boolean
    as?: any
    value?: any
    isAllowed?: (value: NumberFormatValues) => boolean;
}

const FormInput: ForwardRefRenderFunction<HTMLInputElement, IPropsFormInput> = (
    {
        label,
        type,
        isInvalid=false,
        errors,
        name,
        format,
        isRequired = false,
        isReadOnly = false,
        as,
        value,
        isAllowed,
        ...rest
    },
    ref
) => {
    return (
        <FormControl isInvalid={isInvalid} isRequired={isRequired} isReadOnly={isReadOnly}>
            <FormLabel>{label}</FormLabel>
            <Input
                ref={ref}
                type={type}
                name={name}
                {...rest}
                required={false}
                as={as}
                value={value}
                format={format}
                isAllowed={isAllowed}
            />
            {errors ? (
                <FormErrorMessage>{errors.message}</FormErrorMessage>
            ) : (
                <></>
            )}
        </FormControl>
    )
}

const InputComponent = forwardRef(FormInput)

export default InputComponent
