import React from 'react'

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import Layout from './components/Layout'

import Home from './pages/home'
import CreditorsList from './pages/creditors'
import DebtsList from './pages/debts'
import ErrorPage from './components/ErrorPage'
import LoginPage from './pages/login'
import RequireAuth from './pages/login/authentication/RequireAuth'
import CreditorsInfo from './pages/creditors/CreditorsInfo'
import DebtInfo from './pages/debts/DebtInfo'
import DebtorInfo from './pages/debtor/DebtorInfo'
import SignUpPage from './pages/register'

const routers = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastrar" element={<SignUpPage />} />
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <Layout />
                    </RequireAuth>
                }
                errorElement={<ErrorPage />}
            >
                <Route index element={<Home />} />
                <Route path="/credores" element={<CreditorsList />} />
                <Route path="/credores/:id" element={<CreditorsInfo />} />
                <Route path="/dividas" element={<DebtsList />} />
                <Route path="/dividas/:id" element={<DebtInfo />} />
                <Route path="/debtor" element={<DebtorInfo />} />
            </Route>
        </>
    )
)

export default routers
