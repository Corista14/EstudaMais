import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import Navbar from "../Navbar/Navbar";
import {
  Flex,
  Box,
  Text,
  Badge,
  Progress,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  FormControl,
  Input,
  FormLabel,
  Select,
  Divider,
  useToast,
} from "@chakra-ui/react";
import "./Profile.css";

function Profile() {
  const [file, setFile] = useState();
  const [yearOption, setYearOption] = useState("");
  const [subjectOption, setSubjectOption] = useState("");
  const [resourceName, setResourceName] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [currentResourceCount, setCurrentResourceCount] = useState([]);
  const [dbResCount, setDbResCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [dbProgress, setDbProgress] = useState(0);
  const toast = useToast();
  const storageRef = firebase.storage().ref();
  const db = firebase.firestore();

  const creationDate = new Date(
    currentUser.metadata.creationTime
  ).toLocaleDateString("en-GB");

  const retrieveUsername = async () => {
    const us = await db.collection("users").doc(currentUser.uid).get();
    const name = us.data().username
    return setUsername(name)
  };

  const defineLevel = async () => {
    const user = await db.collection("users").doc(currentUser.uid).get();
    return setLevel(user.data().level);
  }

  const handleResourceNameChange = (e) => setResourceName(e.target.value);

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };

  const handleYearOption = (e) => {
    return setYearOption(e.target.value);
  };

  const handleSubjectOption = (e) => {
    return setSubjectOption(e.target.value);
  };

  const sendFileToStorageAndGetURL = async () => {
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);

    fileRef.getDownloadURL().then((url) => {
      db.collection("resource")
        .doc()
        .set({
          name: resourceName,
          year: yearOption,
          subject: subjectOption,
          url: url,
          author: username,
        })
        .catch((e) => console.log(e.message));
    });
  };

  /**Function to get the actual user resources count. */
  const retrieveUserResCount = async () => {
    const data = await db.collection("users").doc(currentUser.uid).get();
    return setDbResCount(data.data().userResourcesCount)
  }
  
  /**Function to query the user resources count. */
  const queryTotalResources = async () => {
    const query = await db
      .collection("resource")
      .where("author", "==", username).get();
    for (const count of query.docs) {
      const data = count.data()
      setCurrentResourceCount((prevState) => prevState.concat(data));
    }
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendFileToStorageAndGetURL();
      /**Update the user resource count. */
      await db.collection("users").doc(currentUser.uid).update({
        userResourcesCount: dbResCount + 1,
        progress: dbProgress < 100 ? dbProgress + 10 : 0,
        level: dbProgress >= 100 ? level + 1 : level
      });
      
      toast({
        title: "Resource Added",
        description: `${resourceName} was added succecefuly. Thanks for your contribution.`,
        status: "success",
        isClosable: true,
        duration: 6000,
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: `It wasn´t possible to add this resource. Try again later.`,
        status: "error",
        isClosable: true,
        duration: 6000,
      });
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (yearOption === "") setYearOption("10º");
    if (subjectOption === "") setSubjectOption("Matemática A");

    retrieveUsername();
    queryTotalResources();
    retrieveUserResCount();
    defineLevel();
    getCurrentProgress();
    // eslint-disable-next-line
  }, [username]);

  async function getCurrentProgress() {
    const progressData = await db.collection("users").doc(currentUser.uid).get();
    const progress = progressData.data().progress;
    return setDbProgress(progress)
  }



  return (
    <div>
      <Navbar />

      {/* USERNAME AND LVL DISPLAY */}
      <Flex justifyContent="center" wrap="wrap" alignItems="center">
        <Box mt={10}>
          <Text className="profile-enter" fontSize={36}>
            Hello, {username}
            <Badge fontSize="1rem" ml={4} colorScheme="teal">
              Level {level}
            </Badge>
            
          </Text>
          <Progress
            size="lg"
            value={dbProgress}
            borderRadius={7}
            colorScheme="teal"
            min={0}
            mt={3}
            max={100}
          />
          <Flex mt={2} justifyContent="space-between">
            <Text>Level {level}</Text>
            <Text>Level {level + 1}</Text>
          </Flex>
        </Box>
      </Flex>

      {/* ACCOUNT STATS */}

      <Flex mb={10} wrap="wrap" justifyContent="space-around">
        <Box textAlign="center" mt={20}>
          <Text className="title-stats" fontSize="2rem">
            Resources Shared
          </Text>
          <Text className="stats-profle" fontSize="3rem" color="teal.400">
            {dbResCount}
          </Text>
        </Box>
        <Box textAlign="center" mt={20}>
          <Text className="title-stats" fontSize="2rem">
            Criation Date
          </Text>
          <Text className="stats-profle" fontSize="3rem" color="purple.400">
            {creationDate}
          </Text>
        </Box>
      </Flex>


      {/* ADD RESOURCE SECTION */}
      <Box textAlign="center" className="add-resource-button">
        <Button onClick={onOpen} colorScheme="teal" mt={10}>
          Add Resource
        </Button>
        <Box className="modal-profile">
          <Modal size="sm" isCentered="true" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Add Resource
                <ModalCloseButton />
              </ModalHeader>
              <Divider />
              <ModalBody pb={10}>
                <form onSubmit={handleResourceSubmit}>
                  <FormControl mt={5}>
                    <FormLabel>Resource Name</FormLabel>
                    <Input
                      required
                      value={resourceName}
                      onChange={handleResourceNameChange}
                      placeholder="ex: Exercícios de Mecânica"
                    />
                  </FormControl>

                  <FormControl mt={5}>
                    <FormLabel>Select Grade</FormLabel>
                    <Select
                      value={yearOption}
                      onChange={handleYearOption}
                      required
                    >
                      <option value="10º">10º</option>
                      <option value="11º">11º</option>
                      <option value="12º">12º</option>
                    </Select>
                  </FormControl>

                  <FormControl mt={5}>
                    <FormLabel>Select the Subject</FormLabel>
                    <Select
                      required
                      value={subjectOption}
                      onChange={handleSubjectOption}
                    >
                      <option value="Matemática A">Matemática A</option>
                      <option value="Física e Química A">
                        Física e Química A
                      </option>
                      <option value="Biologia">Biologia</option>
                      <option value="Português">Português</option>
                    </Select>
                  </FormControl>

                  <FormControl mt={5}>
                    <FormLabel>Select the File</FormLabel>
                    <Input
                      display="none"
                      type="file"
                      id="contained-button-file"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Button width="full" as="span" variant="outline">
                        Select
                      </Button>
                    </label>
                  </FormControl>

                  <Box mt={10} textAlign="end">
                    <Button
                      type="submit"
                      colorScheme="green"
                      mr={5}
                      isLoading={loading ? true : false}
                      loadingText="Adding..."
                    >
                      Add
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </div>
  );
}

export default Profile;