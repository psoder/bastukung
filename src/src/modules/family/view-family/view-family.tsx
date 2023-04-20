import { Family, User } from "@/types";
import { Box, Divider, Flex, Heading, List } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserRow } from "../components/UserRow";

export const ViewFamily = ({ family }: { family: Family }) => {
    const [members, setMembers] = useState<User[]>();

    useEffect(() => {
        fetch(`/api/families/${family.familyId}/members`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                setMembers(data.members);
            })
            .catch(console.error);
    }, [family.familyId]);

    return (
        <Flex flexDir="column" gap={5} maxW="60%">
            <Box>
                <Heading size="md">{family.familyName}</Heading>
                <Divider mb={2} mt={2} />
                {family.familyId}
            </Box>

            <Box>
                <Heading size="md">Familjeadministratörer</Heading>
                <Divider mb={2} mt={2} />
                <List>
                    {members
                        ?.filter((user) => user.familyAdmin)
                        .map((user) => (
                            <UserRow key={user.id} user={user} />
                        ))}
                </List>
            </Box>

            <Box>
                <Heading size="md">Familjemedlemmar</Heading>
                <Divider mb={2} mt={2} />
                {members
                    ?.filter((user) => !user.familyAdmin)
                    .map((user) => (
                        <UserRow key={user.id} user={user} />
                    ))}
            </Box>
        </Flex>
    );
};
