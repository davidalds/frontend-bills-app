import React from 'react'
import {
    Box,
    Text,
    TableContainer,
    Table,
    Tbody,
    Icon,
    HStack,
    Button,
    Tag,
} from '@chakra-ui/react'

import { IPropsTable } from './interfaces/table'
import { GrAdd } from 'react-icons/gr'

const TableComponent = ({
    dataCount,
    dataTitle,
    tableButtonLabel,
    openModal,
    page,
    limit,
    children,
    previousPage,
    nextPage,
    isPreviousData,
}: IPropsTable) => {
    return (
        <>
            <Box p={6} boxShadow={'base'}>
                <HStack justifyContent={'space-between'} mb={4}>
                    <Text fontSize={'xl'} fontWeight={'bold'}>
                        {String(dataCount) + ' ' + dataTitle}
                    </Text>
                    {dataCount > 0 ? (
                        <HStack spacing={2}>
                            <Button
                                size={'xs'}
                                colorScheme={'teal'}
                                onClick={() => previousPage(page - 1)}
                                isDisabled={page === 1}
                            >
                                Anterior
                            </Button>
                            <Tag bgColor={'gray.700'} color={'white'}>
                                Página {page} de {Math.ceil(dataCount / limit)}
                            </Tag>
                            <Button
                                size={'xs'}
                                colorScheme={'teal'}
                                onClick={() =>
                                    !isPreviousData ? nextPage(page + 1) : 0
                                }
                                isDisabled={
                                    page === Math.ceil(dataCount / limit) ||
                                    isPreviousData
                                }
                            >
                                Próximo
                            </Button>
                        </HStack>
                    ) : (
                        <div />
                    )}
                </HStack>
                <TableContainer>
                    <Table variant={'simple'}>
                        <Tbody
                            color={'gray.400'}
                            fontWeight={'bold'}
                            fontSize={'sm'}
                        >
                            {children}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            {openModal ? (
                <Box
                    as={'button'}
                    w={'100%'}
                    p={'3'}
                    transition={'all 0.2s'}
                    bgColor={'green.50'}
                    color={'green.600'}
                    fontWeight={'bold'}
                    display={'flex'}
                    justifyContent={'center'}
                    _hover={{ bgColor: 'green.100' }}
                    onClick={openModal}
                >
                    <Icon as={GrAdd} mr={2} my={'auto'} />
                    Adicionar {tableButtonLabel}
                </Box>
            ) : (
                <></>
            )}
        </>
    )
}

export default TableComponent
