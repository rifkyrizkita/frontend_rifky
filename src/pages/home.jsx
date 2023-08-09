import React from "react";
import { Box, Flex, Text, useMediaQuery, Icon, Link } from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa"; 
import { Navbar } from "../components/navbar";
import { TND } from "../components/timeAndDate";
import { useSelector } from "react-redux";
export const HomePage = () => {
  const data = useSelector((state) => state.employee.value);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Box>
      
      <Navbar />
      <Flex direction="column" align="center" p={4}>
        <Text
          fontSize={isMobile ? "md" : "lg"}
          fontWeight="bold"
          color="gray.800"
          mb={2}
        >
          Welcome to ImpelCo Absence Portal
        </Text>
        {data?.fullName && (
          <Text
            fontSize={isMobile ? "sm" : "md"}
            color="gray.600"
            mb={4}
            textAlign="center"
          >
            Hi {data?.fullName}, please use this portal to record your attendance.
          </Text>
        )}

        <TND />

        
        <Box maxW="600px" textAlign="center" mt={8}>
          <Icon as={FaQuestionCircle} boxSize={10} color="gray.500" mb={4} />
          <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={2}>
            Need Assistance?
          </Text>
          <Text fontSize="md" color="gray.600">
            Reach out to our{" "}
            <Link
              color="blue.500"
              href="https://www.purwadhika.com/"
              target="_blank"
              
            >
              HR team
            </Link>{" "}
            for help.
          </Text>
        </Box>

        
      </Flex>
    </Box>
  );
};
