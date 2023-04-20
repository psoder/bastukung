import { Flex } from "@chakra-ui/react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Flex flexDir="column" minH="100vh">
            <Header />
            <Flex flex={1}>{children}</Flex>
            <Footer />
        </Flex>
    );
};
