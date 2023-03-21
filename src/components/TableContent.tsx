import { TableContainer, Table, Tbody } from '@chakra-ui/react'
import { ReactNode } from 'react'

const TableContent = ({ children }: { children: ReactNode }) => {
    return (
        <TableContainer>
            <Table variant={'simple'}>
                <Tbody color={'gray.400'} fontWeight={'bold'} fontSize={'sm'}>
                    {children}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TableContent
