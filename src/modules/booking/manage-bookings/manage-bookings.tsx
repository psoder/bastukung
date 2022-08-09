import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Booking } from "types";
import CreateBooking from "../create-booking";

const ManageBookings = ({ bookings }: { bookings: Booking[] }) => {
  return (
    <>
      <CreateBooking />

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Datum</Th>
              <Th>Tid</Th>
              <Th>Familj</Th>
              <Th>Bokad av</Th>
              <Th>Kommentar</Th>
            </Tr>
          </Thead>

          <Tbody>
            {bookings.sort().map((booking) => (
              <BookingRow key={booking.startTime.getTime()} booking={booking} />
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
      <Td>{format(booking.startTime, "dd / MM / yyyy")}</Td>
      <Td>
        {format(booking.startTime, "HH':'mm")}
        {" - "}
        {format(booking.endTime, "HH':'mm")}
      </Td>
      <Td>{booking.familyId}</Td>
      <Td>{booking.bookedBy ?? "-"}</Td>
      <Td>{booking.comment ?? "-"}</Td>
    </Tr>
  );
};

export default ManageBookings;
