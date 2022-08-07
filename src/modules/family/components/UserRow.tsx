import { Flex, ListItem, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { User } from "types";

const UserRow = ({ user, buttons }: { user: User; buttons?: ReactNode }) => {
  return (
    <Flex justify="space-between" align="center">
      <Text noOfLines={1}>{user.name}</Text>
      <Flex gap={2} align="inherit">
        <Text noOfLines={1}>{user.email}</Text>

        {buttons}
      </Flex>
    </Flex>
  );
};

export default UserRow;
