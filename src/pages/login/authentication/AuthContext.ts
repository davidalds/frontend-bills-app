import React, {createContext} from 'react'
import { AuthContextType } from './interfaces/authContextInterface'

export const AuthContext = createContext<AuthContextType>(null!)