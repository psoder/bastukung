import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AdminContext } from "@/pages/admin";
import { useContext } from "react";
import { User } from "@/types";

export const ManageUsers = () => {
    const { users } = useContext(AdminContext);

    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Namn</Th>
                            <Th>Epost</Th>
                            <Th>Roll</Th>
                            <Th>Familj</Th>
                            <Th>Familjeadmin</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {users.map((user) => (
                            <UserRow key={user.id} user={user} />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};

const UserRow = ({ user }: { user: User }) => {
    return (
        <Tr>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.role}</Td>
            <Td>{user.familyId ?? "-"}</Td>
            <Td>{user.familyAdmin ?? "-"}</Td>
        </Tr>
    );
};
