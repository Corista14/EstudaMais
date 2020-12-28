import React, { useState } from "react";
import "./SignUp.css";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import logo from "../../images/logo.svg";
import lightLogo from "../../images/light-logo.svg";
import Navbar from "../Navbar/Navbar";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const { colorMode } = useColorMode();

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("As palavras passes não correspondem");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      history.push("/");
      toast({
        title: "Conta criada",
        description: `Conta criada com sucesso.`,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <>
      <Flex
        wrap="wrap"
        width="full"
        mt={20}
        align="center"
        justifyContent="center"
      >
        <Box p={4} width={500}>
          <Box textAlign="center" alignContent="center">
            <img
              src={colorMode === "dark" ? lightLogo : logo}
              style={{ margin: "auto" }}
              alt="Logo Estuda+"
            />
          </Box>
          <Box mt={7} p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
            <Heading textAlign="center">Registar</Heading>
            {error && (
              <Alert borderRadius={10} mt={4} status="error">
                <AlertIcon /> {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <FormControl mt={6}>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={handleUsernameChange}
                  type="name"
                  required
                  placeholder="ex: AlbertoJosias123"
                />
              </FormControl>

              <FormControl mt={6}>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  required
                  placeholder="nome@exemplo.com"
                />
              </FormControl>

              <FormControl mt={6}>
                <FormLabel>Palavra-Passe</FormLabel>
                <Input
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  required
                  placeholder="Palavra-Passe..."
                />
              </FormControl>

              <FormControl mt={6}>
                <FormLabel>Confirmar Palavra-Passe</FormLabel>
                <Input
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  type="password"
                  required
                  placeholder="Confirma a tua Palavra-Passe"
                />
              </FormControl>

              <Button
                width="full"
                mt={6}
                disabled={loading}
                rightIcon={<ArrowForwardIcon />}
                type="submit"
                colorScheme="teal"
              >
                Registar
              </Button>
            </form>
            <Box textAlign="center" mt={4}>
              <Text>
                Já tens uma conta?{" "}
                <Link style={{ color: "teal" }} to="/login">
                  Entrar
                </Link>
              </Text>
              <Box mt={4}>
                <Link style={{ color: "teal" }} to="/">
                  Voltar ao Início
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default SignUp;
