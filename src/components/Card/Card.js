import React from "react";
import { Box, Text, Img } from "@chakra-ui/react";

function Card({ title, image, bgColor }) {
  return (
    <Box
      mt={10}
      boxSize="sm"
      maxWidth="sm"
      backgroundColor={bgColor}
      boxShadow="2xl"
      overflow="hidden"
      rounded={10}
      p={10}
      transition="0.2s ease"
      _hover={{ cursor: 'pointer', transform: 'translateY(-20px)' }}
    >
      <Box textAlign="center">
        <Text fontSize={36} color="whitesmoke" fontWeight="bold">{title}</Text>
      </Box>

      <Img src={image} mt={4} alt="Studying" />
    </Box>
  );
}

export default Card;
