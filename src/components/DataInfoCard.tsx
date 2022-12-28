import { VStack, Text, Tag } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../pages/login/authentication/useAuth'

interface data {
    tag: string
    text: string
}

interface DataInfoCardProps {
    dataInfo: data[]
}

const DataInfoCard = ({ dataInfo }: DataInfoCardProps) => {
    return (
        <>
            <VStack
                display={'flex'}
                alignItems={'flex-start'}
            >
                {dataInfo.map(({ tag, text }, index) => (
                    <Text fontWeight={'bold'} key={index}>
                        <Tag size={'md'} bgColor={'green.200'} mr={1}>
                            {tag}
                        </Tag>
                        {text}
                    </Text>
                ))}
            </VStack>
        </>
    )
}

export default DataInfoCard
