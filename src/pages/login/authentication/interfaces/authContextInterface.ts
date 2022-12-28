export interface LoginData {
    email: string
    password: string
}

export interface AuthContextType {
    userData: any
    signin: (
        data: LoginData,
        successCallback: VoidFunction,
        errorCallback: (err: any) => void
    ) => void
    signout: (callback: VoidFunction) => void
    isAuthenticated: () => boolean
}