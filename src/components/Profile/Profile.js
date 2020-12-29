import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/firestore";
import Navbar from "../Navbar/Navbar";
import { Flex, Box, Text, Badge, Progress } from "@chakra-ui/react";


function Profile() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const db = firebase.firestore();
  const creationDate = new Date(currentUser.metadata.creationTime).toLocaleDateString('en-GB')
  
  const retrieveUsername = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        return setUsername(doc.data().username);
      });
  };

  useEffect(() => {
    retrieveUsername();
  }, []);

  return (
    <div>
      <Navbar />
      <Flex justifyContent="center" wrap="wrap" alignItems="center">
        <Box mt={10}>
          <Text fontSize={36}>
            Olá, {username}
            <Badge fontSize="1rem" ml={4} colorScheme="teal">
              Nível 3
            </Badge>
          </Text>
          <Progress
            size="lg"
            value={80}
            borderRadius={7}
            colorScheme="teal"
            min={0}
            mt={3}
            max={100}
          />
          <Flex mt={2} justifyContent="space-between">
            <Text>Nível 3</Text>
            <Text>Nível 4</Text>
          </Flex>
        </Box>
      </Flex>

      <Flex mb={10} wrap="wrap" justifyContent="space-around" mt={100}>
        <Box textAlign="center" mt={10}>
          <Text fontSize="2rem">Recursos Partilhados</Text>
          <Text fontSize="3rem" color="teal.400">
            23
          </Text>
        </Box>
        <Box textAlign="center" mt={10}>
          <Text fontSize="2rem">Data de criação</Text>
          <Text fontSize="3rem" color="purple.400">
            {creationDate}
          </Text>
        </Box>
      </Flex>
    </div>
  );
}

export default Profile;
