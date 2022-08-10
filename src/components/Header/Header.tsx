import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { ReactNode, useState } from "react";

const Header = () => {
  const { data: session, status } = useSession();
  const [mobile] = useMediaQuery("(max-width: 600px)");

  const items = (
    <>
      <MenuItem text="Hem" href="/" />
      {status == "unauthenticated" ? (
        <MenuItem text="Logga in" onClick={signIn} />
      ) : (
        <>
          <MenuItem text="Logga ut" onClick={signOut} />
          <MenuItem text="Konto" href="/account" />
          <MenuItem text="Familj" href="/family" />
        </>
      )}
      {session?.user.role === "ADMIN" && <MenuItem text="Admin" href="/admin" />}
      <MenuItem
        text="GitHub"
        href="https://github.com/psoder/bastukung"
        external={true}
      />
    </>
  );

  return (
    <Box as="header" bgColor="gray.50">
      {mobile ? <Mobile content={items} /> : <Desktop content={items} />}
    </Box>
  );
};

const Mobile = ({ content }: { content: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <Flex justify="space-between" align="center">
      <MenuItem text="Bastukung" href="/" />

      <IconButton
        aria-label="Open Menu"
        size="lg"
        icon={<HamburgerIcon />}
        onClick={() => setOpen(true)}
      />

      {open && (
        <Flex
          w="100vw"
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
          bgColor="gray.50"
        >
          {content}
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => setOpen(false)}
            margin={0}
          />
        </Flex>
      )}
    </Flex>
  );
};

const Desktop = ({ content }: { content: ReactNode }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <MenuItem text="Bastukung" href="/" />
      <Flex alignItems="center">{content}</Flex>
    </Flex>
  );
};

const MenuItem = ({
  text = "",
  href = "",
  external = false,
  onClick = () => {},
}: {
  text?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
}) => {
  return (
    <NextLink href={href} passHref>
      <Button as="a" variant="ghost" onClick={() => onClick()}>
        {text}
      </Button>
    </NextLink>
  );
};

export default Header;
