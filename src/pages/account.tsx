import { Box, Flex } from "@chakra-ui/react";
import AccessDenied from "components/AccessDenied";
import Layout from "components/Layout";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

const Account: NextPage = () => {
  const { status } = useSession();

  if (status !== "authenticated") {
    return (
      <Layout>
        <Flex flex={1} align="center" justify="center">
          <AccessDenied />
        </Flex>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Konto</title>
        <meta name="description" content="Hantera konto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Box as="main">Konto</Box>
      </Layout>
    </>
  );
};

export default Account;
