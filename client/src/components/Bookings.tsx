import { Box, Stack } from '@mui/material';
import React from 'react';
import '../styles/Bookings.css'
import { BookingList } from './BookingsList';
import { NewBooking } from './NewBooking';

export const Bookings = () => {
    return (
        <Stack direction='column' spacing={3} sx={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2%'
        }}>            
            <NewBooking />
            <BookingList />
        </Stack>
    );
}

