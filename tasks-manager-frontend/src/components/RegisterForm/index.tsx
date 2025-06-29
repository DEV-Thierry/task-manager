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
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import type { RegisterUserDTO } from "../../models/User";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserDTO>();

  const { registerUser } = useAuth();

  async function onSubmit(values: RegisterUserDTO) {
    const registered = await registerUser(values);
    if (!registered) throw new Error("Usuario nao registrado");

    navigate("/login");
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={4} mx={"auto"} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
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
              <HStack>
                <Box>
                  <FormControl isInvalid={!!errors.firstName}>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="firstName"
                      type="text"
                      {...register("firstName", {
                        required: "First Name is required",
                        minLength: {
                          value: 4,
                          message: "Minimun length should be 4",
                        },
                      })}
                    />

                    <FormErrorMessage>
                      {errors.firstName && errors.firstName.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isInvalid={!!errors.lastName}>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="lastName"
                      type="text"
                      {...register("lastName", {
                        required: "Last Name is required",
                        minLength: {
                          value: 4,
                          message: "Minimun length should be 4",
                        },
                      })}
                    />

                    <FormErrorMessage>
                      {errors.lastName && errors.lastName.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.username}>
                <FormLabel htmlFor="userName">Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  {...register("username", {
                    required: "username is required",
                    minLength: {
                      value: 4,
                      message: "Minimun length should be 4",
                    },
                  })}
                />

                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Minimun length should be 4",
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
                  Sign up
                </Button>
              </Stack>
            </form>

            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} onClick={() => navigate("/login")}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
