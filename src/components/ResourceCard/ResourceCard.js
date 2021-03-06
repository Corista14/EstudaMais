import React from "react";
import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { DownloadIcon } from '@chakra-ui/icons'

function ResourceCard({ resourceName, author, resourceURL }) {
  return (
    <Box
      borderRadius={7}
      mt={16}
      w={300}
      borderWidth={1}
      boxShadow="2xl"
      padding={5}
      mb={10}
      mr={12}
      ml={12}
    >
      <Text color="blue.500" fontSize={26} fontWeight="bold" textAlign="center">
        {author}
      </Text>
      <Text mt={7} fontSize={20} textAlign="center">
        {resourceName}
      </Text>
      <Box textAlign="center" mt={7}>
        <Button
          as="a"
          download
          target="blank"
          rel="noopener noreferrer"
          href={resourceURL}
          colorScheme="blue"
          fontSize="20px"
          variant="ghost"
          rightIcon={<DownloadIcon fontSize="20px"/>}
        >
          Download
        </Button>
      </Box>
    </Box>
  );
}

export default ResourceCard;
