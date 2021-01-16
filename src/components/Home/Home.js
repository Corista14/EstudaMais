import React from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  Img,
} from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import "firebase/firestore";
import Card from "../Card/Card";
import studyingHome from "../../images/studying-home.svg";
import shareHome from "../../images/share-home.svg";
import enjoyHome from "../../images/enjoy-home.svg";
import registerHome from "../../images/register-home.svg";
import "./Home.css";
import { Link } from 'react-router-dom'

function Home() {

  return (
    <div>
      <Navbar />
      <section className="home-section">
        <Text fontSize={32} fontWeight="bold" textAlign="center" mt={12}>
          Welcome!
        </Text>

        <Flex
          wrap="wrap"
          justifyContent="space-around"
          alignItems="center"
          className="home-cards"
          mt={6}
        >
          <Card image={studyingHome} title="Study" bgColor="white" />
          <Card image={shareHome} title="Share" bgColor="white" />
          <Card image={enjoyHome} title="Enjoy" bgColor="white" />
        </Flex>
        <Box mt={20} className="rule-home">
          <Text textAlign="center">
            Allways remember to respect the website rules.
          </Text>
          <Box textAlign="center" mt={10}>
            <Button colorScheme="blue" size="lg">
              See Rules
            </Button>
          </Box>
        </Box>
      </section>

      <section className="signup-section">
        <Flex
          wrap="wrap"
          p={120}
          justifyContent="space-around"
          alignItems="center"
          className="signup-container"
          flexDirection="column"
        >
          <Text
            color="white"
            className="signup-title1-section"
            textAlign="center"
            fontSize={32}
          >
            Need an account?
          </Text>
          <Flex
            justifyContent="center"
            wrap="wrap"
            mt={20}
            className="signup-container2"
            alignItems="center"
          >
            <Box className="signup-image" mr={0} mt={10}>
              <Img src={registerHome} alt="Register Home Logo" />
            </Box>
            <Box maxW={700}>
              <Text
                textAlign="center"
                wordBreak="break-word"
                className="signup-title2-section"
                fontSize={32}
                color="whitesmoke"
              >
                In order to share resources you need to own an account.
              </Text>
              <Text
                textAlign="center"
                mt={10}
                wordBreak="break-word"
                fontSize={22}
                color="whitesmoke"
              >
                What are you waiting for?
              </Text>
              <Box textAlign="center" mt={7}>
                <Button size="lg" colorScheme="blue" as={Link} to="/signup">
                  Register
                </Button>
              </Box>
            </Box>
          </Flex>
        </Flex>

      </section>
    </div>
  );
}

export default Home;
