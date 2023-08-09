import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Select } from "@chakra-ui/react";
import Axios from "axios";

export const Salary = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [salaryData, setSalaryData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 

  const token = localStorage.getItem("token");

  useEffect(() => {
    Axios.get("http://localhost:8000/employee/allAttendance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const filteredData = response.data.result.filter((attendance) => {
          const year = new Date(attendance.clockedIn).getFullYear();
          return year === selectedYear;
        });
        const initialSalaryData = months.map((month) => ({ month, salary: 0 }));
        
        filteredData.forEach((attendance) => {
          const monthIndexIn = new Date(attendance.clockedIn).getMonth();
          const monthIndexOut = attendance.clockedOut
            ? new Date(attendance.clockedOut).getMonth()
            : null;
  
          initialSalaryData[monthIndexIn].salary += 50000;
          
          if (monthIndexOut !== null) {
            initialSalaryData[monthIndexOut].salary += 50000;
          }
        });
  
        setSalaryData(initialSalaryData);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, [selectedYear]);

  const totalSalary = salaryData.reduce(
    (total, data) => total + data.salary,
    0
  );

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight={"bold"} mb={4}>
        Yearly Salary Report
      </Text>
      <Select value={selectedYear} onChange={handleYearChange} mb={4}>
        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th fontSize="md">Month</Th>
            <Th fontSize="md">Salary (IDR)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {salaryData.map((data, index) => (
            <Tr key={index}>
              <Td fontSize="md">{data.month}</Td>
              <Td fontSize="md">{formatRupiah(data.salary)}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tbody>
          <Tr>
            <Th fontSize="md">Total</Th>
            <Th fontSize="md">{formatRupiah(totalSalary)}</Th>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};
