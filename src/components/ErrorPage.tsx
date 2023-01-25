import React from 'react'
import { Center, VStack, Text, Link as ChakraLink } from '@chakra-ui/react'

import { Link, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error: any = useRouteError()

    return (
        <Center minH={'100vh'} w={'100%'} flexDir={'column'}>
            <VStack
                bgColor={'gray.600'}
                color={'white'}
                minW={'400px'}
                borderRadius={'md'}
                boxShadow={'lg'}
                p={'4'}
            >
                <Text fontSize={'2xl'}>Ocorreu um erro</Text>
                <VStack>
                    <Text fontWeight={'bold'}>{error.status}</Text>
                    <Text>{error.statusText}</Text>
                </VStack>
            </VStack>
            {error.status === 404 ? (
                <ChakraLink as={Link} to={'/'} mt={4} color={'green'} replace>
                    Ir para página principal
                </ChakraLink>
            ) : (
                <></>
            )}
        </Center>
    )
}

export default ErrorPage
