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
import { AdminContext } from "pages/admin";
import { ChangeEvent, useContext, useState } from "react";
import { Family } from "types";

const ManageFamilies = () => {
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
  const addFamilyMember = () => {};

  return (
    <Tr>
      <Td>{family.familyName ?? "-"}</Td>
      <Td>{family.familyAdmins ?? <AddFamilyAdmin />}</Td>
      <Td>
        {family.familyMembers ?? (
          <Button fontWeight="normal" onClick={() => addFamilyMember()}>
            Lägg till familjemedlem
          </Button>
        )}
      </Td>
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

const AddFamilyAdmin = () => {
  const addFamilyAdmin = (familyName: string, userEmail: string) => {};

  return (
    <>
      <Button
        fontWeight="normal"
        onClick={() => addFamilyAdmin(family.familyName, "")}
      >
        Lägg till familjeadmin
      </Button>

      {/* <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default ManageFamilies;
