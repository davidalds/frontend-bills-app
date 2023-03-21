import React from 'react'

import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalContent,
} from '@chakra-ui/react'

import { IPropsModal } from './interfaces/modal'

const ModalComponent = ({
    modalTitle,
    isOpen,
    onClose,
    children,
}: IPropsModal) => {
    return (
        <>
            <Modal
                size={'2xl'}
                isOpen={isOpen}
                onClose={onClose}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <ModalBody>{children}</ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalComponent
