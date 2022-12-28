import React, { ReactNode } from 'react'
import { Box, Center, Heading, VStack, Icon, WrapItem } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'

interface IProps {
    title: string
    icon: IconType
    children: ReactNode
}

const CardInfo = ({ title, icon, children }: IProps) => {
    return (
        <>
            <WrapItem>
                <VStack
                    boxShadow={'base'}
                    p={1}
                    bgColor={'green.300'}
                    minW={'300px'}
                    borderRadius={'md'}
                    height={'120px'}
                >
                    <Box
                        fontSize={'lg'}
                        display={'flex'}
                        alignItems={'center'}
                        fontWeight={'bold'}
                        color={'white'}
                    >
                        <Icon as={icon} mr={2} />
                        {title}
                    </Box>
                    <Center
                        flex={1}
                        w={'100%'}
                        bgColor={'white'}
                        color={'gray.500'}
                        borderRadius={'md'}
                    >
                        <Heading size={'md'}>{children}</Heading>
                    </Center>
                </VStack>
            </WrapItem>
        </>
    )
}

export default CardInfo
