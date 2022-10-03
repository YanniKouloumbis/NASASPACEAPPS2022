import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import { extendTheme } from "@chakra-ui/react"
import "focus-visible/dist/focus-visible"
import { useRouter } from 'next/router';
import firebase from "../firebase/firebaseClient"
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  return (
  <ChakraProvider>
    <Component {...pageProps}/>
  </ChakraProvider>)
}

export default MyApp
