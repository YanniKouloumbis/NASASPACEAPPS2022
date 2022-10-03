import React from 'react'
import { Box, Flex} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
export default function ImageHit({hit, key}) {
    console.log(hit)
    //when you hover over the image, the image will enlarge slightly
    let image = {link: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png", title: "NASA Logo", description: "The NASA logo", keywords: ["NASA", "Logo"]}
    if(hit.links && hit.data){
        image = {link: hit.links[0].href, title: hit.data[0].title, description: hit.data[0].description, keywords: hit.data[0].keywords, credit: hit.data[0].secondary_creator}
    }
  return (
    <Link passHref href={{pathname: `/image`, query: image}} key={key}>
      <Flex overflow="hidden" rounded="lg"  _hover={{transform: "scale(1.03)"}} transition="all .2s ease-in-out" _active={{
          transform: "scale(1.00)"
      }} ><Image src={hit.links[0].href} width={200} height={200}/> 
      </Flex>
    </Link>
    
  ) 
}
