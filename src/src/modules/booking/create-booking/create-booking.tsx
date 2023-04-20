import {
    Button,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    Select,
    useToast
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const CreateBooking = () => {
    const [booking, setBooking] = useState<{
        date?: string;
        time?: number;
        comment?: string;
    }>();
    const { data, status } = useSession();
    const toast = useToast();

    const times = new Map<string, number>([
        ["01:00 - 04:00", +1],
        ["04:00 - 07:00", +4],
        ["07:00 - 10:00", +7],
        ["10:00 - 13:00", 10],
        ["13:00 - 16:00", 13],
        ["16:00 - 19:00", 16],
        ["19:00 - 22:00", 19],
        ["22:00 - 01:00", 22]
    ]);

    const handleSubmit = async () => {
        if (!booking?.date || !booking.time) {
            return;
        }

        const onSuccess = async (response: Response) => {
            const data = await response.json();
            toast({
                title: "Bokning gjort.",
                description: `${data?.message}`,
                status: "success",
                duration: 5000,
                isClosable: true
            });
        };

        const onFailure = async (response: Response) => {
            const data = await response.json();
            toast({
                title: "Någonting gick fel.",
                description: `${data?.message}`,
                status: "error",
                duration: 10000,
                isClosable: true
            });
        };

        const onError = async (reason: any) => {
            toast({
                title: "Någonting gick fel.",
                description: `${reason}`,
                status: "error",
                duration: 10000,
                isClosable: true
            });
        };

        const start = new Date(booking.date).setHours(booking.time);
        const end = new Date(booking.date).setHours(booking.time + 3);

        console.log("start", new Date(start), start);
        console.log("end", new Date(end), end);

        await fetch("/api/bookings", {
            method: "POST",
            body: JSON.stringify({
                startTime: start,
                endTime: end,
                comment: booking.comment
            })
        })
            .then((res) => {
                if (res.ok) {
                    onSuccess(res);
                } else {
                    onFailure(res);
                }
            })
            .catch((reason) => {
                onError(reason);
            });
    };

    return (
        <Grid
            gridTemplateAreas={`
        "title title"
        "date time"
        "comment submit"
    `}
            gap={5}
        >
            <GridItem area="title">
                <Heading size="md">Boka</Heading>
                <Divider mt={2} />
            </GridItem>

            <GridItem area="date">
                <FormControl>
                    <FormLabel>Datum</FormLabel>
                    <Input
                        type="date"
                        onChange={(e) => {
                            setBooking({ ...booking, date: e.target.value });
                        }}
                    />
                </FormControl>
            </GridItem>

            <GridItem area="time">
                <FormControl>
                    <FormLabel>Tid</FormLabel>
                    <Select
                        onChange={(e) => {
                            setBooking({ ...booking, time: times.get(e.target.value) });
                        }}
                        placeholder="Välj tid"
                    >
                        {Array.from(times.keys()).map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </GridItem>

            <GridItem area="comment">
                <FormControl>
                    <FormLabel>Komentar</FormLabel>
                    <Input
                        type="text"
                        value={booking?.comment ?? ""}
                        onChange={(e) => setBooking({ ...booking, comment: e.target.value })}
                    />
                </FormControl>
            </GridItem>

            <GridItem area="submit" display="flex" alignItems="end">
                <Button w="100%" onClick={handleSubmit} isDisabled={status !== "authenticated"}>
                    Boka
                </Button>
            </GridItem>
        </Grid>
    );
};
