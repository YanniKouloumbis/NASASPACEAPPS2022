import React, { useState, useRef, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Box, HStack, Button, InputRightAddon, Link, Image, SimpleGrid, Text, Heading, Input, Center, VStack, Textarea, InputGroup, InputRightElement, Grid, GridItem, Spinner, Divider} from '@chakra-ui/react'
import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import autosize from "autosize";
const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export default function Dataset() {
    const ref = useRef();
    useEffect(() => {
        autosize(ref.current);
        return () => {
          autosize.destroy(ref.current);
        };
      }, []);
    const router = useRouter();
    const data = router.query;
    console.log(data);
    console.log(data.landingPage)
    //create a state called researcherResponse
    const [question, setQuestion] = useState("");
    const [researcherResponse, setResearcherResponse] = useState("");
    const [loading, setLoading] = useState(false);

    async function requestResearcherResponse() {
        //GTP3 OpenAI Call
        //set researcherResponse to the response from GPT3
        //multiline string
        const prompt = `You are a NASA expert responding to an inquiry by a single user whose knowledge of the natural
        sciences may be anywhere on a scale ranging from rudimentary to advanced, who wants to learn more
        about a particular dataset or field of NASA science.
        
        Dataset:
        ${data.title}
        
        Description:
        ${data.description}
        
        Below is the question, please answer it in JSON format. Only answer the question asked. Answer as
        specifically as possible. Prioritize direct answers in displaying information.
        
        {"question": "${question}", "answer":`;

        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt,
            temperature: 0.7,
            max_tokens: 1400,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
          //expected response: "answer from AI \n sadfsadfasfsf \n"}
          //create a variable called result that extracts from first right bracket and removes the quotes.
            let result = response.data.choices[0].text.split("}")[0];
            //stripe starting and ending spaces
            result = result.trim();
            result = result.substring(1, result.length-1);
            //remove all new lines
            result = result.replace(/\\n/g, "");
            //replace all spaces with a single space
            result = result.replace(/\s+/g, " ");
            setResearcherResponse(result);
    }

    return (
        <Box w='100wh' h='100%' minH="100vh" px={5} bgGradient='linear(blue.900 0%, blue.700 25%, blue.500 50%)'>
            <HStack justifyContent="space-between" pt='1%'>
                <Link href="/" _hover={{ textDecoration: "none" }}>
                    {/* Back Icon */}
                    <Flex _hover={{transform: "scale(1.03)"}} transition="all .2s ease-in-out" _active={{transform: "scale(1.00)"}}>
                    <Button colorScheme='teal'cursor={"pointer"}><ArrowBackIcon pr={1} />BACK</Button> </Flex>
                </Link>
                {/* Open In New  */}
                <a href={`${data.landingPage}`} target="_blank" rel="noreferrer">
                <Flex _hover={{transform: "scale(1.03)"}} transition="all .2s ease-in-out" _active={{transform: "scale(1.00)"}}>
                    <Button colorScheme='teal'>EXPLORE NASA DATASET<ExternalLinkIcon pl={1} /></Button>
                  </Flex>
                    </a>
            </HStack>
          
            <Grid
              h='100%'
              templateRows={['repeat(2.5, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)']}
              templateColumns='repeat(5, 1fr)'
              gap={4}
              mt={12}
              ml={2}
              mr={2}
            >
                <GridItem colSpan={[5, 1, 1]} rowSpan={[1, 1, 1]} >
                    <Image src={data.zerothLink} width={300} height={300} rounded="lg" />
                    <Text mt={1} fontSize={17} colorScheme='grey'>*Image related to search</Text>
                </GridItem>
                {/* make gridItem wrap component and shrink */}
                <GridItem colSpan={[5, 4, 4]} rowSpan={[5, 1, 1]} >
                <Box w='400'  rounded="lg" padding={6} bg='rgba(255, 255, 255, 0.1)'>
                      <Heading mb={6} color="white">{data.title}</Heading>
                      <Text fontSize='23'color="white" noOfLines={[7, 7, 7]}>{data.description}</Text>
                  </Box> 
                </GridItem>

            </Grid>

                {/* Box with translucent color */}
            <Box padding={4} mt={[0,7, 7]}><Heading fontSize={50}>ASK AN AI NASA RESEARCHER ANYTHING:</Heading></Box>
            <Box  rounded="2xl" padding={7} bg='rgba(255, 255, 255, 0.2)'>
            <VStack w='100%' padding={4} spacing ={6} >
                <HStack w='100%'>
                    <Text h='110%' fontSize='30' >Question:</Text>
                    <InputGroup >
                        <Input variant='solid' focusBorderColor='lime' value={question} size="lg"  placeholder='How can I use this dataset for machine learning?'  onKeyPress={async e=> {
                                  if (e.key === 'Enter') {
                                    setLoading(true);
                                    await requestResearcherResponse();
                                    setLoading(false)


                                  }}} onChange={e => setQuestion(e.target.value)} />
                        <InputRightElement width='4.5rem' >
                          <Flex _hover={{transform: "scale(1.03)"}} transition="all .2s ease-in-out" _active={{transform: "scale(1.00)"}}>
                            <Button varriant='solid' size="sm" onClick={async ()=> {setLoading(true);await requestResearcherResponse(); setLoading(false)}}>
                                Ask!
                            </Button>
                          </Flex>
                        </InputRightElement>
                    </InputGroup>
                </HStack>
                <HStack w='100%' alignItems={"flex-start"}>
                    <Text fontSize='30' >Answer:</Text>
                    {loading ? <Center w="100%"><Spinner/></Center> :
                    <Textarea ref={ref} size='lg' bg="gray.700" fontSize="xl"  color="lime" isReadOnly={true} variant='solid' value={researcherResponse} placeholder="Hi I'm a NASA AI researcher. Ask me a question and I'll give you an answer."style={{
                      fontFamily: 'Courier New'
                    }}/>}
                </HStack>
            </VStack>
          </Box> 

        </Box>
    )
}