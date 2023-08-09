import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";

export const AddEmployeePage = () => {
  const token = localStorage.getItem("token");
  const toast = useToast()
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const employeeSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (data) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/auth/addEmployee",
        data, {headers}
      );
      console.log(response);
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
      initialValues={{ email: "" }}
      validationSchema={employeeSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Box
          maxW={{ base: "90%", md: "400px" }}
          p={4}
          m="auto"
          mt={10}
          borderWidth="1px"
          borderRadius="lg"
          shadow="lg"
        >
          <Heading as="h1" size="xl" textAlign="center" mb={6}>
            Add New Employee
          </Heading>
          <Form>
            <Field name="email">
              {({ field }) => (
                <FormControl id="email" mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter employee email"
                    borderColor="blue.500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormControl>
              )}
            </Field>
            <Button
              colorScheme="blue"
              size="lg"
              type="submit"
              isFullWidth
              mt={4}
              isDisabled={!props.dirty || !props.isValid}
            >
              Add
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};
