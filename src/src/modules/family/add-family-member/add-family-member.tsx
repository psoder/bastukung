import {
    Button,
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    Select,
    useToast
} from "@chakra-ui/react";

import { AdminContext } from "@/pages/admin";
import { useContext, useState } from "react";
import { Family } from "@/types";
import { addFamilyMember } from "@/utils";

export const AddFamilyMember = ({ family }: { family: Family }) => {
    const { users } = useContext(AdminContext);
    const [user, setUser] = useState(users[0]);
    const [isAdmin, setIsAdmin] = useState(false);
    const toast = useToast();

    const handleAdd = async () => {
        const onSuccess = async (res: Response) => {
            let data = await res.json();

            if (res.ok) {
                toast({
                    title: "Familjemedlem tillagd.",
                    description: `${data.message}`,
                    status: "success",
                    duration: 5000,
                    isClosable: true
                });
            } else {
                toast({
                    title: "Någoning gick fel.",
                    status: "error",
                    description: `${data.message}`,
                    duration: 10000,
                    isClosable: true
                });
            }
        };

        const onFailure = async (reason: any) => {
            toast({
                title: "Någoning gick fel.",
                description: `${reason}`,
                status: "error",
                duration: 10000,
                isClosable: true
            });
        };

        await addFamilyMember(family, user, isAdmin, onSuccess, onFailure);
    };

    return (
        <>
            <FormControl mt={4}>
                <FormLabel>Namn</FormLabel>
                <Select
                    value={user?.email}
                    onChange={(e) => {
                        setUser(
                            users.find((user) => {
                                return user.email == e.target.value;
                            })!
                        );
                    }}
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.email}>
                            {user.name}
                        </option>
                    ))}
                </Select>
                <FormHelperText>
                    Notera att användaren måste ha ett konto för att kunna bli tillagd.
                </FormHelperText>

                <Checkbox mt={4} isChecked={isAdmin} onChange={() => setIsAdmin(!isAdmin)}>
                    Familjeadmin
                </Checkbox>
                <FormHelperText>Ska användaren ha rätt att hantera familjen.</FormHelperText>
            </FormControl>

            <Button colorScheme="blue" mr={3} onClick={handleAdd}>
                Lägg till
            </Button>
        </>
    );
};
