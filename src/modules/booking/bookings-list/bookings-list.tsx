import {
  Box,
  Container,
  Divider,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
import Card from "components/Card";
import { Booking } from "types/types";
import { format } from "utils/date";

const BookingsList = ({ bookings }: { bookings: Booking[] }) => {
  const [mobile] = useMediaQuery("(max-width: 600px)");

  return (
    <Flex flexDir="column" overflowY="scroll" maxH="60vh">
      {bookings.map((booking, i) => (
        <MobileRow key={i} booking={booking} />
      ))}
    </Flex>
  );

  return (
    <Container>
      <Text fontSize="2xl">Kommande bokningar</Text>
      <Divider />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Datum</Th>
            <Th>Bokad av</Th>
            <Th>Familj</Th>
            <Th>Kommentar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookings.map((booking, i) =>
            mobile ? (
              <MobileRow key={i} booking={booking} />
            ) : (
              <DesktopRow key={i} booking={booking} />
            )
          )}
        </Tbody>
      </Table>
    </Container>
  );
};

const DesktopRow = ({ booking }: { booking: Booking }) => {
  return (
    <Tr>
      <Td>
        {format(booking.startTime, "eo MMMM")}
        <br />
        {format(booking.startTime, "HH':'mm")}
        {" - "}
        {format(booking.endTime, "HH':'mm")}
      </Td>
      <Td>{booking.bookedBy}</Td>
      <Td>{booking.familyId}</Td>
      <Td>{booking.comment ?? "-"}</Td>
    </Tr>
  );
};

const MobileRow = ({ booking }: { booking: Booking }) => {
  return (
    <Card>
      <Flex flexDir="row">
        <Box>
          {format(booking.startTime, "eo MMMM")}
          <br />
          {format(booking.startTime, "HH':'mm")}
          {" - "}
          {format(booking.endTime, "HH':'mm")}
        </Box>

        <Text>{booking.bookedBy}</Text>
        <Text>{booking.familyId}</Text>
        <Text>{booking.comment ?? "-"}</Text>
      </Flex>
    </Card>
  );
};

export default BookingsList;
