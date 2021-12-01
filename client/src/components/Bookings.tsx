import React from 'react';
import '../styles/Bookings.css'
import { BookingList } from './BookingsList';
import { NewBooking } from './NewBooking';

export const Bookings = () => {
    return (
        <div id='bookings-container'>
            <NewBooking />
            <BookingList />
        </div>
    );
}

