import { Box } from "@chakra-ui/react";
import Layout from "components/Layout";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bastukung</title>
        <meta name="description" content="Bokningssystem för Risets bastu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Box
          flex={1}
          as="main"
          bgImage="/images/background.jpg"
          bgPos="center"
          bgSize="cover"
        >
          Home content
        </Box>
      </Layout>
    </>
  );
};

export default Home;
