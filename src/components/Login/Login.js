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
  const { login, currentUser } = useAuth();
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
        title: "Login done with success",
        description: `You are succecefuly logged in with the email: ${currentUser.email}.`,
        isClosable: true,
        status: "success",
        duration: 5000,
      });
    } catch (error) {
      setError(
        "Error. The password or email might be wrong."
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
          <Heading textAlign="center">Login</Heading>
          {error && (
            <Alert borderRadius={10} mt={4} status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Box mt={2} textAlign="center">
              <Link style={{ color: "teal", fontSize: 14 }} to="/">
                Back to Home
              </Link>
            </Box>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={handleEmailChange}
                type="email"
                required
                placeholder="name@example.com"
              />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={handlePasswordChange}
                type="password"
                required
                placeholder="Password..."
              />
            </FormControl>

            <Button
              width="full"
              mt={6}
              disabled={loading}
              colorScheme="teal"
              rightIcon={<ArrowForwardIcon />}
              type="submit"
            >
              Login
            </Button>
          </form>
          <Box textAlign="center" mt={5}>
            <Text>
              Dont have an account?{" "}
              <Link style={{ color: "teal" }} to="/signup">
                Register!
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
