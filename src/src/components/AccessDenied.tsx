import { Button, Text, VStack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { Card } from "@/components/Card";

export const AccessDenied = () => {
    return (
        <Card shadow="xl">
            <VStack>
                <Text fontSize="3xl">Åtkomst nekad</Text>
                <Text>Du måste vara inloggad för att se denna sida.</Text>
                <Button onClick={() => signIn()}>Logga in</Button>
            </VStack>
        </Card>
    );
};
