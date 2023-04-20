import { Box, Colors } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Shadow } from "@/types/ChakraTypes";

export const Card = ({
    children,
    padding = 30,
    shadow = "base",
    borderRadius = 5,
    bgColor = "white"
}: {
    children: ReactElement;
    bgColor?: string;
    padding?: number;
    shadow?: Shadow;
    borderRadius?: number;
}) => {
    return (
        <Box flex={1} p={padding} shadow={shadow} borderRadius={borderRadius} bgColor={bgColor}>
            {children}
        </Box>
    );
};
