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
    useBoolean,
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
import { monetaryFormat, monetaryUnformat } from '../../utils/formatFunctions'
import {
    AiOutlineCheckCircle,
    AiOutlineUnlock,
    AiOutlineLock,
} from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { TfiReload } from 'react-icons/tfi'
import { useToastAlert } from '../../components/toastAlert'
import { useQueryClient } from 'react-query'
import SpinnerSection from '../../components/SpinnerSection'
import SectionAlert from '../../components/SectionAlert'
import { useOutlet } from '../../components/useOutletContext'
import SelectComponent from '../../components/FormSelect'
import { useCreditorsSelect } from '../../services/queries/creditorsQueries'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema/debtsFormSchemaEdit'

const DebtInfo = () => {
    const queryClient = useQueryClient()
    const auth = useAuth()
    const { id } = useParams()
    const toast = useToastAlert()
    const { data, isLoading, isError } = useDebt(
        auth.userData.uid,
        parseInt(id!)
    )
    const { data: creditorData } = useCreditorsSelect(auth.userData.uid)
    const { mutateAsync } = useMutationDebt(auth.userData.uid, parseInt(id!))
    const {
        register,
        setValue,
        control,
        handleSubmit,
        resetField,
        formState: { errors, dirtyFields },
    } = useForm<GetDebtData>({ resolver: yupResolver(schema) })
    const { submitLinks } = useOutlet()
    const [isEdit, setEdit] = useBoolean()

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
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'Creditor') {
                    setValue(key as any, value || { id: '' })
                } else if (key === 'price') {
                    // multiplica por 100 para as casas decimais ficarem de acordo quando for utilizar a máscara monetária
                    setValue(key as any, value * 100)
                } else {
                    setValue(key as any, value)
                }
            })
        }
    }, [data, setValue])

    const submitStatus = useCallback(
        async (status: StatusType) => {
            try {
                await mutateAsync({ status: status })
                queryClient.invalidateQueries('debt')
                setEdit.off()
                toast('Status alterado com sucesso', 'success')
            } catch (err) {
                toast('Ocorreu um erro ao alterar status', 'error')
            }
        },
        [mutateAsync, toast, queryClient, setEdit]
    )

    const changeEdit = () => {
        setEdit.toggle()
        // Virtual DOM
        if (isEdit) {
            toast('Edição de dívida bloqueada!', 'info')
        } else {
            toast('Edição de dívida desbloqueada!', 'info')
        }
    }

    const submit = async (data: GetDebtData) => {
        try {
            let debtObj = {}

            // Só lança o price pra o backend se o campo for modificado
            if (dirtyFields.price) {
                debtObj = {
                    CreditorId: data.Creditor.id,
                    description: data.description,
                    payday: data.payday,
                    price: parseFloat(monetaryUnformat(data.price)),
                    title: data.title,
                }
            } else {
                debtObj = {
                    CreditorId: data.Creditor.id,
                    description: data.description,
                    payday: data.payday,
                    title: data.title,
                }
            }
            await mutateAsync({ ...debtObj })
            queryClient.invalidateQueries('debt')
            setEdit.off()
            // reseta o isDirty no campo price
            resetField('price')
            toast('Informações da dívida editadas com sucesso', 'success')
        } catch {
            toast('Ocorreu um erro ao editar informações da dívida', 'error')
        }
    }

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
                        justifyContent={'space-between'}
                    >
                        <HStack>
                            {data.status !== 'Cancelada' ? (
                                <Button
                                    colorScheme={'orange'}
                                    leftIcon={
                                        <Icon
                                            as={
                                                isEdit
                                                    ? AiOutlineLock
                                                    : AiOutlineUnlock
                                            }
                                        />
                                    }
                                    size={'sm'}
                                    onClick={changeEdit}
                                >
                                    {isEdit
                                        ? 'Bloquear edição'
                                        : 'Desbloquear edição'}
                                </Button>
                            ) : (
                                <></>
                            )}
                        </HStack>
                        <HStack>
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
                                    data?.status !== 'Cancelada'
                                        ? 'red'
                                        : 'orange'
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
                    </HStack>
                    <VStack
                        as={'form'}
                        onSubmit={handleSubmit(submit)}
                        p={6}
                        boxShadow={'base'}
                    >
                        <FormInputsWrapper columns={2}>
                            <InputComponent
                                type={'text'}
                                {...register('title')}
                                label={'Título'}
                                isReadOnly={!isEdit}
                                isRequired
                                isInvalid={errors.title ? true : false}
                                errors={errors.title}
                            />
                            <Controller
                                control={control}
                                name={'price'}
                                render={({ field }) => (
                                    <InputComponent
                                        {...field}
                                        type={'text'}
                                        as={NumberFormatBase}
                                        format={(num: string) =>
                                            monetaryFormat(num, false)
                                        }
                                        label={'Valor'}
                                        isReadOnly={!isEdit}
                                        isAllowed={(values) => {
                                            const { floatValue } = values
                                            const MAX_LIMIT = 9999.99
                                            return (
                                                floatValue! / 10000 <= MAX_LIMIT
                                            )
                                        }}
                                        isRequired
                                        isInvalid={errors.price ? true : false}
                                        errors={errors.price}
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
                                type={'date'}
                                {...register('payday')}
                                label={'Data de pagamento'}
                                isReadOnly={!isEdit}
                                isRequired
                                isInvalid={errors.payday ? true : false}
                                errors={errors.payday}
                            />
                        </FormInputsWrapper>
                        <FormInputsWrapper columns={2}>
                            <SelectComponent
                                label={'Credor'}
                                {...register('Creditor.id')}
                                isInvalid={errors.Creditor?.id ? true : false}
                                errors={errors.Creditor?.id}
                                isReadOnly={!isEdit}
                                isRequired
                            >
                                {creditorData?.rows ? (
                                    creditorData.rows.map((creditor) => (
                                        <option
                                            key={creditor.id}
                                            value={creditor.id}
                                        >
                                            {creditor.name}
                                        </option>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </SelectComponent>
                            <InputComponent
                                type={'text'}
                                {...register('Creditor.creditor_type')}
                                label={'Credor tipo'}
                                isReadOnly
                            />
                        </FormInputsWrapper>
                        <FormInputsWrapper columns={1}>
                            <FormControl isReadOnly={!isEdit}>
                                <FormLabel>Descrição:</FormLabel>
                                <Textarea {...register('description')} />
                            </FormControl>
                        </FormInputsWrapper>
                        <HStack justifyContent={'end'} w={'100%'} pt={4}>
                            {isEdit ? (
                                <Button colorScheme={'green'} type={'submit'}>
                                    Concluir edição
                                </Button>
                            ) : (
                                <></>
                            )}
                        </HStack>
                    </VStack>
                </>
            ) : (
                <div />
            )}
        </>
    )
}

export default DebtInfo
