import React from 'react'

import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error: any = useRouteError()

    return (
        <>
            <h1>{error.statusText || error.message}</h1>
        </>
    )
}

export default ErrorPage
