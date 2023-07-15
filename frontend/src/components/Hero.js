import React from 'react';
import { ChakraProvider, Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import backgroundImg from './dark.jpg';
import heroImg from './parcel.jpg';
import { Link } from 'react-router-dom';
import Footer from './Footer.js';
const Hero = () => {
  return (
    <>
      <Box
        bgImage={`url(${backgroundImg})`}
        bgSize="cover"
        bgPosition="center"
        height="93vh"
        position="relative"
      >
        <Flex
          height="100%"
          alignItems="center"
          justifyContent="space-around"
          px={8}
          py={16}
        >
          <Box maxW="md" color="white" mr={8}>
            <Heading as="h1" size="4xl" mb={6} fontFamily="Arial">
              <Typewriter
                options={{
                  strings: ['XDC Blockchain Shipment Tracking & Delay Insurance'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </Heading>
            <Text fontSize="2xl" mb={8} fontFamily="Arial">
              Our platform combines smart contracts, to revolutionize logistics and provides Effortless Shipment Tracking & Instant Insurance Claim Payouts.</Text>
            <Link to="/shipper">
              <Button
                colorScheme="teal"
                mr={4}
                fontSize="xl"
                bgGradient="linear(to-r, teal.500, teal.400)"
                _hover={{ bgGradient: 'linear(to-r, teal.600, teal.500)' }}
              >
                Create
              </Button>
            </Link>


            <Link to="/partner">
              <Button
                colorScheme="teal"
                variant="outline"
                fontSize="xl"
                border="2px"
                borderColor="teal.400"
                _hover={{ bg: 'teal.100' }}
              >
                Scan
              </Button>
            </Link>

          </Box>
          <Box position="relative" maxW="xl">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Box
                position="relative"
                display="inline-block"
                overflow="hidden"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
                filter="blur(1px)"
                width="100%"
                height="100%"
              >
                <Image
                  src={heroImg}
                  alt="Hero Image"
                  borderRadius="125px"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Box>
            </motion.div>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <Hero />
    </ChakraProvider>
  );
};

export default App;
