import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
  Button,
  Select,
  HStack,
  Switch,
} from "@chakra-ui/react";
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Axios from "axios";
import { AddEmployeePage } from "../components/addEmployee";
import { Navbar } from "../components/navbar";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const data = useSelector((state) => state.employee.value);

  const fetchEmployees = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/employee", {
        params: {
          search,
          sort,
          page,
        },
      });
      setEmployees(response.data.result);
      setTotalPage(response.data.totalPage);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, sort, page]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleSortOrderChange = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const formatDate = (dateString) => {
    const options = {  year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return token && data.isAdmin ? (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Box p={4} overflowX="auto">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Employee List
        </Text>
        <HStack mb={2}>
          <Input
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            size="sm"
          />
        </HStack>
        <HStack mb={2}>
          <Switch
            isChecked={sort === "desc"}
            onChange={handleSortOrderChange}
            colorScheme="blue"
          />
          <Text>{sort === "asc" ? "A-Z" : "Z-A"}</Text>
        </HStack>
        <IconButton
          icon={<AddIcon />}
          colorScheme="blue"
          onClick={onOpen}
          mb={4}
          aria-label="Add Employee"
        />

        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Birth Date</Th>
              <Th>Address</Th>
              <Th>Join Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee) => (
              <Tr key={employee.id}>
                <Td>{employee.fullName}</Td>
                <Td>{employee.email}</Td>
                <Td>{employee.phoneNumber}</Td>
                <Td>{formatDate(employee.birthDate)}</Td>
                <Td>{employee.address}</Td>
                <Td>{formatDate(employee.createdAt)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Box mt={4} display="flex" justifyContent="center">
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={() => handlePageChange(page - 1)}
            isDisabled={page === 1}
            mr={2}
          />
          <Text>{`Page ${page} of ${totalPage}`}</Text>
          <IconButton
            icon={<ChevronRightIcon />}
            onClick={() => handlePageChange(page + 1)}
            isDisabled={page === totalPage}
            ml={2}
          />
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <AddEmployeePage />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  ) : (
    <Navigate to="/" />
  );
};
