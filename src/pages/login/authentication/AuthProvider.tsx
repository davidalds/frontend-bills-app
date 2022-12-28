import React, { ReactNode } from 'react'
import jwtDecode from 'jwt-decode'

import { AuthContext } from './AuthContext'
import { useMutationLogin } from '../../../services/queries/loginQueries'
import { TokenType } from './interfaces/tokenInterface'
import { LoginData } from './interfaces/authContextInterface'

//cria o provider (prover os dados e ações criadas dentro do contexto)
const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { mutateAsync } = useMutationLogin()

    const isAuthenticated = () => {
        const access_token = localStorage.getItem('access_token')
        if (access_token) {
            let { exp }: TokenType = jwtDecode(access_token)
            if (Date.now() <= exp * 1000) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const signin = async (
        loginData: LoginData,
        successCallback: VoidFunction,
        errorCallback: (err: any) => void
    ) => {
        try {
            const { data } = await mutateAsync(loginData)
            const token = data.access_token
            localStorage.setItem('access_token', token)
            handleDataUser(token)
            successCallback()
        } catch (err) {
            errorCallback(err)
        }
    }

    const signout = (callback: VoidFunction) => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        callback()
    }

    const handleDataUser = (token: string) => {
        if (token) {
            const decoded_token: { id: number; name: string; email: string } =
                jwtDecode(token)
            localStorage.setItem(
                'user',
                JSON.stringify({
                    id: decoded_token.id,
                    name: decoded_token.name,
                    email: decoded_token.email,
                })
            )
        }
    }

    const getUserData = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user)
        }
        return { id: 0, name: '', email: '' }
    }

    const value = {
        userData: getUserData(),
        isAuthenticated,
        signin,
        signout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
