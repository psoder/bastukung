import { User } from "@/types";
import { Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export const UserRow = ({ user, buttons }: { user: User; buttons?: ReactNode }) => {
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
