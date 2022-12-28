import React from 'react'

import { Box, HStack, Spacer, Button, Text, Icon, Tag } from '@chakra-ui/react'
import { GrAdd } from 'react-icons/gr'

import { IPropsMenuSection } from './interfaces/section'

const MenuSection = ({ sectionTitle, sectionSubtitle, sectionButtonOption }: IPropsMenuSection) => {
    return (
        <HStack mb={8}>
            <Box display={'flex'} flexDir={'column'}>
                <Text fontSize={'2xl'} as={'b'} mb={1}>
                    {sectionTitle}
                </Text>
                <Tag size={'sm'}>{sectionSubtitle}</Tag>
            </Box>
            <Spacer />
            <Box>
                <Button
                    leftIcon={<Icon as={GrAdd} />}
                    colorScheme={'green'}
                    variant={'outline'}
                    onClick={sectionButtonOption.openModal}
                >
                    Adicionar {sectionButtonOption.label}
                </Button>
            </Box>
        </HStack>
    )
}

export default MenuSection
