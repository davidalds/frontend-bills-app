import React, { Suspense } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import routers from './router'
import theme from './theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import AuthProvider from './pages/login/authentication/AuthProvider'
import SpinnerLoading from './components/SpinnerLoading'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <AuthProvider>
                    <Suspense fallback={<SpinnerLoading />}>
                        <RouterProvider router={routers} />
                    </Suspense>
                </AuthProvider>
            </ChakraProvider>
            {process.env.NODE_ENV !== 'production' ? (
                <ReactQueryDevtools initialIsOpen={false} />
            ) : (
                <></>
            )}
        </QueryClientProvider>
    )
}

export default App
