import React, { useEffect, useState } from 'react'

import { Tr, Td, HStack, Icon, useDisclosure, Button } from '@chakra-ui/react'

import MenuSection from '../../components/MenuSection'
import TableComponent from '../../components/Table'

import { useCreditors } from '../../services/queries/creditorsQueries'
import SectionAlert from '../../components/SectionAlert'

import SpinnerSection from '../../components/SpinnerSection'

import { AiOutlineEye } from 'react-icons/ai'
import CreditorsFormSignUp from './CreditorsFormSignUp'
import { useAuth } from '../login/authentication/useAuth'
import { Link } from 'react-router-dom'
import { useOutlet } from '../../components/useOutletContext'

const CreditorsList = () => {
    const auth = useAuth()
    const limit = 10
    const [page, setPage] = useState<number>(1)
    const { data, isError, isLoading, isPreviousData } = useCreditors(
        auth.userData.uid,
        page,
        limit
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { submitLinks } = useOutlet()

    useEffect(() => {
        if (submitLinks) {
            submitLinks([{ path: 'Credores', url: '/credores' }])
        }
    }, [submitLinks])

    return (
        <>
            <CreditorsFormSignUp isOpen={isOpen} onClose={onClose} />
            <MenuSection
                sectionTitle={'Credores'}
                sectionSubtitle={'Lista de credores'}
                sectionButtonOption={{ label: 'credor', openModal: onOpen }}
            />
            <SpinnerSection
                isLoading={isLoading}
                loadingMsg={'Carregando credores...'}
            />
            <SectionAlert
                isError={isError}
                status={'error'}
                alertMsg={'Ocorreu um erro ao carregar credores!'}
            />
            {data && !isError ? (
                <TableComponent
                    isPreviousData={isPreviousData}
                    page={page}
                    limit={limit}
                    dataCount={data.count}
                    dataTitle={'credores'}
                    tableButtonLabel={'credor'}
                    openModal={onOpen}
                    previousPage={(newPage) => setPage(newPage)}
                    nextPage={(newPage) => setPage(newPage)}
                >
                    {data.rows.map(({ id, name, email, creditor_type }) => (
                        <Tr
                            key={id}
                            color={'gray.400'}
                            fontWeight={'bold'}
                            fontSize={'sm'}
                        >
                            <Td>{name}</Td>
                            <Td>{email ? email : 'Sem email'}</Td>
                            <Td>{creditor_type}</Td>
                            <Td>
                                <HStack justifyContent={'center'} spacing="8px">
                                    <Button
                                        as={Link}
                                        to={`${id}`}
                                        leftIcon={<Icon as={AiOutlineEye} />}
                                        size={'sm'}
                                        colorScheme={'green'}
                                    >
                                        Ver
                                    </Button>
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </TableComponent>
            ) : (
                <></>
            )}
        </>
    )
}

export default CreditorsList
