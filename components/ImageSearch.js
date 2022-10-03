import React, {useState} from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectSearchBox, connectHits, Configure } from 'react-instantsearch-dom';
import { PhoneIcon, Search2Icon, SearchIcon } from '@chakra-ui/icons'
import { FormLabel, Box, HStack, InputRightElement, InputLeftElement, Input, InputGroup, Popover } from '@chakra-ui/react';
import { GiCampingTent } from 'react-icons/gi';
import Hit from "./ImageHit"
import { IoPlanetOutline } from 'react-icons/io5';
const searchClient = algoliasearch('UZ7TLLH8YH', 'eae12801696b9758885d9d05ea3f34b7');
const InvisibleSearchBox = connectSearchBox(() => null);

export default function Search({searchInput, setSearchInput, setZerothLink}){
  const [configure, setConfigure] = useState(4)
  const Hits = ({hits}) => {
    // if(configure==1){
    //   hits = [recArea]
    // }
    if(!hits || hits.length == 0){
        setZerothLink("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png")
    }
    else{
        setZerothLink(hits[0].links[0].href)
    }
    if(hits.length!==0){
        console.log(hits[0].data[0].title);
    }
    //HStack that wraps its components
    return(<HStack mb={6} display="flex" flexWrap="wrap" rounded="xl" bg="gray.50" padding={4} justifyContent="center">{hits.map(hit=><Hit hit={hit} key={hit.title}/>)}</HStack>)
  };
  const CustomHits = connectHits(Hits);
  return(
        <InstantSearch  searchClient={searchClient} indexName="NASAImages" searchState={searchInput} setSearchState={setSearchInput}>
            <InvisibleSearchBox />
            {searchInput.query?<CustomHits/>:null}
            <Configure hitsPerPage={configure}/>
        </InstantSearch>
)}

//onChange={()=>}