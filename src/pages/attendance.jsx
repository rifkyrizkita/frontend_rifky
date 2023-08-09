import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Select,
  Button,
  Flex,
} from "@chakra-ui/react";
import Axios from "axios";
import { Navbar } from "../components/navbar";
import { Navigate } from "react-router-dom";

export const AttendanceTable = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchAttendance = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/employee/allAttendance",
        { headers }
      );
      setAttendance(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  useEffect(() => {
    const uniqueYears = [...new Set(attendance.map((record) => new Date(record.clockedIn).getFullYear()))];
    setYears(uniqueYears);
  }, [attendance]);

  useEffect(() => {
    const filteredData = attendance.filter((record) => {
      const recordYear = new Date(record.clockedIn).getFullYear();
      const recordMonth = new Date(record.clockedIn).getMonth() + 1;
      return recordYear === selectedYear && recordMonth === selectedMonth;
    });
    setFilteredAttendance(filteredData);
  }, [attendance, selectedYear, selectedMonth]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const getMonthName = (monthNumber) => {
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    return months[monthNumber - 1];
  };

  return token ? (
    <Box>
      <Navbar />
      <Box p={4} overflowX="auto">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Attendance Records
        </Text>
        <Flex mb={4}>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            mr={2}
          >
            {Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
              <option key={month} value={month}>
                {getMonthName(month)}
              </option>
            ))}
          </Select>
        </Flex>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Clock In</Th>
              <Th>Clock Out</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAttendance.map((record) => (
              <Tr key={record.id}>
                <Td>{record.clockedIn.substring(0, 10)}</Td>
                <Td>{record.clockedIn.substring(11, 19)}</Td>
                {record.clockedOut ? (
                  <Td>{record.clockedOut.substring(11, 19)}</Td>
                ) : (
                  <Td>Not Clocked out</Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  ): (<Navigate to="/login"/>);
};
