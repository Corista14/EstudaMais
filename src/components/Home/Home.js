import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  Heading,
  Img,
  Divider,
} from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import "firebase/firestore";
import firebase from "firebase/app";
import Card from "../Card/Card";
import studyingHome from "../../images/studying-home.svg";
import shareHome from "../../images/share-home.svg";
import enjoyHome from "../../images/enjoy-home.svg";
import registerHome from "../../images/register-home.svg";
import "./Home.css";
import { Link } from 'react-router-dom'

function Home() {
  const { currentUser } = useAuth();
  const db = firebase.firestore();
  const [username, setUsername] = useState();

  const retrieveUsername = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        return setUsername(doc.data().username);
      });
  };

  useEffect(() => {
    if (currentUser) {
      retrieveUsername();
    }
    return;
  }, []);

  return (
    <div>
      <Navbar />
      <section className="home-section">
        <Heading textAlign="center" mt={20}>
          Bem-Vindo!
        </Heading>

        <Flex
          wrap="wrap"
          justifyContent="space-around"
          alignItems="center"
          className="home-cards"
          mt={6}
        >
          <Card image={studyingHome} title="Estuda." bgColor="white" />
          <Card image={shareHome} title="Partilha." bgColor="white" />
          <Card image={enjoyHome} title="Aproveita." bgColor="white" />
        </Flex>
        <Box mt={20} className="rule-home">
          <Text textAlign="center">
            Lembra-te sempre de respeitar as regras de partilha de recursos.
          </Text>
          <Text textAlign="center">
            Só assim o site poderá continuar a funcionar.
          </Text>
          <Box textAlign="center" mt={10}>
            <Button colorScheme="blue" size="lg">
              Ver Regras
            </Button>
          </Box>
        </Box>
      </section>

      <section className="signup-section">
        <Flex
          wrap="wrap"
          p={16}
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
            Ainda não tens uma conta?
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
                Para poderes partilhar recursos tens que ter uma conta criada.
              </Text>
              <Text
                textAlign="center"
                mt={10}
                wordBreak="break-word"
                fontSize={22}
                color="whitesmoke"
              >
                Do que estás à espera?
              </Text>
              <Box textAlign="center" mt={7}>
                <Button size="lg" colorScheme="blue" as={Link} to="/signup">
                  Regista-te
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
