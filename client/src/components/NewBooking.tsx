import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { Autocomplete, Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import '../styles/NewBooking.css'

export const NewBooking = () => {
    return (
        <Box>
            <Card id="new-booking-conatainer" raised={true}>
                <Typography variant="h4">
                    Ny Bokning
                </Typography>
                <Stack direction="row" spacing={2} sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto 1fr auto'
                }}>
                    <DatePicker minWidth={0} />
                    <TimePicker minWidth={200} />
                    <Comment minWidth={200} />
                    <Button onClick={createBooking}
                        variant="outlined">Boka</Button>
                </Stack>
            </Card>
        </Box>
    );
}

const DatePicker = (props: { minWidth: number }) => {
    const [value, setValue] = React.useState<Date | null>(
        new Date(),
    );
    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ minWidth: props.minWidth }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    inputFormat="d/MMMM/y"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Box>
    );
}

const TimePicker = (props: { minWidth: number }) => {
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
        <Box sx={{ minWidth: props.minWidth }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={times}
                renderInput={(params) => <TextField {...params}
                    label="Tid" />}
            />
        </Box>
    );
}

const Comment = (props: { minWidth: number }) => {
    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        console.log(value)
    };

    return (
        <Box sx={{ minWidth: props.minWidth }}>
            <TextField
                id="outlined-textarea"
                label="Kommentar"
                multiline
                fullWidth={true}
                onChange={handleChange}
            />
        </Box>
    );
}

const createBooking = () => {

}  