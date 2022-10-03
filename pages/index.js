import React, {useState, useRef, useEffect,} from 'react'
import { Box, Center, Input, useToast, Modal, ModalContent, useDisclosure, ModalOverlay, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Flex, VStack, FormControl, Heading, FormLabel, Text, HStack, FormErrorMessage, FormHelperText, Grid, GridItem, Checkbox, Button, SimpleGrid, InputGroup, InputLeftElement, InputRightElement, Collapse, Spacer, Spinner } from '@chakra-ui/react';
import DatasetSearch from '../components/DatasetSearch'
import ImageSearch from '../components/ImageSearch'

export default function CreateScan() {
    //useState for searchInput
    const [searchInput, setSearchInput] = useState({query: ""});
    const [zerothLink, setZerothLink] = useState("");
    return (
        <Flex bg="black" minWidth="min-content" flexDirection="column" height="100vh" style={{
            backgroundImage: "url('/cosmic.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'


        }}>
        <Center mt={5}>

            <VStack width={["95%", null, "72.420%"]}>
            <VStack width={"100%"} shadow="xl" backgroundColor="gray.50" p={5} borderRadius={10}>
                <DatasetSearch zerothLink={zerothLink} searchInput={searchInput} setSearchInput={setSearchInput}/>
            </VStack>
            </VStack>
        </Center>
        <Spacer/>
            <Center >
                <ImageSearch setZerothLink={setZerothLink} searchInput={searchInput} setSearchInput={setSearchInput}/> 
            </Center>
        </Flex>
    )
}