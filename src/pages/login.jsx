import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { setValue } from '../redux/employeeSlice';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (data) => {
    try {
      const response = await Axios.post(
        'http://localhost:8000/auth/login',
        data
      );
      console.log(response);
      localStorage.setItem('token', response.data.token);
      dispatch(setValue(response.data.result));
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
      password: Yup.string()
      .required("Password is required")
      .min(8, "Password too short")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol")
      .matches(/.*[0-9].*/, 'Password must contain at least one number'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
      }}
    >
      {(props) => (
        <Box
          maxW={{ base: '90%', md: '400px' }}
          p={4}
          m="auto"
          mt={10}
          borderWidth="1px"
          borderRadius="lg"
          shadow="lg"
        >
          <Heading as="h1" size="xl" textAlign="center" mb={6}>
            Login
          </Heading>
          <Form>
            <Field name="email">
              {({ field }) => (
                <FormControl id="email" mb={4}>
                  <FormLabel>
                    <Flex align="center">
                      <EmailIcon mr={2} />
                      Email
                    </Flex>
                  </FormLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    borderColor="blue.500"
                  />
                  <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <FormControl id="password" mb={4}>
                  <FormLabel>
                    <Flex align="center">
                      <LockIcon mr={2} />
                      Password
                    </Flex>
                  </FormLabel>
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    borderColor="blue.500"
                  />
                  <ErrorMessage name="password" component="div" style={{ color: "red" }} />
                </FormControl>
              )}
            </Field>
            <Checkbox
              isChecked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              name="showPassword"
              mb={4}
            >
              Show Password
            </Checkbox>
            <Button
              colorScheme="blue"
              size="lg"
              type="submit"
              isFullWidth
              mt={10} 
              isDisabled={!props.dirty || !props.isValid}
            >
              Login
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};
