import React from "react";
import { Box, Flex, Link, Icon, Text, Avatar } from "@chakra-ui/react";
import { FaMoneyBillAlt, FaClipboardList, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AvatarMenu } from "./avatar";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const Navbar = () => {
  const data = useSelector((state) => state.employee.value);
  const navigate = useNavigate();

  return (
    <Box bg="blue.200" py={2}>
      <Flex align="center" mx={"auto"} maxW="1200px">
        <Flex
          direction="row"
          align="center"
          width="100%"
          justify="space-between"
          pl={{ base: "10px", md: "0" }} // Adjust left padding for mobile
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="gray.800"
            cursor="pointer"
            onClick={() => navigate("/")}
          >
            ImpelCo.
          </Text>
          <Flex alignItems="center">
            <Link
              display="flex"
              alignItems="center"
              p={2}
              _hover={{ textDecoration: "none" }}
              color="white"
              onClick={() => navigate("/salary")}
            >
              <Text
                mr={2}
                display={{ base: "none", md: "block" }}
                color="gray.800"
              >
                Salary
              </Text>
              <Icon as={FaMoneyBillAlt} boxSize={4} color="gray.800" />
            </Link>
            <Link
              display="flex"
              alignItems="center"
              p={2}
              _hover={{ textDecoration: "none" }}
              color="white"
              onClick={() => navigate("/attendance")}
            >
              <Text
                mr={2}
                display={{ base: "none", md: "block" }}
                color="gray.800"
              >
                Attendance
              </Text>
              <Icon as={FaClipboardList} boxSize={4} color="gray.800" />
            </Link>
            {data.isAdmin && (
              <Link
                display="flex"
                alignItems="center"
                p={2}
                _hover={{ textDecoration: "none" }}
                color="white"
                onClick={() => navigate("/employee")}
              >
                <Text
                  mr={2}
                  display={{ base: "none", md: "block" }}
                  color="gray.800"
                >
                  Employee
                </Text>
                <Icon as={FaUser} boxSize={4} color="gray.800" />
              </Link>
            )}
            <AvatarMenu />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
