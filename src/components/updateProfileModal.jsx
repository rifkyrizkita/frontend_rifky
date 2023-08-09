import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
  } from "@chakra-ui/react";
  import { UpdateProfile } from "./updateProfile";
  
  export const UpdateProfileModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
      <>
        <Box onClick={onOpen} cursor="pointer" >
          Update Profile
        </Box>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateProfile />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  