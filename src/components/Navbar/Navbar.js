import React from "react";
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
  Img
} from "@chakra-ui/react";
import logo from "../../images/light-logo.svg";
import drawerImage from "../../images/drawer-image.svg";
import { Link as ChakraLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import "./Navbar.css";
import { MiddleNavbarItems, RigthNavbarItems } from "./NavbarItems";

function Navbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box boxShadow="2xl">
    <Flex
      boxShadow="lg"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      className="navbar"
      padding="1.5rem"
      bg="gray.900"
      color="white"
      {...props}
    >
      <Flex>
        <img src={logo} alt="Logo Navbar" width={200} height={200} />
      </Flex>
      <Flex className={isOpen ? "nav-menu active" : "nav-menu"}>
        {MiddleNavbarItems.map((item, index) => {
          return (
            <Flex key={index}>
              <Link
                as={ChakraLink}
                className={item.cName}
                to={item.url}
                color="gray.300"
                fontSize={22}
              >
                {item.title}
              </Link>
            </Flex>
          );
        })}
      </Flex>

      <Flex className="nav-menu">
        <Box>
          <Link as={ChakraLink} to="#home" color="gray.300" fontSize={22}>
            Início
          </Link>
        </Box>

        <Box ml={7}>
          <Link as={ChakraLink} to="#about" color="gray.300" fontSize={22}>
            Sobre
          </Link>
        </Box>
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
      <Drawer placement="left" size="full" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              <Flex justifyContent="flex-end">
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
                  <Flex key={index} alignItems="center" justifyContent="center">
                    <Link
                      as={ChakraLink}
                      className={item.cName}
                      to={item.url}
                      color="blue.700"
                      fontSize={32}
                    >
                      {item.title}
                    </Link>
                  </Flex>
                );
              })}
              <Divider mt={2}/>
              <Flex mt={4} alignItems="center" justifyContent="center">
              {MiddleNavbarItems.map((item, index) => {
                return (
                  <Flex key={index}>
                    <Link
                      as={ChakraLink}
                      className={item.cName}
                      to={item.url}
                      color="gray.900"
                      fontSize={32}
                    >
                      {item.title}
                    </Link>
                  </Flex>
                );
              })}</Flex>
              <Img mt={20} src={drawerImage} alt="Studying"/>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
    </Box>
  );
}

export default Navbar;
