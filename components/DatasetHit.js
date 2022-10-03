import { Box, Heading, Popover, Text, PopoverContent, Tag } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
export default function Hit({hit, key, zerothLink}) {
    hit.zerothLink = zerothLink;
    return (
        <Link passHref href={{pathname: `/dataset`, query: hit}} key={key} >
            <Box  borderWidth={false?3:0}   background={false?"white":"gray.100"} width="100%" p={5} rounded="lg" transition="all .2s ease-in-out" _hover={{background:"gray.200", transform: "scale(1.02)"}} _active={{
        transform: "scale(1.01)"
    }}>
                <Text>{hit.title}</Text>
                <Text noOfLines={1} fontWeight={'light'}>{hit.description}</Text>
                {/* hit.keyword is an array, map through first 4 objects and create a tag object that contains the keyword*/}
            </Box>
        </Link>
    )
}
