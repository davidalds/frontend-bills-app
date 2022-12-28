import React from 'react'
import { HStack, Spinner, Text } from '@chakra-ui/react'

interface IProps {
    isLoading: boolean
    loadingMsg: string
}

const SpinnerSection = ({ isLoading, loadingMsg }: IProps) => {
    return (
        <>
            {isLoading ? (
                <HStack>
                    <Spinner size={'md'} color={'grenn.500'} mr={2} />
                    <Text fontWeight={'bold'}>{loadingMsg}</Text>
                </HStack>
            ) : (
                <></>
            )}
        </>
    )
}

export default SpinnerSection
