import { useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";

export const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  };

  return (
    <Text color="red" cursor="pointer" onClick={logout}>
      Log out
    </Text>
  );
};