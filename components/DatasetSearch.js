import React, {useState} from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectSearchBox, connectHits, Configure } from 'react-instantsearch-dom';
import { PhoneIcon, Search2Icon, SearchIcon } from '@chakra-ui/icons'
import { FormLabel, InputRightElement, InputLeftElement, Input, InputGroup, Popover } from '@chakra-ui/react';
import { GiCampingTent } from 'react-icons/gi';
import Hit from "./DatasetHit"
import { IoPlanetOutline } from 'react-icons/io5';
const searchClient = algoliasearch('UZ7TLLH8YH', 'eae12801696b9758885d9d05ea3f34b7');
const InvisibleSearchBox = connectSearchBox(() => null);

export default function Search({zerothLink, searchInput, setSearchInput}){
  const Hits = ({hits}) => {
    // if(configure==1){
    //   hits = [recArea]
    // }
    return(hits.map(hit=><Hit zerothLink={zerothLink} hit={hit} key={hit.title}/>))
  };
  const CustomHits = connectHits(Hits);
  return(
        <InstantSearch  searchClient={searchClient} indexName="NASADatasets" searchState={searchInput} setSearchState={setSearchInput}>
            <InputGroup>
                {!searchInput.query ? <InputRightElement pointerEvents="none"><SearchIcon color="black" mt={2} h={5} w={5} /></InputRightElement>:null}
                <Input size="lg" value={searchInput.query} onChange={(e)=>{setSearchInput({query: e.target.value})}} type="search" placeholder="What would you like to search?" borderColor="black" color="black"/>
                <InputLeftElement pointerEvents="none"><IoPlanetOutline color="black" style={{marginTop:8, marginLeft:-2}} size={30}/></InputLeftElement>
            </InputGroup>
            <InvisibleSearchBox />
            {searchInput.query?<CustomHits/>:null}
            <Configure hitsPerPage={searchInput.query !== "" ? 4 : 0}/>
        </InstantSearch>
)}

//onChange={()=>}