
import { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { FiUploadCloud } from "react-icons/fi";
import { useEffect } from "react";

export const ChangeProfilePicture = () => {
  const [file, setFile] = useState(null);
  

  const toast = useToast();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const changeAva = Yup.object().shape({
    imgProfile: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (value) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await Axios.post(
        "http://localhost:8000/auth/profilePicture",
        formData,
        { headers }
      );
      console.log(response);
      window.location.reload()
      toast({
        title: "Profile Picture Changed",
        description: "Your profile picture has been successfully changed.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while changing the profile picture.",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };
  
  return (
    <Formik
      initialValues={{
        imgProfile: "",
      }}
      validationSchema={changeAva}
      onSubmit={(value, actions) => {
        handleSubmit(value);
      }}
    >
      {(props) => {
        return (
          <Form>
            <Field name="imgProfile">
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="imgProfile">Choose an image</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setFile(e.target.files[0]);
                    }}
                    type="file"
                    id="imgProfile"
                  />
                </FormControl>
              )}
            </Field>
            <ErrorMessage
              style={{ color: "red" }}
              name="imgProfile"
              component="div"
            />
            <Button
              isDisabled={!props.dirty}
              type="submit"
              mt={"10px"}
              leftIcon={<FiUploadCloud />}
              colorScheme="blue"
              size="md" 
            />
          </Form>
        );
      }}
    </Formik>
  );
};
