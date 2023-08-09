import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Box, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const UpdateProfile = () => {
  const data = useSelector((state) => state.employee.value);
  const navigate = useNavigate()
  const toast = useToast()
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handleSave = async (data) => {
    try {
      const response = await Axios.patch(
        "http://localhost:8000/auth/updateProfile",
        data,
        { headers }
      );
      console.log(response);
localStorage.removeItem("token")
navigate("/login")
      setIsEditing(false);
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
  const UpdateProfileSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    birthDate: Yup.date().required("Birth Date is required"),
  });

  return (
    <Box p={4}>
      <Formik
        initialValues={{
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          birthDate: data.birthDate,
        }}
        validationSchema={UpdateProfileSchema}
        onSubmit={handleSave}
      >
        <Form>
          <FormControl mb={3}>
            <FormLabel htmlFor="fullName">Full Name</FormLabel>
            <Field name="fullName">
              {({ field }) => (
                <Input {...field} id="fullName" disabled={!isEditing} />
              )}
            </Field>
            <ErrorMessage
              name="fullName"
              component="div"
              style={{ color: "red" }}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Field name="email">
              {({ field }) => (
                <Input {...field} id="email" disabled={!isEditing} />
              )}
            </Field>
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red" }}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <Field name="phoneNumber">
              {({ field }) => (
                <Input {...field} id="phoneNumber" disabled={!isEditing} />
              )}
            </Field>
            <ErrorMessage
              name="phoneNumber"
              component="div"
              style={{ color: "red" }}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Field name="address">
              {({ field }) => (
                <Input {...field} id="address" disabled={!isEditing} />
              )}
            </Field>
            <ErrorMessage
              name="address"
              component="div"
              style={{ color: "red" }}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel htmlFor="birthDate">Birth Date</FormLabel>
            <Field name="birthDate">
              {({ field }) => (
                <Input
                  type="date"
                  {...field}
                  id="birthDate"
                  disabled={!isEditing}
                />
              )}
            </Field>
            <ErrorMessage
              name="birthDate"
              component="div"
              style={{ color: "red" }}
            />
          </FormControl>
          {isEditing ? (
            <>
              <Button type="submit" colorScheme="blue" mr={2}>
                Save
              </Button>
              <Button
                type="button"
                colorScheme="red"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="button"
              colorScheme="blue"
              onClick={() => setIsEditing(true)}
              mr={2}
            >
              Edit
            </Button>
          )}
        </Form>
      </Formik>
    </Box>
  );
};
