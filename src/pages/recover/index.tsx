import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
    Center,
    Box,
    VStack,
    Button,
    Heading,
    HStack,
    Link as ChakraLink,
} from '@chakra-ui/react'
import FormInputsWrapper from '../../components/FormInputsWrapper'
import InputComponent from '../../components/FormInputs'
import { useToastAlert } from '../../components/toastAlert'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema/recoverSchema'
import { useMutationRecoverPassword } from '../../services/queries/debtorQueries'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../login/authentication/useAuth'

const RecoverPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ email: string }>({ resolver: yupResolver(schema) })

    const auth = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>()
    const toast = useToastAlert()

    const { mutateAsync } = useMutationRecoverPassword()

    const submit = async (data: { email: string }) => {
        try {
            setIsLoading(true)
            await mutateAsync(data)
            setIsLoading(false)
            toast(
                `Um link de recuperação foi enviado para o seu email: ${data.email}`,
                'success'
            )
        } catch (err: any) {
            setIsLoading(false)
            if (err.response?.status === 404) {
                toast(`${err.response.data.errors.msg}`, 'error')
            } else {
                toast('Erro ao gerar link de recuperação', 'error')
            }
        }
    }

    return auth.isAuthenticated() ? (
        <Navigate to={'/'} replace />
    ) : (
        <>
            <Center w={'100%'} minH={'100vh'}>
                <Box
                    bgColor={'gray.600'}
                    w={'650px'}
                    h={'auto'}
                    p={6}
                    borderRadius={'md'}
                    boxShadow={'dark-lg'}
                >
                    <VStack
                        as={'form'}
                        method={'post'}
                        onSubmit={handleSubmit(submit)}
                        bgColor={'white'}
                        p={4}
                        borderRadius={'md'}
                    >
                        <Heading color={'gray.700'}>Bills App</Heading>
                        <Heading color={'gray.700'} size={'sm'}>
                            Recuperação de Senha
                        </Heading>
                        <FormInputsWrapper columns={1}>
                            <InputComponent
                                placeholder="Informe o e-mail vinculado à conta"
                                {...register('email')}
                                label={'E-mail:'}
                                type={'email'}
                                isInvalid={errors.email ? true : false}
                                errors={errors.email}
                                isRequired
                            />
                        </FormInputsWrapper>
                        <HStack justifyContent={'space-between'} w={'100%'}>
                            <ChakraLink
                                as={Link}
                                color="teal.500"
                                to={'/login'}
                            >
                                Ir para página de login
                            </ChakraLink>
                            <Button
                                type={'submit'}
                                colorScheme={'green'}
                                isLoading={isLoading}
                            >
                                Enviar e-mail de recuperação
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </>
    )
}

export default RecoverPage
