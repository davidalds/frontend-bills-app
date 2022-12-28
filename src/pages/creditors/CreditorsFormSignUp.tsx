import React from 'react'

import ModalComponent from '../../components/ModalComponent'

import {
    IPropsCreditorsForm,
    CreditorFormValues,
} from './interface/creditorsFormInterface'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import schema from './schema/creditorsFormSchema'
import {
    Button,
    HStack,
    VStack,
} from '@chakra-ui/react'

import { useMutationCreditors } from '../../services/queries/creditorsQueries'
import { useQueryClient } from 'react-query'

import InputComponent from '../../components/FormInputs'
import FormInputsWrapper from '../../components/FormInputsWrapper'
import { useToastAlert } from '../../components/toastAlert'
import SelectComponent from '../../components/FormSelect'
import { useAuth } from '../login/authentication/useAuth'

const CreditorsFormSignUp = ({ isOpen, onClose }: IPropsCreditorsForm) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreditorFormValues>({
        resolver: yupResolver(schema),
    })

    const toast = useToastAlert()
    const auth = useAuth()

    const { mutateAsync } = useMutationCreditors()
    const queryClient = useQueryClient()

    const submit = async (data: CreditorFormValues) => {
        try {
            await mutateAsync(data)
            queryClient.invalidateQueries('creditors')
            closeModal()
            toast('Credor cadastrado com sucesso', 'success')
        } catch (err) {
            toast('Ocorreu um erro ao cadastrar credor', 'error')
        }
    }

    const closeModal = () => {
        reset()
        onClose()
    }

    return (
        <ModalComponent
            modalTitle={'Cadastrar novo credor'}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <VStack as={'form'} onSubmit={handleSubmit(submit)}>
                <input
                    type={'hidden'}
                    {...register('DebtorId')}
                    value={auth.userData.id}
                ></input>
                <FormInputsWrapper columns={2}>
                    <InputComponent
                        isInvalid={errors.name ? true : false}
                        type={'text'}
                        {...register('name')}
                        label={'Nome:'}
                        errors={errors.name}
                        isRequired
                    />
                    <InputComponent
                        isInvalid={errors.email ? true : false}
                        type={'email'}
                        {...register('email')}
                        label={'E-mail:'}
                        errors={errors.email}
                    />
                </FormInputsWrapper>
                <FormInputsWrapper columns={1}>
                    <SelectComponent
                        isInvalid={errors.creditor_type ? true : false}
                        {...register('creditor_type')}
                        label={'Tipo de credor:'}
                        errors={errors.creditor_type}
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
                        Cadastrar
                    </Button>
                </HStack>
            </VStack>
        </ModalComponent>
    )
}

export default CreditorsFormSignUp
