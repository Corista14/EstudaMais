import React from "react";
import { Flex, Button, Text, Input, Img, Box } from "@chakra-ui/react";
import profileImg from "../../images/profile_pic.svg";
import Navbar from "../Navbar/Navbar";

function SearchProfile() {
  return (
    <div>
      <Navbar />
      <Flex justifyContent="center" alignItems="center">
        <Flex justifyContent="center" wrap="wrap" mt={20} alignItems="center">
          <Box className="signup-image" mr={40} mt={10}>
            <Img src={profileImg} h={400} w={400} alt="Register Home Logo" />
          </Box>
          <Flex wrap="wrap" justifyContent="center" alignItems="center">
            <Input fontSize={19} flexWrap="wrap" w={400} h={14} placeholder="Search a Profile" />
            <Button w={300} h={12} colorScheme="blue">
              Search
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default SearchProfile;
