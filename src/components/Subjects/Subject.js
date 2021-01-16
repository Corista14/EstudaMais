import React, { useEffect, useState } from "react";
import ResourceCard from "../ResourceCard/ResourceCard";
import { Flex, Text, Box, Alert, AlertIcon } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import "firebase/firestore";
import firebase from "firebase/app";

function Subject({ year, subject }) {
  const db = firebase.firestore();
  const [resourceYear, setResourceYear] = useState([]);

  useEffect(() => {
    const preformQuery1 = async () => {
      const query = await db
        .collection("resource")
        .where("year", "==", year)
        .where("subject", "==", subject)
        .get();
      for (const year of query.docs) {
        const data = year.data();
        setResourceYear((prevState) => prevState.concat(data));
      }
    };
    preformQuery1();

  }, []);

  return (
    <div>
      <Navbar />
      <Text mt={10} fontSize={36} textAlign="center">
        {subject} - {year} ano
      </Text>
      <Flex alignItems="center" justifyContent="space-around" wrap="wrap">
        {resourceYear.length === 0 ? (
          <Box mt={10}>
            <Alert status="warning" textAlign="center" borderRadius={5} size="lg">
              <AlertIcon />
              Ainda sem recursos aqui.
            </Alert>
          </Box>
        ) : (
          resourceYear.map((item, index) => {
            return (
              <Box key={index}>
                <ResourceCard
                  author={item.author}
                  resourceName={item.name}
                  resourceURL={item.url}
                />
              </Box>
            );
          })
        )}
      </Flex>
    </div>
  );
}

export default Subject;