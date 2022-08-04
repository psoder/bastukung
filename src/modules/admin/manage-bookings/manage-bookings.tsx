import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Booking } from "types";
import { format } from "utils/date";

const ManageBookings = ({ bookings }: { bookings: Booking[] }) => {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Familj</Th>
              <Th>Start</Th>
              <Th>Slut</Th>
              <Th>Bokad av</Th>
              <Th>Kommentar</Th>
            </Tr>
          </Thead>

          <Tbody>
            {bookings.map((booking) => (
              <BookingRow key={booking.start.getTime()} booking={booking} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const BookingRow = ({ booking }: { booking: Booking }) => {
  return (
    <Tr>
      <Td>{booking.familyId}</Td>
      <Td>{format(booking.start, "hh':'mm dd-MM-yy")}</Td>
      <Td>{format(booking.end, "hh':'mm dd-MM-yy")}</Td>
      <Td>{booking.bookedBy ?? "-"}</Td>
      <Td>{booking.comment ?? "-"}</Td>
    </Tr>
  );
};

export default ManageBookings;
