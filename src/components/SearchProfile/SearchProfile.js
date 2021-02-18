import React, { useState } from "react";
import {
  Flex,
  Button,
  Text,
  Input,
  Img,
  Box,
  InputGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import profileImg from "../../images/profile_pic.svg";
import Navbar from "../Navbar/Navbar";
import { AtSignIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import useQueryProfiles from "../../helpers/profiles/query";

const dev = false;

function SearchProfile() {
  const [searchedProfileInput, setSearchedProfileInput] = useState("");
  const [searchedProfile, setSearchedProfile] = useState("");
  const [canSearch, setCanSearch] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const users = useQueryProfiles();

  function openModel(e) {
    e.preventDefault();
    setCanSearch(true);
    onOpen(); // Chakra-UI fucntion to open trigger the Modal.
  }

  function closeModele(e) {
    setCanSearch(false);
    onClose();
  }

  if (dev) {
    return (
      <div>
        <Navbar />
        <Flex justifyContent="center" alignItems="center">
          <Flex justifyContent="center" wrap="wrap" mt={20} alignItems="center">
            <Box className="signup-image" mr={40} mt={10}>
              <Img src={profileImg} h={400} w={400} alt="Register Home Logo" />
            </Box>
            <Flex wrap="wrap" justifyContent="center" alignItems="center">
              <InputGroup>
                <Input
                  fontSize={19}
                  flexWrap="wrap"
                  height={14}
                  onChange={(e) => {
                    setSearchedProfileInput(e.target.value);
                  }}
                  placeholder="Search a Profile"
                />
              </InputGroup>
              <Button
                onClick={openModel}
                rightIcon={<SearchIcon />}
                size="lg"
                fontSize={18}
                mt={7}
                colorScheme="blue"
              >
                Search
              </Button>
            </Flex>
          </Flex>
        </Flex>

        <Modal isOpen={isOpen} onClose={closeModele}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Profiles Found</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <List fontSize={24} spacing={2}>
                {canSearch
                  ? users.queriedUsers
                      .filter((val) => {
                        if (searchedProfileInput === "") return val;
                        else if (
                          val.username
                            .toLowerCase()
                            .includes(searchedProfileInput.toLocaleLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((user, index) => {
                        {
                          console.log(user.username);
                        }
                        return (
                          <ListItem key={index}>
                            <Button
                              as={Link}
                              to="#"
                              fontSize={20}
                              colorScheme="blue"
                              leftIcon={<AtSignIcon fontSize={22} />}
                              variant="ghost"
                            >
                              {user.username}
                            </Button>
                          </ListItem>
                        );
                      })
                  : console.log("Not Yet")}
              </List>
            </ModalBody>

            <ModalFooter>Estuda+</ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <Flex
          alignItems="center"
          justifyContent="center"
          minH="80vh"
          width="100%"
          flexDir="column"
        >
          <Text textAlign="center" fontSize={36}>
            Coming Soon.
          </Text>
        </Flex>
      </>
    );
  }
}

export default SearchProfile;
