import { Box, HStack } from '@chakra-ui/react'
import { memo, useEffect } from 'react'
import { StatusType } from '../services/queries/interfaces/debtsQueriesInterface'
import SelectComponent from './FormSelect'
import { useForm } from 'react-hook-form'

interface IPropsFilter {
    onChangeStatus: (e: StatusType) => void
}

const FilterSection = ({ onChangeStatus }: IPropsFilter) => {
    const { register, watch, getValues } = useForm<{ statusType: StatusType }>()
    const watchStatusField = watch('statusType')

    useEffect(() => {
        onChangeStatus(getValues('statusType'))
    }, [getValues, onChangeStatus, watchStatusField])

    return (
        <HStack mb={4} boxShadow={'base'} spacing={2} p={2}>
            <Box>
                <SelectComponent
                    {...register('statusType')}
                    label={'Status'}
                    size={'sm'}
                    placeholder={false}
                >
                    <option value="">Todos</option>
                    <option value="Devendo">Devendo</option>
                    <option value="Paga">Paga</option>
                </SelectComponent>
            </Box>
        </HStack>
    )
}

export default memo(FilterSection)
