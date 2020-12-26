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
      <Heading textAlign="center" mt={5}>
        {currentUser == null ? (
          <Heading>Olá, colega!</Heading>
        ) : (
          <Heading>Olá, {username}</Heading>
        )}
      </Heading>

      <Flex
        wrap="wrap"
        p={10}
        justifyContent="space-around"
        alignItems="center"
        mt={10}
      >
        <Card image={studyingHome} title="Estuda." bgColor="gray.900" />
        <Card image={shareHome} title="Partilha." bgColor="gray.800" />
        <Card image={studyingHome} title="Aproveita." bgColor="gray.700" />
      </Flex>
    </div>
  );
}

export default Home;
