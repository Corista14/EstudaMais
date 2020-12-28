import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Text,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import logo from "../../images/logo.svg";
import lightLogo from "../../images/light-logo.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { colorMode } = useColorMode();

  const toast = useToast();

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history.push("/");
      toast({
        title: "Login feito com sucesso",
        description: `Entraste com a tua conta associada ao email ${currentUser.email}.`,
        isClosable: true,
        status: "success",
        duration: 5000,
      });
    } catch (error) {
      setError(
        "Erro ao entrar. A palavra passe ou o email podem estar incorretos."
      );
    }

    setLoading(false);
  }
  return (
    <Flex width="full" mt={20} align="center" justifyContent="center">
      <Box p={4} width={500}>
        <Box textAlign="center" alignContent="center">
          <img
            src={colorMode === "dark" ? lightLogo : logo}
            style={{ margin: "auto" }}
            alt="Logo Estuda+"
          />
        </Box>
        <Box mt={7} p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <Heading textAlign="center">Entrar</Heading>
          {error && (
            <Alert borderRadius={10} mt={4} status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Box mt={2} textAlign="center">
              <Link style={{ color: "teal", fontSize: 14 }} to="/">
                Voltar ao Início
              </Link>
            </Box>
            <FormControl mt={4}>
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

            <Button
              width="full"
              mt={4}
              disabled={loading}
              colorScheme="teal"
              rightIcon={<ArrowForwardIcon />}
              type="submit"
            >
              Entrar
            </Button>
          </form>
          <Box textAlign="center" mt={5}>
            <Text>
              Ainda não tens um conta?{" "}
              <Link style={{ color: "teal" }} to="/signup">
                Regista-te!
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
