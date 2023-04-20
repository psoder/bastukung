import { Flex, Heading, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

import { AdminContext } from "@/pages/admin";
import { useContext } from "react";
import { CreateFamily } from "./create-family";
import { FamilyRow } from "./family-row";

export const ManageFamilies = () => {
    const { families } = useContext(AdminContext);

    return (
        <Flex flexDir="column" gap="10">
            <CreateFamily />

            <Flex flexDir="column" gap="3">
                <Heading size="md" fontWeight="semibold">
                    Familjer
                </Heading>

                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Namn</Th>
                                <Th>Familjeadmins</Th>
                                <Th>Familjemedlemmar</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {families.map((family) => (
                                <FamilyRow key={family.familyId} family={family} />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </Flex>
    );
};
