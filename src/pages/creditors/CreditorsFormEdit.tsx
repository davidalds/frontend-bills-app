import React, { useEffect } from 'react'

import InputComponent from '../../components/FormInputs'
import ModalComponent from '../../components/ModalComponent'
import { useForm } from 'react-hook-form'

import {
    CreditorFormValues,
    IPropsCreditorsForm,
} from './interface/creditorsFormInterface'
import { Button, HStack, VStack } from '@chakra-ui/react'
import FormInputsWrapper from '../../components/FormInputsWrapper'
import SelectComponent from '../../components/FormSelect'
import {
    useCreditor,
    useMutationCreditor,
} from '../../services/queries/creditorsQueries'
import { useAuth } from '../login/authentication/useAuth'
import { useParams } from 'react-router-dom'
import { useToastAlert } from '../../components/toastAlert'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema/creditorsFormSchema'
import { useQueryClient } from 'react-query'

const CreditorsFormEdit = ({ isOpen, onClose }: IPropsCreditorsForm) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<CreditorFormValues>({ resolver: yupResolver(schema) })

    const queryClient = useQueryClient()

    const auth = useAuth()
    const { id } = useParams()

    const { data } = useCreditor(auth.userData.id, parseInt(id!))

    const { mutateAsync } = useMutationCreditor(auth.userData.id, parseInt(id!))

    const toast = useToastAlert()

    const submit = async (data: CreditorFormValues) => {
        try {
            await mutateAsync(data)
            queryClient.invalidateQueries('creditor')
            closeModal()
            toast('Credor editado com sucesso', 'success')
        } catch (err) {
            toast('Ocorreu um erro ao editar informações do credor', 'error')
        }
    }

    const closeModal = () => {
        onClose()
    }

    useEffect(() => {
        if (data) {
            Object.entries(data?.creditor).map(([key, value]) =>
                setValue(key as any, value)
            )
        }
    }, [data, setValue])

    return (
        <ModalComponent
            modalTitle={'Editar credor'}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <VStack as={'form'} onSubmit={handleSubmit(submit)}>
                <FormInputsWrapper columns={2}>
                    <InputComponent
                        type={'text'}
                        {...register('name')}
                        label={'Nome:'}
                        errors={errors.name}
                        isInvalid={errors.name ? true : false}
                        isRequired
                    />
                    <InputComponent
                        type={'email'}
                        {...register('email')}
                        label={'E-mail:'}
                        errors={errors.email}
                        isInvalid={errors.email ? true : false}
                        isRequired
                    />
                </FormInputsWrapper>
                <FormInputsWrapper columns={1}>
                    <SelectComponent
                        {...register('creditor_type')}
                        label={'Tipo de credor:'}
                        errors={errors.creditor_type}
                        isInvalid={errors.creditor_type ? true : false}
                        isRequired
                    >
                        <option value={'Fisico'}>Físico</option>
                        <option value={'Juridico'}>Jurídico</option>
                    </SelectComponent>
                </FormInputsWrapper>
                <HStack justifyContent={'end'} w={'100%'} pt={4}>
                    <Button
                        colorScheme={'gray'}
                        type={'button'}
                        onClick={closeModal}
                    >
                        Fechar
                    </Button>
                    <Button colorScheme={'green'} type={'submit'}>
                        Editar
                    </Button>
                </HStack>
            </VStack>
        </ModalComponent>
    )
}

export default CreditorsFormEdit
