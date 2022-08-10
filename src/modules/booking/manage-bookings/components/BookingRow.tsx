import { DeleteIcon } from "@chakra-ui/icons";
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
  Td,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Booking } from "types";
import { deleteBooking } from "utils";

const BookingRow = ({ booking }: { booking: Booking }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDeleteBooking = async () => {
    await deleteBooking(
      booking,
      async (response) => {
        const data = await response.json();
        toast({
          title: "Bokning borttagen",
          description: `${data.message}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      async (response) => {
        const data = await response.json();
        toast({
          title: "Någonting gick fel",
          description: `${data.message}`,
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      },
      (reason) =>
        toast({
          title: "Någonting gick fel",
          description: `${reason}`,
          status: "error",
          duration: 10000,
          isClosable: true,
        })
    );
  };

  return (
    <Tr>
      <Td>{format(booking.startTime, "dd / MM / yyyy")}</Td>
      <Td>
        {format(booking.startTime, "HH':'mm")}
        {" - "}
        {format(booking.endTime, "HH':'mm")}
      </Td>
      <Td>{booking.familyId}</Td>
      <Td>{booking.bookedBy ?? "-"}</Td>
      <Td>{booking.comment ?? "-"}</Td>
      <Td>
        <IconButton
          aria-label="delete"
          size="sm"
          variant="ghost"
          onClick={onOpen}
          icon={<DeleteIcon color="red" />}
        />

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Är du säker på att du vill ta bort bokningen?</ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Avbryt
              </Button>
              <Button
                colorScheme="green"
                onClick={async () => {
                  await handleDeleteBooking();
                  onClose();
                }}
              >
                Ta bort
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Td>
    </Tr>
  );
};

export default BookingRow;
