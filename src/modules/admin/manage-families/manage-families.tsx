import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Family } from "types";

const ManageFamilies = ({ families }: { families: Family[] }) => {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Namn</Th>
              <Th>Familjemedlemmar</Th>
              <Th>Familjeadmins</Th>
            </Tr>
          </Thead>

          <Tbody>
            {families.map((family) => (
              <FamilyRow key={family.id} family={family} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const FamilyRow = ({ family }: { family: Family }) => {
  return (
    <Tr>
      <Td>{family.name ?? "-"}</Td>
      <Td>{family.members ?? "-"}</Td>
      <Td>{family.admins ?? "-"}</Td>
    </Tr>
  );
};
export default ManageFamilies;
