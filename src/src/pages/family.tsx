import { Box, Flex } from "@chakra-ui/react";
import AccessDenied from "components/AccessDenied";
import Layout from "components/Layout";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

const Family: NextPage = () => {
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
        <title>Familj</title>
        <meta name="description" content="Hantera familj" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Box as="main">Familj</Box>
      </Layout>
    </>
  );
};

export default Family;
