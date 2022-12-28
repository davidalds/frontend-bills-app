import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema/signUpSchema'
import { FormSignUp } from './interfaces/signUpInterface'
import {
    Box,
    Button,
    Center,
    Heading,
    HStack,
    VStack,
    Link as ChakraLink,
} from '@chakra-ui/react'
import FormInputsWrapper from '../../components/FormInputsWrapper'
import InputComponent from '../../components/FormInputs'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useMutationDebtor } from '../../services/queries/debtorQueries'
import { useToastAlert } from '../../components/toastAlert'
import { useAuth } from '../login/authentication/useAuth'

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSignUp>({
        resolver: yupResolver(schema),
    })

    const { mutateAsync } = useMutationDebtor()
    const toast = useToastAlert()
    const navigate = useNavigate()
    const auth = useAuth()

    const submit = async (data: FormSignUp) => {
        try {
            delete data.confirmar_senha
            await mutateAsync(data)
            toast('Usuário cadastrado com sucesso', 'success')
            navigate('/login')
        } catch {
            toast('Ocorreu um erro ao cadastrar usuário', 'error')
        }
    }

    return auth.isAuthenticated() ? (
        <Navigate to={'/'} replace />
    ) : (
        <>
            <Center w={'100%'} minH={'100vh'}>
                <Box
                    bgColor={'gray.600'}
                    w={'800px'}
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
                            Cadastro
                        </Heading>
                        <FormInputsWrapper columns={2}>
                            <InputComponent
                                {...register('name')}
                                label={'Nome do usuário:'}
                                type={'text'}
                                isInvalid={errors.name ? true : false}
                                errors={errors.name}
                                isRequired
                            />
                            <InputComponent
                                {...register('email')}
                                label={'E-mail:'}
                                type={'email'}
                                isInvalid={errors.email ? true : false}
                                errors={errors.email}
                                isRequired
                            />
                        </FormInputsWrapper>
                        <FormInputsWrapper columns={2}>
                            <InputComponent
                                {...register('password')}
                                label={'Senha:'}
                                type={'password'}
                                isInvalid={errors.password ? true : false}
                                errors={errors.password}
                                isRequired
                            />
                            <InputComponent
                                {...register('confirmar_senha')}
                                label={'Confirmar senha:'}
                                type={'password'}
                                isInvalid={
                                    errors.confirmar_senha ? true : false
                                }
                                errors={errors.confirmar_senha}
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
                            <Button type={'submit'} colorScheme={'green'}>
                                Cadastrar
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </>
    )
}

export default SignUpPage
