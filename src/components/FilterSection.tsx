import { Box, HStack } from '@chakra-ui/react'
import React, {memo} from 'react'
import { StatusType } from '../services/queries/interfaces/debtsQueriesInterface'
import SelectComponent from './FormSelect'

interface IPropsFilter{
    onChangeStatus: (e: StatusType) => void
}

const FilterSection = ({onChangeStatus}: IPropsFilter) => {
    return (
        <HStack mb={4} boxShadow={'base'} spacing={2} p={2}>
            <Box>
                <SelectComponent label={'Status'} size={'sm'} placeholder={false} onChangeStatus={(e) => onChangeStatus(e.target.value)}>
                    <option value="">
                        Todos
                    </option>
                    <option value="Devendo">Devendo</option>
                    <option value="Paga">Paga</option>
                    <option value="Cancelada">Cancelada</option>
                </SelectComponent>
            </Box>
        </HStack>
    )
}

export default memo(FilterSection) 
