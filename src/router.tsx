import React, { lazy } from 'react'

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'

import RequireAuth from './pages/login/authentication/RequireAuth'

const LayoutImport = lazy(() => import('./components/Layout'))
const LoginPageImport = lazy(() => import('./pages/login'))
const SignUpPageImport = lazy(() => import('./pages/register'))
const RecoverPageImport = lazy(() => import('./pages/recover'))
const ChangePasswordPageImport = lazy(() => import('./pages/change'))
const HomeImport = lazy(() => import('./pages/home'))
const CreditorsListImport = lazy(() => import('./pages/creditors'))
const CreditorsInfoImport = lazy(
    () => import('./pages/creditors/CreditorsInfo')
)
const DebtsListImport = lazy(() => import('./pages/debts'))
const DebtInfoImport = lazy(() => import('./pages/debts/DebtInfo'))
const DebtorInfoImport = lazy(() => import('./pages/debtor/DebtorInfo'))
const ErrorPageImport = lazy(() => import('./components/ErrorPage'))

const routers = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<LoginPageImport />} />
            <Route path="/cadastrar" element={<SignUpPageImport />} />
            <Route path="/recuperar" element={<RecoverPageImport />} />
            <Route
                path="/mudarSenha/:token"
                element={<ChangePasswordPageImport />}
            />
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <LayoutImport />
                    </RequireAuth>
                }
                errorElement={<ErrorPageImport />}
            >
                <Route index element={<HomeImport />} />
                <Route path="/credores" element={<CreditorsListImport />} />
                <Route path="/credores/:id" element={<CreditorsInfoImport />} />
                <Route path="/dividas" element={<DebtsListImport />} />
                <Route path="/dividas/:id" element={<DebtInfoImport />} />
                <Route path="/debtor" element={<DebtorInfoImport />} />
            </Route>
        </>
    )
)

export default routers
