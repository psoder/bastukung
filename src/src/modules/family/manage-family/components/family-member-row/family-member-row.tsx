import { UserRow } from "@/modules/family/components/UserRow";
import { Family, UserAction } from "@/types";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";
import {
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { User } from "../../types";

export const FamilyMemberRow = ({ family, member }: { family: Family; member: User }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [action, setAction] = useState<UserAction>();
    const [modalInfo, setModalInfo] = useState<{
        title: string;
        text: string;
    }>();
    const toast = useToast();

    const patchUser = async (action: UserAction) => {
        await fetch(`/api/families/${family.familyId}`, {
            method: "PATCH",
            body: JSON.stringify({
                userId: member.id,
                action: action
            })
        }).then((res) => {
            if (res.ok) {
                let title = "";
                switch (action) {
                    case "remove":
                        title = `'${member.name}' har tagits borts.`;
                        break;
                    case "promote":
                        title = `'${member.name}' har befodrats.`;
                        break;
                    case "demote":
                        title = `'${member.name}' har degraderats.`;
                        break;
                }

                toast({
                    title: title,
                    status: "success",
                    duration: 5000,
                    isClosable: true
                });
            } else {
                toast({
                    title: "Någonting gick fel.",
                    status: "error",
                    duration: 10000,
                    isClosable: true
                });
            }
        });
    };

    return (
        <UserRow
            user={member}
            buttons={
                <>
                    {member.familyAdmin ? (
                        <IconButton
                            aria-label="Gör till användare"
                            variant="solid"
                            size="xs"
                            color={"red"}
                            icon={<ArrowDownIcon />}
                            onClick={() => {
                                setAction("demote");
                                setModalInfo({
                                    title: "Gör familjeadmin till användare",
                                    text: `Är du säker på att du vill göra '${member.name}' till användare?`
                                });
                                onOpen();
                            }}
                        />
                    ) : (
                        <IconButton
                            aria-label="Gör till admin"
                            variant="solid"
                            size="xs"
                            color={"green"}
                            icon={<ArrowUpIcon />}
                            onClick={() => {
                                setAction("promote");
                                setModalInfo({
                                    title: "Gör användare till familjeadmin",
                                    text: `Är du säker på att du vill göra '${member.name}' till familjeadmin?`
                                });
                                onOpen();
                            }}
                        />
                    )}

                    <IconButton
                        aria-label="Ta bort användare"
                        variant="solid"
                        size="xs"
                        color={"red"}
                        icon={<CloseIcon />}
                        onClick={() => {
                            setAction("remove");
                            setModalInfo({
                                title: "Ta bort användare",
                                text: `Är du säker på att du vill ta bort '${member.name}' från din familj?`
                            });
                            onOpen();
                        }}
                    />

                    <Modal onClose={onClose} isOpen={isOpen} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>{modalInfo?.title}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>{modalInfo?.text}</ModalBody>
                            <ModalFooter gap={3}>
                                <Button onClick={onClose} color="red">
                                    Avbryt
                                </Button>
                                <Button
                                    onClick={async () => {
                                        action && (await patchUser(action));
                                        onClose();
                                    }}
                                    color="green"
                                >
                                    Ja
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            }
        />
    );
};
