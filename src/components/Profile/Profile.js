import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/firestore";
import Navbar from "../Navbar/Navbar";
import { Flex, Box, Text } from "@chakra-ui/react";

function Profile() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const db = firebase.firestore();

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

  return( 
    <div>
      <Navbar />
      <Flex justifyContent="center" alignItems="center">
        <Box mt={10}>
          <Text fontSize={32}>
            Olá, {username}
          </Text>
        </Box>
      </Flex>
    </div>
  );
}

export default Profile;
