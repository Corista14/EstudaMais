import React, { useEffect, useState } from "react";
import ResourceCard from "../ResourceCard/ResourceCard";
import {
  Flex,
  Text,
  Box,
  Alert,
  AlertIcon,
  Input,
  Skeleton,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Navbar from "../Navbar/Navbar";
import "firebase/firestore";
import usePerformFirebaseQuery from "../../helpers/resources/queries";

function Subject({ year, subject }) {
  const [search, setSearch] = useState("");
  const { resource, loading, latestQuery } = usePerformFirebaseQuery(year, subject);

  return (
    <>
      <Navbar />
      <Skeleton isLoaded={!loading}>
        <Text mt={10} fontSize={32} textAlign="center">
          {subject} - {year} ano
        </Text>

        <Flex alignItems="center" justifyContent="center" mt={12}>
          <Box maxW={350}>
            <Input
              borderRightRadius={0}
              placeholder="Search Resource name"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Box>
          <IconButton borderLeftRadius={0} icon={<SearchIcon />} />
        </Flex>
        <Flex alignItems="center" justifyContent="space-around" wrap="wrap">
          {resource.length === 0 ? (
            <Box mt={10}>
              <Alert
                status="warning"
                textAlign="center"
                borderRadius={5}
                size="lg"
              >
                <AlertIcon />
                Ainda sem recursos aqui.
              </Alert>
            </Box>
          ) : (
            resource
              .filter((val) => {
                if (search === "") return val;
                else if (
                  val.name.toLowerCase().includes(search.toLocaleLowerCase())
                ) {
                  return val;
                }
              })
              .map((item, index) => {
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
        {resource.length === 4 ? (
          <Box textAlign="center" mt={4}>
            <Button>Load More</Button>
          </Box>
        ) : null}
      </Skeleton>
    </>
  );
}

export default Subject;
