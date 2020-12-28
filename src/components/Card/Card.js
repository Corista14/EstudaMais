import React from "react";
import { Box, Text, Img } from "@chakra-ui/react";

function Card({ title, image, bgColor, ml, mr }) {
  return (
    <Box
      mt={10}
      boxSize="sm"
      height="sm"
      boxShadow="2xl"
      overflow="hidden"
      rounded={10}
      borderWidth={1}
      ml={ml}
      mr={mr}
      p={10}
      transition="0.2s ease"
      _hover={{ cursor: 'pointer', transform: 'translateY(-20px)', boxShadow: 'dark-lg' }}
    >
      <Box textAlign="center">
        <Text fontSize={36} fontWeight="bold">{title}</Text>
      </Box>

      <Img src={image} mt={4} alt="Studying" />
    </Box>
  );
}

export default Card;
