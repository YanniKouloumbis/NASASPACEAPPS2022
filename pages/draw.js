//react functional component
import CanvasDraw from "react-canvas-draw";
import { Box, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, Input, Button } from "@chakra-ui/react";
import { useState, useRef } from "react";
import firebase from "firebase";

export default function Draw(){
    const [brushRadius, setBrushRadius] = useState(12);
    const [prompt, setPrompt] = useState("a dog");
    const [href, setHref] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png");
    const canvas = useRef(null);
    //nasa logo
    return(<Box p={10}>
        <Box borderWidth={1}>
                <CanvasDraw ref={canvas} alt="" hideGrid brushRadius={brushRadius} brushColor="black"  imgSrc={href} canvasWidth={512} canvasHeight={512} />
                <Text>Brush Size</Text>
                <Slider w="400px" aria-label='painter slider' defaultValue={12} min={4} max={30} onChange={(value)=>setBrushRadius(value)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                    </Slider>
                <Input placeholder="Prompt" value={prompt} onChange={(e)=>setPrompt(e.target.value)}/>
                {/* firebase create document in the jobs collection with all important information, href & mask */}
                
                <Button onClick={
                    ()=>{
                        console.log(canvas.current.getSaveData())
                        firebase.firestore().collection("jobs").add({
                            prompt: prompt,
                            href: href,
                            mask: canvas.current.getDataURL('png', false, "white"),
                            done: false,
                        })
                    }
                }>Generate</Button>
                </Box>
                
        </Box>)
}