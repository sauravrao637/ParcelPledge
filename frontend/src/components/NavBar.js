import React, { useState } from "react";
import { ChakraProvider, Box, Flex, Button } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [connectedAddress, setConnectedAddress] = useState('');

  const handleOpenMetamask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          console.log('Metamask accounts:', accounts);
          setConnectedAddress(accounts[0]);
        })
        .catch((error) => {
          console.error('Metamask account access error:', error);
        });
    } else {
      console.error('Metamask not found');
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      py={14}
      px={18}
      color="white"
      position="absolute"
      top={0}
      left={0}
      backdropFilter="blur(10px)"
      zIndex={1}
      bg="rgba(0, 0, 0, 0.5)" 
    >
      <Box>
        <Box as="span" fontSize="xl" fontWeight="bold">
          XDC
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Link to="/">
          <Button
            as="a"
            href="/"
            colorScheme="blue"
            size="lg"
            fontWeight="bold"
            px={8}
            py={4}
            ml={4}
          >
            Home
          </Button>
        </Link>

        <Link to="/create">
          <Button
            as="a"
            href="/"
            colorScheme="purple"
            size="lg"
            fontWeight="bold"
            px={8}
            py={4}
            ml={4}
          >
            Create Parcel
          </Button>
        </Link>

        <Link to="/scan">
          <Button
            as="a"
            href="/"
            colorScheme="teal"
            size="lg"
            fontWeight="bold"
            px={8}
            py={4}
            ml={4}
            alignSelf="flex-end"
          >
            Scan
          </Button>
        </Link>

        <Link to="/list">
          <Button
            as="a"
            href="/"
            colorScheme="teal"
            size="lg"
            fontWeight="bold"
            px={8}
            py={4}
            ml={4}
            alignSelf="flex-end"
          >
            List
          </Button>
        </Link>

        <Box fontSize="xl" fontWeight="bold" ml={4} cursor="default">
          {connectedAddress ? connectedAddress.slice(0, 6) + '...' + connectedAddress.slice(-4) : ''}
        </Box>

        <div onClick={handleOpenMetamask}>
          <FaWallet size={24} />
        </div>

      </Box>
    </Flex>
  );
}

export default Navbar;
