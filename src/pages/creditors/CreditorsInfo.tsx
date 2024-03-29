import {
    Button,
    HStack,
    Icon,
    Stack,
    Td,
    Text,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DataInfoCard from '../../components/DataInfoCard'
import InfoCard from '../../components/InfoCard'
import {
    useCreditor,
    useCreditorDebts,
} from '../../services/queries/creditorsQueries'
import TableComponent from '../../components/Table'
import DebtsFormSignUp from '../debts/DebtsFormSignUp'
import { useAuth } from '../login/authentication/useAuth'
import MonetaryText from '../../components/MonetaryText'
import SpinnerSection from '../../components/SpinnerSection'
import SectionAlert from '../../components/SectionAlert'
import { useOutlet } from '../../components/useOutletContext'
import { AiFillEdit } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import CreditorsFormEdit from './CreditorsFormEdit'
import CreditorsFormDelete from './CreditorsFormDelete'

const CreditorsInfo = () => {
    const auth = useAuth()
    const limit = 5
    const [page, setPage] = useState<number>(1)
    const { id } = useParams()
    const { data, isError, isLoading } = useCreditor(
        auth.userData.uid,
        parseInt(id!)
    )
    const { data: debtsData, isPreviousData } = useCreditorDebts(
        auth.userData.uid,
        page,
        limit,
        parseInt(id!)
    )
    const { isOpen, onClose, onOpen } = useDisclosure()
    const {
        isOpen: isOpenEditModal,
        onClose: onCloseEditModal,
        onOpen: onOpenEditModal,
    } = useDisclosure()
    const {
        isOpen: isOpenDeleteModal,
        onClose: onCloseDeleteModal,
        onOpen: onOpenDeleteModal,
    } = useDisclosure()
    const { submitLinks } = useOutlet()

    useEffect(() => {
        if (submitLinks && id) {
            submitLinks([
                { path: 'Credores', url: `/credores` },
                { path: 'Credor', url: `/credores/${id}` },
            ])
        }
    }, [submitLinks, id])

    return (
        <>
            <SpinnerSection
                isLoading={isLoading}
                loadingMsg={'Carregando dados do credor...'}
            />
            <SectionAlert
                isError={isError}
                status={'error'}
                alertMsg={'Ocorreu um erro ao carregar dados do credor'}
            />
            <DebtsFormSignUp
                isOpen={isOpen}
                onClose={onClose}
                creditorId={parseInt(id!)}
            />
            <CreditorsFormEdit
                isOpen={isOpenEditModal}
                onClose={onCloseEditModal}
                data={data?.creditor}
            />
            <CreditorsFormDelete
                isOpen={isOpenDeleteModal}
                onClose={onCloseDeleteModal}
                data={data?.creditor}
            />
            {debtsData && !isError ? (
                <>
                    <HStack p={2} boxShadow={'base'} mb={2}>
                        <Button
                            colorScheme={'orange'}
                            leftIcon={<Icon as={AiFillEdit} />}
                            size={'sm'}
                            onClick={onOpenEditModal}
                        >
                            Editar informações do credor
                        </Button>
                        <Button
                            colorScheme={'red'}
                            leftIcon={<Icon as={BsFillTrashFill} />}
                            size={'sm'}
                            onClick={onOpenDeleteModal}
                        >
                            Deletar credor
                        </Button>
                    </HStack>
                    <Stack
                        boxShadow={'lg'}
                        w={'100%'}
                        minH={'180px'}
                        direction={'row'}
                        mb={4}
                    >
                        <InfoCard title={'Dados do credor'}>
                            <DataInfoCard
                                dataInfo={[
                                    {
                                        tag: 'Nome',
                                        text: data?.creditor.name || '',
                                    },
                                    {
                                        tag: 'E-mail',
                                        text:
                                            data?.creditor.email ||
                                            'Sem e-mail',
                                    },
                                    {
                                        tag: 'Tipo',
                                        text:
                                            data?.creditor.creditor_type || '',
                                    },
                                ]}
                            />
                        </InfoCard>
                        <InfoCard title={'Valor total dívidas do credor'}>
                            <Text
                                fontWeight={'bold'}
                                fontSize={'3xl'}
                                mx={'auto'}
                            >
                                <MonetaryText
                                    value={data?.total_price_debts || 0}
                                />
                            </Text>
                        </InfoCard>
                    </Stack>
                    <TableComponent
                        isPreviousData={isPreviousData}
                        previousPage={(newPage) => setPage(newPage)}
                        nextPage={(newPage) => setPage(newPage)}
                        page={page}
                        limit={limit}
                        dataCount={debtsData?.count}
                        dataTitle={'dívidas'}
                        tableButtonLabel={'dívida'}
                        openModal={onOpen}
                    >
                        {debtsData.rows.map(({ id, title, price, status }) => (
                            <Tr
                                key={id}
                                color={'gray.400'}
                                fontWeight={'bold'}
                                fontSize={'sm'}
                            >
                                <Td>{title}</Td>
                                <Td>
                                    <MonetaryText value={price} />
                                </Td>
                                <Td>{status}</Td>
                            </Tr>
                        ))}
                    </TableComponent>
                </>
            ) : (
                <div />
            )}
        </>
    )
}

export default CreditorsInfo
