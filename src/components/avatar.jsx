import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Flex,
  Box,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Logout } from "./logout";
import { BasicUsage } from "./modalAvatar";
import { useSelector } from "react-redux";
import { UpdateProfileModal } from "./updateProfileModal";

export const AvatarMenu = () => {
  const data = useSelector((state) => state.employee.value);

  // Use useMediaQuery to determine screen size
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Menu>
      <MenuButton _hover={{ cursor: "pointer" }}>
        <Flex alignItems="center">
          {!isMobile && ( // Render only on desktop
            <Box mr="3">
              <Text fontWeight="bold">{data?.fullName}</Text>
              <Text fontSize="sm">{data?.email}</Text>
            </Box>
          )}
          <Avatar
            size="md"
            name={data?.fullName}
            src={`http://localhost:8000/${data?.imgProfile}`}
            // Add padding on the right for mobile
            css={isMobile ? { paddingRight: "10px" } : {}}
          />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>
          <UpdateProfileModal/>
        </MenuItem>
        <MenuItem>
          <BasicUsage />
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <Logout />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
