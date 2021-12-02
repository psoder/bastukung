import { Box, Card, Paper, Stack, Typography } from "@mui/material";
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
        <Card id='booking-list' raised={true} sx={{padding: '2rem'}}>
            <Typography variant="h3" gutterBottom>
                Bokningar
            </Typography>
            <Stack direction="column" spacing={2}>
                {data.filter((e) => e.date > new Date())
                    .sort(compareBooking)
                    .map(data =>
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
        <Paper className='booking' elevation={4}>
            <Stack
                spacing={2}
                direction='row'
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '33% 25% 1fr',
                    padding: '0.5rem'
                }}>
                <Stack direction='row' spacing={4}>
                    <TimeDisplay date={props.date} />
                    <DateDisplay date={props.date} />
                </Stack>
                <Typography>{props.booker}</Typography>
                <Typography>{props.comment}</Typography>
            </Stack>
        </Paper>
    );
}

const DateDisplay = (props: { date: Date }) => {
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

    return (
        <Stack spacing={1} direction='row' sx={{
            display: 'grid',
            gridTemplateColumns: '20% auto',
            fontWeight: 'bold'
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                {props.date.getDate()}
            </Box>
            <Box>{months.get(props.date.getMonth())}</Box>
        </Stack>
    );
}

const TimeDisplay = (props: { date: Date }) => {
    let getTime = (time: number) => {
        switch (time) {
            case 24:
            case 0:
            case 1:
            case 2:
                return 0;
            case 3:
            case 4:
            case 5:
                return 3;
            case 6:
            case 7:
            case 8:
                return 6;
            case 9:
            case 10:
            case 11:
                return 9;
            case 12:
            case 13:
            case 14:
                return 12;
            case 15:
            case 16:
            case 17:
                return 15;
            case 18:
            case 19:
            case 20:
                return 18;
            case 21:
            case 22:
            case 23:
                return 21;
            default:
                return -1;
        }
    }

    let s = getTime(props.date.getHours());
    let e = s + 3;

    return (
        <Stack sx={{
            display: 'grid',
            gridTemplateColumns: '40px 20px 40px',
            justifyContent: 'right'
        }}>
            <Box sx={{ display: 'grid', justifyContent: 'right' }}>{s}:00</Box>
            <Box sx={{ display: 'grid', justifyContent: 'center' }}>-</Box>
            <Box sx={{ display: 'grid', justifyContent: 'right' }}>{e}:00</Box>
        </Stack>
    );
}