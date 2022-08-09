import { Booking } from "types/types";
import mockBookings from "./mock-bookings.json";

export const bookings: Booking[] = mockBookings.map((booking) => {
  return {
    ...booking,
    start: new Date(booking.start),
    end: new Date(booking.end),
  };
});
