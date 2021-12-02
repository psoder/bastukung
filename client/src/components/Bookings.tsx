import { Box } from '@mui/material';
import React from 'react';
import '../styles/Bookings.css'
import { BookingList } from './BookingsList';
import { NewBooking } from './NewBooking';

export const Bookings = () => {
    return (
        <Box sx={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
        }}>            
            <NewBooking />
            <BookingList />
        </Box>
    );
}

