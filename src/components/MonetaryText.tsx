import React from 'react'
import { ChangeMeta, NumberFormatBase } from 'react-number-format'
import { monetaryFormat } from '../utils/formatFunctions'

interface IProps {
    value: number
}

const MonetaryText = ({ value }: IProps) => {
    return (
        <>
            <NumberFormatBase
                displayType={'text'}
                value={value}
                format={(num: string) => monetaryFormat(num, true)}
                removeFormatting={function (
                    inputValue: string,
                    changeMeta?: ChangeMeta | undefined
                ): string {
                    throw new Error('Function not implemented.')
                }}
                getCaretBoundary={function (formattedValue: string): boolean[] {
                    throw new Error('Function not implemented.')
                }}
            />
        </>
    )
}

export default MonetaryText
