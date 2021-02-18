import React, { useState, useRef } from "react";
import {
  Flex,
  Box,
  Link,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  Divider,
  Img,
  useColorMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import logo from "../../images/light-logo.svg";
import drawerImage from "../../images/drawer-image.svg";
import { Link as ChakraLink, useHistory } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import "./Navbar.css";
import { MiddleNavbarItems, RigthNavbarItems } from "./NavbarItems";
import { useAuth } from "../../contexts/AuthContext";

function Navbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { currentUser, logout } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onDialogClose = () => setIsDialogOpen(false);
  const toast = useToast();
  const cancelRef = useRef();

  const history = useHistory();

  async function loggoutUser() {
    try {
      await logout();
      history.push("/");
      toast({
        title: "Logout Succeed",
        description: "You succecefully logged out from your account.",
        isClosable: true,
        duration: 7000,
        status: "success",
      });
    } catch {
      console.log("Failed to logout.");
      toast({
        title: "Error",
        description: "We couldn´t complete the logout. Try again later.",
        isClosable: true,
        duration: 7000,
        status: "error",
      });
    }
  }

  function onClickLogout() {
    setIsDialogOpen(true);
  }

  async function handleConfirmDialogClick() {
    loggoutUser();
    onDialogClose();
  }

  function handleCancelDialogClick() {
    onDialogClose();
  }

  return (
    <>
      <Box boxShadow="2xl">
        <Flex
          boxShadow="lg"
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          className="navbar"
          padding="1.5rem"
          bg="gray.800"
          color="white"
          {...props}
        >
          <Flex>
            <img src={logo} alt="Logo Navbar" width={200} height={200} />
            <IconButton
              mt={5}
              onClick={toggleColorMode}
              size="sm"
              variant="ghost"
              _hover={{ backgroundColor: "transparent" }}
              colorScheme="blue"
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            />
          </Flex>
          <Flex className={isOpen ? "nav-menu active" : "nav-menu"}>
            {MiddleNavbarItems.map((item, index) => {
              return (
                <Flex key={index}>
                  <Menu>
                    <MenuButton
                      className={item.cName}
                      to={item.url}
                      fontSize={22}
                    >
                      {item.title} <ChevronDownIcon />
                    </MenuButton>
                    <MenuList
                      color={colorMode === "dark" ? "whitesmoke" : "black"}
                    >
                      <ChakraLink to="/mat11">
                        <MenuItem>{item.as1}</MenuItem> {/*  Mat  */}
                      </ChakraLink>

                      <ChakraLink to="/fq11">
                        <MenuItem>{item.as2}</MenuItem> {/*  FQ  */}
                      </ChakraLink>

                      <ChakraLink to="/bg11">
                        <MenuItem>{item.as3}</MenuItem> {/*  BG  */}
                      </ChakraLink>

                      <ChakraLink to="/pt11">
                        <MenuItem>{item.as4}</MenuItem> {/*  PT  */}
                      </ChakraLink>

                      <ChakraLink to="/filosofia11">
                        <MenuItem>{item.as5}</MenuItem> {/*  PT  */}
                      </ChakraLink>

                      <ChakraLink to="/ef">
                        <MenuItem>{item.as6}</MenuItem>
                      </ChakraLink>
                    </MenuList>
                  </Menu>
                </Flex>
              );
            })}
          </Flex>

          <Flex className="nav-menu">
            <Box>
              <Link as={ChakraLink} to="/" color="gray.300" fontSize={22}>
                Home
              </Link>
            </Box>

            <Box ml={7}>
              <Link as={ChakraLink} to="/about" color="gray.300" fontSize={22}>
                About
              </Link>
            </Box>

            <Box ml={7}>
              <Link
                as={ChakraLink}
                to="/profile"
                color="gray.300"
                fontSize={22}
              >
                Profile
              </Link>
            </Box>
            {currentUser ? (
              <Box textAlign="center" mt={0.2} ml={6}>
                <Button
                  onClick={onClickLogout}
                  variant="outline"
                  size="sm"
                  colorScheme={colorMode === "light" ? "black" : "red"}
                >
                  Logout
                </Button>
              </Box>
            ) : null}
          </Flex>

          <IconButton
            variant="ghost"
            onClick={onOpen}
            colorScheme="transparent"
            color="white"
            className="menu-navbar"
          >
            <HamburgerIcon fontSize={24} />
          </IconButton>
          <Drawer
            placement="left"
            size="full"
            onClose={onClose}
            isOpen={isOpen}
          >
            <DrawerOverlay>
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                  <Flex justifyContent="space-between">
                    {currentUser ? (
                      <Button
                        mt={1}
                        onClick={onClickLogout}
                        variant="outline"
                        colorScheme="black"
                        size="sm"
                      >
                        Logout
                      </Button>
                    ) : null}
                    <IconButton
                      variant="ghost"
                      onClick={onClose}
                      icon={<CloseIcon />}
                    />
                  </Flex>
                </DrawerHeader>
                <DrawerBody>
                  {RigthNavbarItems.map((item, index) => {
                    return (
                      <Flex
                        key={index}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Link
                          as={ChakraLink}
                          className={item.cName}
                          to={item.url}
                          fontSize={32}
                        >
                          {item.title}
                        </Link>
                      </Flex>
                    );
                  })}
                  <Divider mt={2} />
                  <Flex mt={4} alignItems="center" justifyContent="center">
                    {MiddleNavbarItems.map((item, index) => {
                      return (
                        <Flex key={index}>
                          <Menu>
                            <MenuButton
                              className={item.cName}
                              to={item.url}
                              fontSize={32}
                            >
                              {item.title} <ChevronDownIcon />
                            </MenuButton>
                            <MenuList>
                              <ChakraLink to="/mat11">
                                <MenuItem>{item.as1}</MenuItem>
                              </ChakraLink>

                              <ChakraLink to="/fq11">
                                <MenuItem>{item.as2}</MenuItem>
                              </ChakraLink>

                              <ChakraLink to="/bg11">
                                <MenuItem>{item.as3}</MenuItem>
                              </ChakraLink>

                              <ChakraLink to="/pt11">
                                <MenuItem>{item.as4}</MenuItem>
                              </ChakraLink>

                              <ChakraLink to="/filosofia11">
                                <MenuItem>{item.as5}</MenuItem>
                              </ChakraLink>

                              <ChakraLink to="/ef">
                                <MenuItem>{item.as6}</MenuItem>
                              </ChakraLink>
                            </MenuList>
                          </Menu>
                        </Flex>
                      );
                    })}
                  </Flex>
                  <Img mt={20} src={drawerImage} alt="Studying" />
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Flex>
      </Box>

      {/**LOGOUT DIALOG */}

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure that you want to logout?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={handleConfirmDialogClick}>
                Logout
              </Button>
              <Button
                ref={cancelRef}
                colorScheme="blue"
                onClick={handleCancelDialogClick}
                ml={3}
              >
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default Navbar;
