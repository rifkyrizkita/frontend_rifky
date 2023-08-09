import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Grid,
  GridItem,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast()
  const navigate = useNavigate();
  const { token } = useParams();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const registerSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .min(10, "Phone number too short")
      .max(12, "Phone number too long")
      .matches(/^\d+$/, "Phone number must contain only digits"),
    address: Yup.string().required("Address is required"),
    birthDate: Yup.date().required("Birth Date is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password too short")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol")
      .matches(/.*[0-9].*/, "Password must contain at least one number"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (data) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/auth/register",
        data,
        { headers }
      );
      console.log(response);
      navigate("/login");
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        phoneNumber: "",
        address: "",
        birthDate: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Box
          maxW={{ base: "90%", md: "600px" }}
          p={4}
          m="auto"
          mt={10}
          borderWidth="1px"
          borderRadius="lg"
          shadow="lg"
        >
          <Heading as="h1" size="xl" textAlign="center" mb={6}>
            Register
          </Heading>
          <Form>
            <Grid gap={4}>
              <GridItem>
                <Field name="fullName">
                  {({ field }) => (
                    <FormControl id="fullName" mb={4}>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your full name"
                        borderColor="blue.500"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Field name="phoneNumber">
                  {({ field }) => (
                    <FormControl id="phoneNumber" mb={4}>
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your phone number"
                        borderColor="blue.500"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Field name="address">
                  {({ field }) => (
                    <FormControl id="address" mb={4}>
                      <FormLabel>Address</FormLabel>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your address"
                        borderColor="blue.500"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Field name="birthDate">
                  {({ field }) => (
                    <FormControl id="birthDate" mb={4}>
                      <FormLabel>Birth Date</FormLabel>
                      <Input
                        {...field}
                        type="date"
                        placeholder="Enter your birth date"
                        borderColor="blue.500"
                      />
                      <ErrorMessage
                        name="birthDate"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Field name="password">
                  {({ field }) => (
                    <FormControl id="password" mb={4}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        borderColor="blue.500"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <FormControl id="confirmPassword" mb={4}>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        borderColor="blue.500"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Checkbox
                  isChecked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  name="showPassword"
                  mb={4}
                >
                  Show Password
                </Checkbox>
              </GridItem>
              <GridItem>
                <Button
                  colorScheme="blue"
                  size="lg"
                  type="submit"
                  isFullWidth
                  mt={4}
                  isDisabled={!props.dirty || !props.isValid}
                >
                  Register
                </Button>
              </GridItem>
            </Grid>
          </Form>
        </Box>
      )}
    </Formik>
  );
};
