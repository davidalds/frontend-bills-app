import React from 'react'
import { Alert, AlertIcon } from '@chakra-ui/react'

import { IPropsSectionAlert } from './interfaces/sectionAlert'

const SectionAlert = ({ isError, status, alertMsg }: IPropsSectionAlert) => {
    return (
        <>
            {isError ? (
                <Alert status={status}>
                    <AlertIcon />
                    {alertMsg}
                </Alert>
            ) : (
                <></>
            )}
        </>
    )
}

export default SectionAlert
