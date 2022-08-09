import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Booking } from "types";
import BookingRow from "./components/BookingRow";

const ManageBookings = ({ bookings }: { bookings: Booking[] }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Datum</Th>
            <Th>Tid</Th>
            <Th>Familj</Th>
            <Th>Bokad av</Th>
            <Th>Kommentar</Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {bookings.sort().map((booking) => (
            <BookingRow key={booking.startTime.getTime()} booking={booking} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ManageBookings;
