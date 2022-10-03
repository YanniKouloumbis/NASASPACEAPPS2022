import React, {useEffect, useState} from 'react'
import { Box, Link, Text, Slider, SliderTrack, Spinner, VStack, SliderFilledTrack, SliderThumb, Flex, Center, Heading, Button, HStack, Image, Grid, GridItem, Input, SimpleGrid, Tag, Menu, MenuList, MenuItem, MenuButton, MenuIcon, Divider} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowRightIcon, ExternalLinkIcon} from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import {TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from 'react-share'
//react functional component
import CanvasDraw from "react-canvas-draw";
import { useRef } from "react";
import firebase from "firebase";

export default function ImagePage() {

    const router = useRouter()
    const data = router.query;
    console.log(data)
    console.log(data.keywords)
    console.log(data.credit)
    const [brushRadius, setBrushRadius] = useState(12);
    const [prompt, setPrompt] = useState("");
    const [href, setHref] = useState(data.link);
    const [jobId, setJobId] = useState("");
    const [job, setJob] = useState(false);
    const canvas = useRef(null);

    //useEffect that tracks jobId onsnapshot
    useEffect(()=>{
        if(jobId){
            firebase.firestore().collection("jobs").doc(jobId).onSnapshot((doc)=>{
              console.log("CHANGES DETECTED")
              console.log(doc.data())
                if(Object.keys(doc.data()).includes("outputHref") && doc.data().outputHref){
                  canvas.current.eraseAll()
                  setHref(doc.data().outputHref)
                }
                setJob(doc.data());
            })
        }
    }, [jobId])

  return (
    <Box w='100%' h='100%' minH="100vh" px={5} bgGradient='linear(blue.900 0%, blue.700 25%, blue.500 50%)'>
        
        <HStack justifyContent="space-between" pt='1%'>
          <Link href="/" _hover={{ textDecoration: "none" }}>
                    {/* Back Icon */}
                    
                    <Button colorScheme='teal'cursor={"pointer"} transition="all .2s ease-in-out" _hover={{transform: "scale(1.03)"}}  _active={{transform: "scale(1.00)"}}><ArrowBackIcon pr={1} />BACK</Button>
          </Link>
        </HStack>
        
        
        <HStack>
            {/* Image */}
            <Grid
              h='100%'
              templateRows={['repeat(2.5, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)']}
              templateColumns='repeat(6, 1fr)'
              gap={4}
              mt={12}
              ml={2}
              mr={2}
            >
                <GridItem colSpan={[5, 3, 3]} rowSpan={[1, 1, 1]} position="relative">
                    <Heading color='white'fontSize={25} mb={3}>Drag your cursor over the image to reveal a black brush. After drawing, type a prompt below and click generate; we will transform your image using AI. Don`&apos;`t forget to share!</Heading>
                    {job && job.inProgress && <Center zIndex={2} position="absolute" padding={4} right={"30%"} top={"50%"} bg="white" rounded="lg"><Spinner color="blue" mr={4}/><Text>Loading Creation...</Text></Center>}
                    <CanvasDraw ref={canvas} alt="Canvas to Draw On" hideGrid brushRadius={brushRadius} brushColor="black"  imgSrc={href ? href : data.link } canvasWidth={512} canvasHeight={512} />
                </GridItem>
                {/* make gridItem wrap component and shrink */}
                <GridItem colSpan={[5, 3, 3]} rowSpan={[5, 1, 1]} >
                  <Box w='400'  rounded="lg" padding={6} bg='rgba(255, 255, 255, 0.1)'>
                    <Heading mb={6} color="white">{data.title}</Heading>
                    <Text fontSize='23'color="white" noOfLines={[7, 7, 7]}>{data.description}</Text>
                    <Divider mt={4}orientation='horizontal' />
                   
                  <HStack  mt={5}>
                    {Array.isArray(data.keywords) && data.keywords.map((element)=><Tag py={2} size='lg' variant='solid' colorScheme='messenger'>
                    <Text noOfLines={2} fontWeight={'bold'}>{element}</Text>
                    </Tag>)}
                  </HStack>
                  </Box>

                  
                </GridItem>

            </Grid>

        </HStack>
        <Box>
            <SimpleGrid  columns={[1, 1, 2]} spacing={5}
            pt={7}>
              <Input variant={"solid"} placeholder="Enter your creative prompt" value={prompt} onChange={(e)=>setPrompt(e.target.value)}></Input>
                    {/*button 1 with generate image tag*/}
                    <HStack>
                    <VStack w="10%"><Text>Brush Size</Text>
                <Slider w="100%" colorScheme='black' aria-label='painter slider' defaultValue={12} min={4} max={30} onChange={(value)=>setBrushRadius(value)}>
                    <SliderTrack >
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                    </Slider></VStack>
                    <Flex _hover={{transform: "scale(1.03)"}} transition="all .2s ease-in-out" _active={{transform: "scale(1.00)"}}>
                        <Button colorScheme='teal'cursor={"pointer"} onClick={
                    async ()=>{
                        //get firebase document id
                        
                        const docRef = await firebase.firestore().collection("jobs").add({
                            prompt: prompt,
                            href: href ? href : data.link,
                            mask: canvas.current.getDataURL('png', false, "white"),
                            inProgress: false,
                        })
                        console.log(docRef.id);
                        setJobId(docRef.id);
                    }}>GENERATE IMAGE<ArrowRightIcon pl={2}/></Button>
                    
                    </Flex>
                    {/*button 2 with shsare tag, */}
                    <Menu>
                          <MenuButton colorScheme='teal' as={Button} rightIcon={<ExternalLinkIcon />}>
                            SHARE
                          </MenuButton>
                          
                          {/* TWITTER */}
                          <MenuList >
                            <MenuItem>
                                <TwitterShareButton  url={href} title={`I created this with Data Without Limits using a NASA database! Credit to ${data.credit === "" ? "NASA" : data.credit}`}>
                                  <HStack>
                                    <TwitterIcon size={36}/>
                                    <Text>Twitter</Text>
                                    </HStack>
                                </TwitterShareButton>

                                
                            </MenuItem>

                            <MenuItem>
                              <FacebookShareButton url={href} title={`I created this with Data Without Limits using a NASA database! Credit to ${data.credit}`}>
                                <HStack  pl={3} w="100%">
                                      <FacebookIcon size={36} />
                                      <Text>Facebook</Text>
                                </HStack>
                              </FacebookShareButton>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                    </HStack>
        
            </SimpleGrid> 
        </Box>
    </Box>
  )
}
