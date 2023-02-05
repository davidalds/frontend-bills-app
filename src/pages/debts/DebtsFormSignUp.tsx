import React from 'react'

import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Icon,
    Textarea,
    useDisclosure,
    VStack,
} from '@chakra-ui/react'

import { useForm, Controller } from 'react-hook-form'

import ModalComponent from '../../components/ModalComponent'
import FormInputsWrapper from '../../components/FormInputsWrapper'
import {
    IPropsDebtsForm,
    DebtsFormValues,
} from './interface/debtsFormSignUpInterface'
import InputComponent from '../../components/FormInputs'
import SelectComponent from '../../components/FormSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema/debtsFormSchema'
import { useCreditorsSelect } from '../../services/queries/creditorsQueries'
import { useMutationDebts } from '../../services/queries/debtsQueries'
import { useToastAlert } from '../../components/toastAlert'
import { useQueryClient } from 'react-query'
import { useAuth } from '../login/authentication/useAuth'
import {
    monetaryFormat,
    monetaryUnformat,
} from '../../resources/formatFunctions'
import { NumberFormatBase } from 'react-number-format'
import { AiOutlinePlus } from 'react-icons/ai'
import CreditorsFormSignUp from '../creditors/CreditorsFormSignUp'

const DebtsFormSignUp = ({ isOpen, onClose, creditorId }: IPropsDebtsForm) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<DebtsFormValues>({
        resolver: yupResolver(schema),
    })

    const auth = useAuth()
    const queryClient = useQueryClient()

    const {
        isOpen: isOpenFormCreditor,
        onOpen: onOpenFormCreditor,
        onClose: onCloseFormCreditor,
    } = useDisclosure()

    const { data } = useCreditorsSelect(auth.userData.id)
    const { mutateAsync } = useMutationDebts()
    const toast = useToastAlert()

    const submit = async (data: DebtsFormValues) => {
        try {
            const obj_data = {
                ...data,
                price: parseFloat(monetaryUnformat(data.price)),
            }

            await mutateAsync(obj_data)
            queryClient.invalidateQueries('debts')

            if (creditorId) {
                queryClient.invalidateQueries('creditor_debts')
                queryClient.invalidateQueries('creditor')
            }

            closeModal()
            toast('Dívida cadastrada com sucesso', 'success')
        } catch (err) {
            toast('Ocorreu um erro ao cadastrar dívida', 'error')
        }
    }

    const closeModal = () => {
        reset()
        onClose()
    }

    return (
        <>
            <CreditorsFormSignUp
                isOpen={isOpenFormCreditor}
                onClose={onCloseFormCreditor}
            />
            <ModalComponent
                modalTitle={'Cadastrar nova dívida'}
                isOpen={isOpen}
                onClose={onClose}
            >
                <VStack as={'form'} onSubmit={handleSubmit(submit)}>
                    <input
                        type="hidden"
                        {...register('DebtorId')}
                        value={auth.userData.id}
                    />
                    <FormInputsWrapper columns={2}>
                        <InputComponent
                            isInvalid={errors.title ? true : false}
                            type={'text'}
                            label={'Título:'}
                            {...register('title')}
                            errors={errors.title}
                            isRequired
                        />
                        <Controller
                            name={'price'}
                            control={control}
                            render={({ field }) => (
                                <InputComponent
                                    type={'text'}
                                    label={'Valor:'}
                                    as={NumberFormatBase}
                                    format={(num: string) =>
                                        monetaryFormat(num, false)
                                    }
                                    // Roda o onChange e modifica os valores enquanto satisfazer a condição criada
                                    isAllowed={(values) => {
                                        const { floatValue } = values
                                        const MAX_LIMIT = 9999.99
                                        return floatValue! / 10000 <= MAX_LIMIT
                                    }}
                                    isInvalid={errors.price ? true : false}
                                    errors={errors.price}
                                    isRequired
                                    {...field}
                                />
                            )}
                        />
                    </FormInputsWrapper>
                    <FormInputsWrapper columns={creditorId ? 1 : 2}>
                        <InputComponent
                            isInvalid={errors.payday ? true : false}
                            type={'date'}
                            label={'Data de pagamento:'}
                            {...register('payday')}
                            errors={errors.payday}
                            isRequired
                        />
                        {creditorId ? (
                            <input
                                type={'hidden'}
                                value={creditorId}
                                {...register('CreditorId')}
                            />
                        ) : (
                            <HStack spacing={2}>
                                <SelectComponent
                                    isInvalid={errors.CreditorId ? true : false}
                                    label={'Credor'}
                                    {...register('CreditorId')}
                                    errors={errors.CreditorId}
                                    isRequired
                                >
                                    {data?.rows ? (
                                        data.rows.map((creditor) => (
                                            <option
                                                value={creditor.id}
                                                key={creditor.id}
                                            >
                                                {creditor.name}
                                            </option>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </SelectComponent>
                                <Button
                                    title="Adicionar credor"
                                    colorScheme={'green'}
                                    variant={'outline'}
                                    onClick={onOpenFormCreditor}
                                    alignSelf={'end'}
                                >
                                    <Icon as={AiOutlinePlus} />
                                </Button>
                            </HStack>
                        )}
                    </FormInputsWrapper>
                    <FormInputsWrapper columns={1}>
                        <FormControl
                            isInvalid={errors.description ? true : false}
                        >
                            <FormLabel>Descrição:</FormLabel>
                            <Textarea {...register('description')} />
                            <FormErrorMessage>
                                {errors.description?.message}
                            </FormErrorMessage>
                        </FormControl>
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
        </>
    )
}

export default DebtsFormSignUp
