import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";
import aboutImg from "../../images/drawer-image.svg";
import Navbar from "../Navbar/Navbar";
import "./About.css";
import rulesImg from "../../images/rules.svg";

function About() {
  return (
    <div className="about">
      <Navbar />
      <section className="about-section">
        <Text textAlign="center" mt={12} fontSize={34}>
          About Us
        </Text>
        <Flex justifyContent="space-evenly" mt={24} wrap="wrap">
          <Img className="about-image" src={aboutImg} alt="About Logo" maxW={500} maxH={500} />
          <Box maxW={600}>
            <Text
              textAlign="center"
              wordBreak="break-word"
              fontSize={32}
              top="50%"
              className="about-title"
              left="50%"
              position="relative"
              transform="translate(-50%, -50%)"
            >
              This is the DAC project proposed by the 11ºCT3 class.
            </Text>
            
            <Text
              textAlign="center"
              wordBreak="break-word"
              fontSize={14}
              top="50%"
              mt={14}
              className="about-desc"
              left="50%"
              position="relative"
              transform="translate(-50%, -50%)"
            >
              Made with the goal of sharing resources that may help while you are studying.
            </Text>
          </Box>
        </Flex>
      </section>

      {/**RULES SECTION */}

      <section className="rules-section">
        <Box pt={14}>
          <Text
            textAlign="center"
            color="white"
            fontWeight="bold"
            fontSize={34}
          >
            Rules
          </Text>
        </Box>


        <Flex justifyContent="space-evenly" className="rules-cont" mt={24} wrap="wrap" >
          <Img className="rules-image" src={rulesImg} alt="Rules" height={500} width={500} />
          <Box
            mt={14}
            color="whitesmoke"
            borderWidth={2}
            borderColor="gray.600"
            borderRadius={7}
            p={7}
            pb={0}
            className="box-rules"
            maxW={600}
            maxH={350}
            textAlign="center"
            fontSize={24}
          >
            <Text >1. It is forbidden to post adult content;</Text>
            <Text mt={5}>
              2. The resource name should match both subject and resource file;
            </Text>
            <Text mt={5}>
              3. The resource name should be short and descriptive;
            </Text>
            <Text mt={5}>
              4. Titles with profanity are prohibited;
            </Text>
          </Box>
        </Flex>
      </section>

      {/*TEAM SECTION*/}
      <section className="team-section">
        <Box
          color="whitesmoke"
          top="50%"
          left="50%"
          position="relative"
          transform="translate(-50%, -50%)"
        >
          <Text
            textAlign="center"
            wordBreak="break-word"
            fontSize={24}
            fontWeight="bold"
          >
            Developed by
          </Text>
          <Text textAlign="center" wordBreak="break-word" fontSize={32}>
            Filipe Corista
          </Text>

          <Text
            textAlign="center"
            wordBreak="break-word"
            fontSize={24}
            fontWeight="bold"
            mt={14}
          >
            With the collaboration of
          </Text>
          <Text textAlign="center" wordBreak="break-word" fontSize={32}>
            Diana Ferreira
          </Text>

          <Text textAlign="center" wordBreak="break-word" fontSize={32}>
            Diogo Paulo
          </Text>

          <Text textAlign="center" wordBreak="break-word" fontSize={32}>
            Afonso Trigo
          </Text>
        </Box>
      </section>
    </div>
  );
}

export default About;
