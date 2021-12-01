import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { Autocomplete, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import '../styles/NewBooking.css'

export const NewBooking = () => {
    return (
        <Card id="new-booking-conatainer" raised={true}>
            <Typography variant="h4">
                Ny Bokning
            </Typography>
            <Stack direction="row" spacing={2}>
                <DatePicker />
                <TimePicker />
                <User />
                <Comment />
                <Button variant="outlined">Boka</Button>
            </Stack>
        </Card>
    );
}

const DatePicker = () => {
    const [value, setValue] = React.useState<Date | null>(
        new Date(),
    );
    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                inputFormat="d/MMMM/y"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}

const TimePicker = () => {
    const times = [
        "01:00 - 04:00",
        "04:00 - 07:00",
        "07:00 - 10:00",
        "10:00 - 13:00",
        "13:00 - 16:00",
        "16:00 - 19:00",
        "19:00 - 22:00",
        "22:00 - 01:00",
    ];

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={times}
            renderInput={(params) => <TextField {...params}
                label="Tid" />}
        />
    );
}

const Comment = () => {
    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        console.log(value)
    };

    return (
        <TextField
            id="outlined-textarea"
            label="Kommentar"
            multiline
            onChange={handleChange}
        />
    );
}

const User = () => {

    return (
        <div id="user-info">
            User name
        </div>
    );
}