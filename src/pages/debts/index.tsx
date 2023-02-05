import React, { useCallback, useEffect, useState } from 'react'
import {
    Button,
    HStack,
    Icon,
    Tag,
    Td,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'

import MenuSection from '../../components/MenuSection'
import TableComponent from '../../components/Table'
import { useDebts } from '../../services/queries/debtsQueries'
import SpinnerSection from '../../components/SpinnerSection'
import SectionAlert from '../../components/SectionAlert'
import DebtsFormSignUp from './DebtsFormSignUp'
import { useAuth } from '../login/authentication/useAuth'
import { Link } from 'react-router-dom'
import { AiOutlineEye } from 'react-icons/ai'
import { dateFormat } from '../../resources/formatFunctions'
import { useOutlet } from '../../components/useOutletContext'
import FilterSection from '../../components/FilterSection'
import { StatusType } from '../../services/queries/interfaces/debtsQueriesInterface'
import { useQueryClient } from 'react-query'

const DebtsList = () => {
    const auth = useAuth()
    const limit = 10
    const [page, setPage] = useState<number>(1)
    const [statusFilter, setStatusFilter] = useState<StatusType | ''>('')
    const { data, isError, isLoading, isPreviousData } = useDebts(
        auth.userData.id,
        page,
        limit,
        statusFilter
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const queryclient = useQueryClient()

    const { submitLinks } = useOutlet()

    useEffect(() => {
        if (submitLinks) {
            submitLinks([{ path: 'Dívidas', url: '/dividas' }])
        }
    }, [submitLinks])

    const compareDates = useCallback((debtDate: string) => {
        const date = new Date()
        const [actualDay, actualMonth, actualYear] = [
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear(),
        ]
        const [debtDay, debtMonth, debtYear] = debtDate
            .split('/')
            .map((elem) => parseInt(elem))

        if (actualYear > debtYear) {
            return true
        }

        if (actualMonth > debtMonth && debtYear === actualYear) {
            return true
        }

        if (
            actualDay > debtDay &&
            debtMonth === actualMonth &&
            debtYear === actualYear
        ) {
            return true
        }

        return false
    }, [])

    const changeStatus = useCallback(
        (value: StatusType) => {
            setStatusFilter(value)
            queryclient.invalidateQueries('debts')
            setPage(1)
        },
        [queryclient]
    )

    return (
        <>
            <DebtsFormSignUp isOpen={isOpen} onClose={onClose} />
            <MenuSection
                sectionTitle={'Dívidas'}
                sectionSubtitle={'Lista de dívidas'}
                sectionButtonOption={{ label: 'dívida', openModal: onOpen }}
            />
            <SpinnerSection
                isLoading={isLoading}
                loadingMsg={'Carregando dívidas...'}
            />
            <SectionAlert
                isError={isError}
                status={'error'}
                alertMsg={'Ocorreu um erro ao carregar dívidas'}
            />
            {data && !isError ? (
                <>
                    <FilterSection onChangeStatus={changeStatus} />
                    <TableComponent
                        previousPage={(newPage) => setPage(newPage)}
                        nextPage={(newPage) => setPage(newPage)}
                        isPreviousData={isPreviousData}
                        page={page}
                        limit={limit}
                        dataCount={data.count}
                        dataTitle={'dívidas'}
                        tableButtonLabel={'dívida'}
                        openModal={onOpen}
                    >
                        {data.rows.map(
                            ({
                                id,
                                title,
                                status,
                                payday,
                                Creditor,
                            }) => (
                                <Tr key={id}>
                                    <Td>{title}</Td>
                                    <Td>{Creditor?.name || "Sem credor"}</Td>
                                    <Td>{dateFormat(payday)}</Td>
                                    <Td>{status}</Td>
                                    {status === 'Devendo' ? (
                                        <Td>
                                            {compareDates(
                                                dateFormat(payday)
                                            ) ? (
                                                <Tag colorScheme={'red'}>
                                                    Atraso
                                                </Tag>
                                            ) : (
                                                <Tag colorScheme={'green'}>
                                                    Em dia
                                                </Tag>
                                            )}
                                        </Td>
                                    ) : (
                                        <Td></Td>
                                    )}
                                    <Td>
                                        <HStack
                                            justifyContent={'center'}
                                            spacing="8px"
                                        >
                                            <Button
                                                as={Link}
                                                to={`${id}`}
                                                leftIcon={
                                                    <Icon as={AiOutlineEye} />
                                                }
                                                size={'sm'}
                                                colorScheme={'green'}
                                            >
                                                Ver
                                            </Button>
                                        </HStack>
                                    </Td>
                                </Tr>
                            )
                        )}
                    </TableComponent>
                </>
            ) : (
                <></>
            )}
        </>
    )
}

export default DebtsList
