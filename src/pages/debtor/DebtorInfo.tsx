import React from 'react'
import { Stack } from '@chakra-ui/react'
import InfoCard from '../../components/InfoCard'
import DataInfoCard from '../../components/DataInfoCard'
import { useAuth } from '../login/authentication/useAuth'

const DebtorInfo = () => {
    const auth = useAuth()

    return (
        <>
            <Stack
                boxShadow={'lg'}
                w={'100%'}
                minH={'180px'}
                direction={'row'}
                mb={4}
            >
                <InfoCard title={'Dados do usuário'}>
                    <DataInfoCard
                        dataInfo={[
                            { tag: 'Nome', text: auth.userData.name },
                            { tag: 'E-mail', text: auth.userData.email },
                        ]}
                    />
                </InfoCard>
            </Stack>
        </>
    )
}

export default DebtorInfo
