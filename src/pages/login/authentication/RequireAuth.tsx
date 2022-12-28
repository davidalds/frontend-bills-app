import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let location = useLocation()
    const auth = useAuth()
    if (!auth.isAuthenticated()) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }
    return children
}

export default RequireAuth
