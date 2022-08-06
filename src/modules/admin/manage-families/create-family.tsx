import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

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

export default CreateFamily;
