import { Card, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import data from "./bookings.json";


export const BookingList = () => {
    return (
        <Card id='booking-list' raised={true}>
            <Typography variant="h4">
                Bokningar
            </Typography>
            <Stack direction="column" spacing={2}>
                {data.map(data => <Booking
                    date={data.date}
                    bookedBy={data["booked by"]}
                    contact={data["contact"]}
                    comment={data["comment"]} />)}
            </Stack>
        </Card>
    );
}

const Booking = (props: { date: string, bookedBy: string, contact: string, comment?: string }) => {
    return (
        <Paper className='booking'>
            <Stack direction="row" spacing={2}>
                <Typography>{props.date}</Typography>
                <Typography>{props.bookedBy}</Typography>
                <Typography>{props.contact}</Typography>
                <Typography>{props.comment}</Typography>
            </Stack>
        </Paper>
    );
}