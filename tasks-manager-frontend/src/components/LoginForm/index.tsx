"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  Checkbox, // Added Checkbox import
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const { login } = useAuth();

  async function onSubmit(values: LoginFormInputs) {
    login(values.username, values.password);

    // You might want to navigate to a dashboard or home page after successful login
    // navigate("/dashboard");
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        w={["full", "md"]}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to access your account ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <HStack justify="space-between" mt={4}>
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </HStack>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
              </Stack>
            </form>

            <Stack pt={6}>
              <Text align={"center"}>
                Not a user?{" "}
                <Link color={"blue.400"} onClick={() => navigate("/register")}>
                  Register-me
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
