import React from 'react'
import { Center, Spinner } from '@chakra-ui/react'

const SpinnerLoading = () =>{
    return(
        <Center w={'100%'} minH={'100vh'}>
            <Spinner size={'xl'} color={'green'} thickness={'6px'}/>
        </Center>
    )
}

export default SpinnerLoading