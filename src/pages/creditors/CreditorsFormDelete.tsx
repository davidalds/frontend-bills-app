import InputComponent from '../../components/FormInputs'
import ModalComponent from '../../components/ModalComponent'
import { useForm } from 'react-hook-form'
import { Button, HStack, VStack } from '@chakra-ui/react'
import {
    CreditorFormValues,
    IPropsCreditorsForm,
} from './interface/creditorsFormInterface'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../login/authentication/useAuth'
import { useToastAlert } from '../../components/toastAlert'
import FormInputsWrapper from '../../components/FormInputsWrapper'
import SelectComponent from '../../components/FormSelect'
import { useMutationDeleteCreditor } from '../../services/queries/creditorsQueries'
import { useDataEntriesCreditor } from '../../hooks/useDataEntries'

const CreditorsFormDelete = ({
    isOpen,
    onClose,
    data,
}: IPropsCreditorsForm) => {
    const { register, setValue, handleSubmit } = useForm<CreditorFormValues>()

    const queryClient = useQueryClient()

    const auth = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()

    const { mutateAsync } = useMutationDeleteCreditor(
        auth.userData.id,
        parseInt(id!)
    )

    // populate fields with data
    useDataEntriesCreditor(data, (k, v) => setValue(k, v))

    const toast = useToastAlert()

    const submit = async () => {
        try {
            await mutateAsync()
            queryClient.invalidateQueries('creditor')
            navigate('/credores', { replace: true })
            toast('Credor deletado com sucesso', 'success')
        } catch (err) {
            toast('Ocorreu um erro ao deletar credor', 'error')
        }
    }

    const closeModal = () => {
        onClose()
    }

    return (
        <ModalComponent
            modalTitle={'Deletar credor'}
            isOpen={isOpen}
            onClose={onClose}
        >
            <VStack as={'form'} onSubmit={handleSubmit(submit)}>
                <FormInputsWrapper columns={2}>
                    <InputComponent
                        type={'text'}
                        {...register('name')}
                        label={'Nome:'}
                        isReadOnly
                    />
                    <InputComponent
                        type={'email'}
                        {...register('email')}
                        label={'E-mail:'}
                        isReadOnly
                    />
                </FormInputsWrapper>
                <FormInputsWrapper columns={1}>
                    <SelectComponent
                        {...register('creditor_type')}
                        label={'Tipo de credor:'}
                        isReadOnly
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
                    <Button colorScheme={'red'} type={'submit'}>
                        Deletar credor
                    </Button>
                </HStack>
            </VStack>
        </ModalComponent>
    )
}

export default CreditorsFormDelete
