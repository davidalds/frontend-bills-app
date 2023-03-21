import {
    Badge,
    Button,
    HStack,
    Icon,
    Square,
    useDisclosure,
    Text,
    Tr,
    Td,
} from '@chakra-ui/react'
import { AiOutlineCalendar, AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert } from 'react-icons/hi2'
import { NotifyDebtsInterface } from '../services/queries/interfaces/debtsNotifyInterface'
import { dateFormat } from '../utils/formatFunctions'
import ModalComponent from './ModalComponent'
import TableContent from './TableContent'
import { Link } from 'react-router-dom'

const NotifyDebts = (data: NotifyDebtsInterface) => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <>
            <ModalComponent
                isOpen={isOpen}
                modalTitle={'Dívidas perto da data de pagamento'}
                onClose={onClose}
            >
                {data.total ? (
                    <TableContent>
                        {data.debts.map(({ id, title, payday }) => (
                            <Tr key={id}>
                                <Td>{title}</Td>
                                <Td>
                                    <Icon
                                        as={AiOutlineCalendar}
                                        mr={2}
                                        color={'red'}
                                    />
                                    {dateFormat(payday)}
                                </Td>
                                <Td>
                                    <HStack
                                        justifyContent={'center'}
                                        spacing="8px"
                                    >
                                        <Button
                                            as={Link}
                                            to={`/dividas/${id}`}
                                            leftIcon={
                                                <Icon as={AiOutlineEye} />
                                            }
                                            size={'sm'}
                                            colorScheme={'green'}
                                            onClick={onClose}
                                        >
                                            Ver
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                    </TableContent>
                ) : (
                    <Text fontSize={'lg'} textAlign={'center'}>
                        Nenhuma dívida perto da data de pagamento.
                    </Text>
                )}
                <HStack justifyContent={'end'} w={'100%'} pt={4}>
                    <Button
                        colorScheme={'gray'}
                        type={'button'}
                        onClick={onClose}
                    >
                        Fechar
                    </Button>
                </HStack>
            </ModalComponent>
            <Square bgColor={'white'} p={4} as={Button} onClick={onOpen}>
                <Icon as={HiOutlineBellAlert} color={'gray.800'} w={5} h={5} />
                {data.total ? (
                    <Badge ml={1} colorScheme={'red'}>
                        {data.total}
                    </Badge>
                ) : (
                    <></>
                )}
            </Square>
        </>
    )
}

export default NotifyDebts
