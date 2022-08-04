import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { Family } from "types";

const ManageFamilies = ({ families }: { families: Family[] }) => {
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
                <Th>Familjemedlemmar</Th>
                <Th>Familjeadmins</Th>
              </Tr>
            </Thead>

            <Tbody>
              {families.map((family) => (
                <FamilyRow key={family.familyName} family={family} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};

const FamilyRow = ({ family }: { family: Family }) => {
  return (
    <Tr>
      <Td>{family.familyName ?? "-"}</Td>
      <Td>{family.familyMembers ?? "-"}</Td>
      <Td>{family.familyAdmins ?? "-"}</Td>
    </Tr>
  );
};

const CreateFamily = () => {
  const [name, setName] = useState<string>();
  const [inputError, setInputError] = useState({ error: false, message: "" });
  const toast = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setInputError({ error: false, message: "" });
  };

  const handleSubmit = async () => {
    if (inputError.error) return;

    if (!name) {
      return setInputError({
        error: true,
        message: "Familjenamnet kan inte vara tomt.",
      });
    }

    const res = await fetch("/api/families", {
      method: "POST",
      body: JSON.stringify({ name: name.trim() }),
    });
    const data = await res.json();

    if (res.status < 300) {
      toast({
        title: "Familj skapad.",
        description: `${data.message}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setInputError({ error: true, message: `${data.message}` });
    }
  };

  return (
    <Flex flexDir="column" gap="3">
      <Heading size="md" fontWeight="semibold">
        Skapa familj
      </Heading>

      <Flex gap="5">
        <FormControl isInvalid={inputError.error} onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Familjenamn"
            value={name ?? ""}
            onChange={(e) => handleChange(e)}
          />
          {inputError && (
            <FormErrorMessage>{inputError.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button onClick={handleSubmit}>Skapa</Button>
      </Flex>
    </Flex>
  );
};

export default ManageFamilies;
