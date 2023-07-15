import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { TYPE_SHIPPER, TYPE_PARTNER, TYPE_OWNER, DEFAULT_USER_TYPE } from "../utils";

const Navbar = ({ myType, connectedAddress }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      py={2} 
      px={10} 
      color="white"
      position="fixed" 
      top={0}
      left={0}
      zIndex={100} 
      bg="rgba(0, 0, 0, 0.5)"
    >
      <Box>
        <Box as="span" fontSize="xl" fontWeight="bold">
          XDC ParcelPledge
        </Box>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <FaWallet size={24} />
        <Box fontSize="xl" fontWeight="bold" ml={4} cursor="default">
          {connectedAddress
            ? `${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`
            : "Connect Wallet"}
        </Box>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end">
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

        {(myType === DEFAULT_USER_TYPE || myType === TYPE_SHIPPER) && (
          <Link to="/shipper">
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
              Shipper
            </Button>
          </Link>
        )}

        {(myType === DEFAULT_USER_TYPE || myType === TYPE_PARTNER) && (
          <Link to="/partner">
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
              Partner
            </Button>
          </Link>
        )}

        {myType === DEFAULT_USER_TYPE && (
          <Link to="/myparcels">
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
              MyParcels
            </Button>
          </Link>
        )}

        {myType === TYPE_OWNER && (
          <Link to="/owner">
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
              Contract
            </Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
