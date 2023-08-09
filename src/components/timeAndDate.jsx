import React, { useState, useEffect } from "react";
import { Box, Button, Textarea, Text, Flex, useToast } from "@chakra-ui/react";

import Axios from "axios";

export const TND = () => {
  const [time, setTime] = useState(new Date());
  const [clockIn, setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [clockedIn, setClockedIn] = useState(false);
  const [clockedOut, setClockedOut] = useState(false);
  const [attend, setAttend] = useState([]);
  const toast = useToast();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = time.toLocaleDateString(undefined, options);
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const getAttendance = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/employee/attendance",

        { headers }
      );
      console.log(response);
      setAttend(response.data.result);
      console.log(attend);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClockIn = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/employee/clockIn",
        {},
        { headers }
      );

      if (!clockedIn) {
        setClockIn(formattedTime);
        setClockedIn(true);
      }

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

  const handleClockOut = async () => {
    try {
      const response = await Axios.patch(
        "http://localhost:8000/employee/clockOut",
        {},
        { headers }
      );

      if (!clockedOut) {
        setClockOut(formattedTime);
        setClockedOut(true);
      }

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
  useEffect(() => {
    getAttendance();
  }, []);
  return (
    <Box>
      <Flex justify="center" align="center">
        <Box>
          <Box bg="white" p={4} borderRadius="lg" boxShadow="md" width="300px">
            <Flex flexDirection="column" alignItems="center" mb={4}>
              <Text fontSize="3xl" fontWeight="bold">
                {formattedTime}
              </Text>
              <Text fontSize="xl">{formattedDate}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Button
                flex="1"
                colorScheme="green"
                size="sm"
                onClick={handleClockIn}
                isDisabled={clockedIn || time.getHours() < 9}
              >
                {clockedIn ? "Clocked In" : "Clock In"}
              </Button>
              <Button
                flex="1"
                ml={2}
                colorScheme="red"
                size="sm"
                onClick={handleClockOut}
                isDisabled={clockedOut || time.getHours() < 18}
              >
                {clockedOut ? "Clocked Out" : "Clock Out"}
              </Button>
            </Flex>
            <Textarea mt={4} placeholder="Notes" size="sm" />
          </Box>
          <Box mt={4}>
            {attend.length === 0 ? (
              <Text fontSize="lg" textAlign="center">
                No attendance data available.
              </Text>
            ) : (
              attend.map((item) => (
                <Flex
                  key={item.id}
                  justify="space-between"
                  align="center"
                  py={2}
                  borderBottom="1px solid #E2E8F0"
                >
                  <Text fontSize="lg">
                    Clock In: {item.clockedIn.substring(11, 19)}
                  </Text>
                  <Text fontSize="lg" textAlign="right" flex="1">
                    {item.clockedOut
                      ? `Clock Out: ${item.clockedOut.substring(11, 19)}`
                      : ""}
                  </Text>
                  {!item.clockedOut && (
                    <Text fontSize="lg" color="gray.500">
                      Not clocked out
                    </Text>
                  )}
                </Flex>
              ))
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
