import { Box, Button, Center, Heading, HStack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import InputComponent from '../../components/FormInputs'
import FormInputsWrapper from '../../components/FormInputsWrapper'
import { useToastAlert } from '../../components/toastAlert'
import { useMutationChangePassword } from '../../services/queries/debtorQueries'
import { useAuth } from '../login/authentication/useAuth'
import { FormChangePassword } from './interface/changePasswordInterface'
import schema from './schema/changePasswordSchema'

const ChangePasswordPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormChangePassword>({
        resolver: yupResolver(schema),
    })

    const auth = useAuth()

    const { mutateAsync } = useMutationChangePassword()
    const { token } = useParams()

    const [isLoading, setIsLoading] = useState<boolean>()
    const toast = useToastAlert()

    const navigate = useNavigate()

    const submit = async (data: FormChangePassword) => {
        try {
            delete data.confirm_password
            setIsLoading(true)
            await mutateAsync(data)
            toast('A sua senha foi alterada com sucesso', 'success')
            setIsLoading(false)
            navigate('/login')
        } catch (err: any) {
            setIsLoading(false)
            if (err.response.status === 404) {
                toast(err.response.data.errors.msg, 'error')
            } else if (err.response.status === 401) {
                toast(err.response.data.errors.msg, 'error')
            } else {
                toast('Ocorreu um erro ao alterar a senha', 'error')
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
                    w={'500px'}
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
                            Mudar Senha
                        </Heading>
                        <input
                            type={'hidden'}
                            {...register('token')}
                            value={token}
                        />
                        <FormInputsWrapper columns={1}>
                            <InputComponent
                                type={'password'}
                                label={'Nova senha:'}
                                {...register('password')}
                                errors={errors.password}
                                isInvalid={errors.password ? true : false}
                                isRequired
                            />
                        </FormInputsWrapper>
                        <FormInputsWrapper columns={1}>
                            <InputComponent
                                type={'password'}
                                label={'Confirmar senha:'}
                                {...register('confirm_password')}
                                errors={errors.confirm_password}
                                isInvalid={
                                    errors.confirm_password ? true : false
                                }
                                isRequired
                            />
                        </FormInputsWrapper>
                        <HStack justifyContent={'flex-end'} w={'100%'}>
                            <Button
                                type={'submit'}
                                colorScheme={'green'}
                                isLoading={isLoading}
                            >
                                Alterar senha
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </>
    )
}

export default ChangePasswordPage
