import React from "react";
import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { DownloadIcon } from '@chakra-ui/icons'

function ResourceCard({ resourceName, author, resourceURL }) {
  return (
    <Box
      borderRadius={7}
      mt={20}
      w={350}
      borderWidth={1}
      boxShadow="2xl"
      padding={10}
      mb={10}
    >
      <Text color="blue.500" fontSize={32} fontWeight="bold" textAlign="center">
        {author}
      </Text>
      <Text mt={7} fontSize={24} textAlign="center">
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
          rightIcon={<DownloadIcon fontSize="18px"/>}
        >
          Download
        </Button>
      </Box>
    </Box>
  );
}

export default ResourceCard;
