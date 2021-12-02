import { Card, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import rawData from "./bookings.json";

interface Booking {
    date: Date;
    booker: string;
    contact: string;
    comment: string | undefined;
}

let data = rawData.map(e => {
    return {
        date: new Date(e.date),
        booker: e.booker,
        contact: e.contact,
        comment: e.comment
    }
});

const compareBooking = (a: Booking, b: Booking) => {
    let n = 0;
    if (a.date < b.date) {
        n = -1;
    } else if (a.date > b.date) {
        n = 1;
    }
    return n;
}


export const BookingList = () => {
    return (
        <Card id='booking-list' raised={true}>
            <Typography variant="h4">
                Bokningar
            </Typography>
            <Stack direction="column" spacing={2}>
                {data.sort(compareBooking).map(data =>
                    <Booking
                        key={data["date"] + data["booker"]}
                        date={new Date(data["date"])}
                        booker={data["booker"]}
                        contact={data["contact"]}
                        comment={data["comment"]}
                    />)}
            </Stack>
        </Card>
    );
}

const Booking = (props: Booking) => {
    console.log(props.date)
    return (
        <Paper className='booking'>
            <Stack sx={{
                display: 'grid',
                gridTemplateColumns: '275px 200px 150px auto'
            }}>
                <Typography>10:00 - 13:00 den {toDate(props.date)}</Typography>
                <Typography>{props.booker}</Typography>
                <Typography>{props.contact}</Typography>
                <Typography>{props.comment}</Typography>
            </Stack>
        </Paper>
    );
}

const toDate = (date: Date) => {
    let months = new Map([
        [0, "Januari"],
        [1, "Februari"],
        [2, "Mars"],
        [3, "April"],
        [4, "Maj"],
        [5, "Juni"],
        [6, "Juli"],
        [7, "Augusti"],
        [8, "September"],
        [9, "Oktober"],
        [10, "November"],
        [11, "December"]
    ]);

    return date.getDate() + " " + months.get(date.getMonth());
}