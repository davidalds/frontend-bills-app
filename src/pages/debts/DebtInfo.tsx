import { useParams } from 'react-router-dom'
import { useDebt, useMutationDebt } from '../../services/queries/debtsQueries'
import { useAuth } from '../login/authentication/useAuth'
import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    Textarea,
    VStack,
} from '@chakra-ui/react'
import FormInputsWrapper from '../../components/FormInputsWrapper'
import InputComponent from '../../components/FormInputs'
import { useForm, Controller } from 'react-hook-form'
import {
    GetDebtData,
    StatusType,
} from '../../services/queries/interfaces/debtsQueriesInterface'
import { useCallback, useEffect } from 'react'
import { NumberFormatBase } from 'react-number-format'
import { dateFormat, monetaryFormat } from '../../resources/formatFunctions'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { TfiReload } from 'react-icons/tfi'
import { useToastAlert } from '../../components/toastAlert'
import { useQueryClient } from 'react-query'
import SpinnerSection from '../../components/SpinnerSection'
import SectionAlert from '../../components/SectionAlert'
import { useOutlet } from '../../components/useOutletContext'

const DebtInfo = () => {
    const queryClient = useQueryClient()
    const auth = useAuth()
    const { id } = useParams()
    const toast = useToastAlert()
    const { data, isLoading, isError } = useDebt(
        auth.userData.id,
        parseInt(id!)
    )
    const { mutateAsync } = useMutationDebt(auth.userData.id, parseInt(id!))
    const { register, setValue, control } = useForm<GetDebtData>()
    const {submitLinks} = useOutlet()

    useEffect(() => {
        if (submitLinks && id) {
            submitLinks([
                { path: 'Dívidas', url: '/dividas' },
                { path: 'Dívida', url: `/dividas/${id}` },
            ])
        }
    }, [submitLinks, id])

    useEffect(() => {
        if (data) {
            const debtObj = {
                ...data,
                payday: dateFormat(data.payday),
            }
            Object.entries(debtObj).map(([key, value]) =>
                setValue(key as any, value)
            )
        }
    }, [data, setValue])

    const submitStatus = useCallback(
        async (status: StatusType) => {
            try {
                await mutateAsync({ status: status })
                queryClient.invalidateQueries('debt')
                toast('Status alterado com sucesso', 'success')
            } catch (err) {
                toast('Ocorreu um erro ao alterar status', 'error')
            }
        },
        [mutateAsync, toast, queryClient]
    )

    return (
        <>
            <SpinnerSection
                isLoading={isLoading}
                loadingMsg={'Carregando dívida...'}
            />
            <SectionAlert
                isError={isError}
                status={'error'}
                alertMsg={'Ocorreu um erro ao carregar dívida'}
            />
            {data && !isError ? (
                <>
                    <HStack
                        p={2}
                        boxShadow={'base'}
                        mb={2}
                        spacing={2}
                        justifyContent={'end'}
                    >
                        {data?.status !== 'Cancelada' ? (
                            <Button
                                size={'sm'}
                                colorScheme={
                                    data?.status === 'Devendo'
                                        ? 'green'
                                        : 'yellow'
                                }
                                leftIcon={
                                    <Icon
                                        as={
                                            data?.status === 'Devendo'
                                                ? AiOutlineCheckCircle
                                                : TfiReload
                                        }
                                    />
                                }
                                onClick={() =>
                                    submitStatus(
                                        data?.status === 'Devendo'
                                            ? 'Paga'
                                            : 'Devendo'
                                    )
                                }
                            >
                                {data?.status === 'Devendo'
                                    ? 'Confirmar pagamento'
                                    : 'Desconfirmar pagamento'}
                            </Button>
                        ) : (
                            <div />
                        )}
                        <Button
                            size={'sm'}
                            colorScheme={
                                data?.status !== 'Cancelada' ? 'red' : 'orange'
                            }
                            leftIcon={
                                <Icon
                                    as={
                                        data?.status !== 'Cancelada'
                                            ? ImCancelCircle
                                            : TfiReload
                                    }
                                />
                            }
                            onClick={() =>
                                submitStatus(
                                    data?.status !== 'Cancelada'
                                        ? 'Cancelada'
                                        : 'Devendo'
                                )
                            }
                        >
                            {data?.status !== 'Cancelada'
                                ? 'Cancelar dívida'
                                : 'Reabrir dívida'}
                        </Button>
                    </HStack>
                    <VStack as={'form'} p={6} boxShadow={'base'}>
                        <FormInputsWrapper columns={2}>
                            <InputComponent
                                type={'text'}
                                {...register('title')}
                                label={'Título'}
                                isReadOnly
                            />
                            <Controller
                                control={control}
                                name={'price'}
                                render={({ field: { name, value } }) => (
                                    <InputComponent
                                        type={'text'}
                                        as={NumberFormatBase}
                                        format={(num: string) =>
                                            monetaryFormat(num, true)
                                        }
                                        label={'Valor'}
                                        isReadOnly
                                        name={name}
                                        value={value}
                                    />
                                )}
                            />
                        </FormInputsWrapper>
                        <FormInputsWrapper columns={2}>
                            <InputComponent
                                type={'text'}
                                {...register('status')}
                                label={'Status'}
                                isReadOnly
                            />
                            <InputComponent
                                type={'text'}
                                {...register('payday')}
                                label={'Data de pagamento'}
                                isReadOnly
                            />
                        </FormInputsWrapper>
                        <FormInputsWrapper columns={2}>
                            <InputComponent
                                type={'text'}
                                {...register('Creditor.name')}
                                label={'Credor'}
                                isReadOnly
                            />
                            <InputComponent
                                type={'text'}
                                {...register('Creditor.creditor_type')}
                                label={'Credor tipo'}
                                isReadOnly
                            />
                        </FormInputsWrapper>
                        <FormInputsWrapper columns={1}>
                            <FormControl isReadOnly>
                                <FormLabel>Descrição:</FormLabel>
                                <Textarea {...register('description')} />
                            </FormControl>
                        </FormInputsWrapper>
                    </VStack>
                </>
            ) : (
                <div />
            )}
        </>
    )
}

export default DebtInfo
