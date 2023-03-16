import React, { useEffect } from 'react'
import CardInfo from '../../components/Card'
import { BsPeople } from 'react-icons/bs'
import { SlNotebook } from 'react-icons/sl'
import { Wrap } from '@chakra-ui/react'
import { RiMoneyDollarBoxLine } from 'react-icons/ri'
import { useDebtor } from '../../services/queries/debtorQueries'
import { useAuth } from '../login/authentication/useAuth'
import MonetaryText from '../../components/MonetaryText'
import SectionAlert from '../../components/SectionAlert'
import { useOutlet } from '../../components/useOutletContext'

const Home = () => {
    const auth = useAuth()
    const { data, isError } = useDebtor(auth.userData.uid)

    const { submitLinks } = useOutlet()

    useEffect(() => {
        if (submitLinks) {
            submitLinks([])
        }
    }, [submitLinks])

    return (
        <>
            <SectionAlert
                isError={isError}
                alertMsg={'Ocorreu um erro ao obter dados do sistema'}
                status={'error'}
            />
            {/* Dashboard info cards */}
            {data && !isError ? (
                <Wrap spacing={4}>
                    <CardInfo icon={BsPeople} title={'Credores totais'}>
                        {data?.count_creditors || 0}
                    </CardInfo>
                    <CardInfo icon={SlNotebook} title={'Dívidas totais'}>
                        {data?.count_debts || 0}
                    </CardInfo>
                    <CardInfo
                        icon={RiMoneyDollarBoxLine}
                        title={'Valor total dívidas'}
                    >
                        <MonetaryText
                            value={
                                Number(data?.total_price_debts?.toFixed(2)) || 0
                            }
                        />
                    </CardInfo>
                    <CardInfo icon={SlNotebook} title={'Dívidas pagas'}>
                        {data.payed_debts || 0}
                    </CardInfo>
                    <CardInfo icon={SlNotebook} title={'Dívidas em aberto'}>
                        {data.open_debts || 0}
                    </CardInfo>
                </Wrap>
            ) : (
                <div />
            )}
        </>
    )
}

export default Home
