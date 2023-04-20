import { ManageFamily } from "@/modules/family/manage-family";
import { AdminContext } from "@/pages/admin";
import { Family } from "@/types";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Td,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import { useContext } from "react";

export const FamilyRow = ({ family }: { family: Family }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { users } = useContext(AdminContext);

    return (
        <Tr>
            <Td>{family.familyName ?? "-"}</Td>
            <Td>
                {family.familyAdmins
                    ?.map((admin) => {
                        return users.find((user) => {
                            return user.id === admin;
                        });
                    })
                    .map((user) => `${user?.name ?? "-"} `)}
            </Td>
            <Td>
                {family.familyMembers
                    ?.map((member) => {
                        return users.find((user) => {
                            return user.id === member;
                        });
                    })
                    .map((user) => user?.name)}
            </Td>
            <Td>
                <Button fontWeight="normal" onClick={onOpen}>
                    Hantera familj
                </Button>

                <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <ModalHeader>Hantera familj</ModalHeader>

                        <ModalBody pb={6}>
                            <ManageFamily family={family} />
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onClose}>Avbryt</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Td>
        </Tr>
    );
};
