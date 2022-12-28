import React, { useState } from 'react'

import {
    Box,
    Button,
    Center,
    Heading,
    Link as ChakraLink,
    HStack,
    VStack,
} from '@chakra-ui/react'
import FormInputsWrapper from '../../components/FormInputsWrapper'
import InputComponent from '../../components/FormInputs'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FormLoginValues } from './interface/loginFormInterface'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema/loginSchema'
import { useToastAlert } from '../../components/toastAlert'
import { useAuth } from './authentication/useAuth'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>()
    const auth = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const toast = useToastAlert()
    const from = location.state?.from?.pathName || '/'

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLoginValues>({
        resolver: yupResolver(schema),
    })

    const submit = async (data: FormLoginValues) => {
        setIsLoading(true)
        await auth.signin(
            data,
            () => navigate(from, { replace: true }),
            (err) => {
                toast(
                    'Verifique as suas credenciais e tente novamente',
                    'error'
                )
                setIsLoading(false)
            }
        )
    }

    return auth.isAuthenticated() ? (
        <Navigate to={from} replace />
    ) : (
        <Center w={'100%'} minH={'100vh'}>
            <Box
                bgColor={'gray.600'}
                w={'400px'}
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
                    <FormInputsWrapper columns={1}>
                        <InputComponent
                            type={'email'}
                            label={'E-mail:'}
                            {...register('email')}
                            isInvalid={errors.email ? true : false}
                            errors={errors.email}
                            isRequired
                        />
                    </FormInputsWrapper>
                    <FormInputsWrapper columns={1}>
                        <InputComponent
                            type={'password'}
                            label={'Senha:'}
                            {...register('password')}
                            isInvalid={errors.password ? true : false}
                            errors={errors.password}
                            isRequired
                        />
                    </FormInputsWrapper>
                    <HStack justifyContent={'space-between'} w={'100%'}>
                        <ChakraLink
                            as={Link}
                            color="teal.500"
                            to={'/cadastrar'}
                        >
                            Cadastre-se aqui
                        </ChakraLink>
                        <Button
                            type={'submit'}
                            isLoading={isLoading}
                            colorScheme={'green'}
                        >
                            Entrar
                        </Button>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    )
}

export default LoginPage
