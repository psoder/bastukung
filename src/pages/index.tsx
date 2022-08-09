import { Flex } from "@chakra-ui/react";
import Card from "components/Card";
import Layout from "components/Layout";
import BookingList from "modules/booking/bookings-list";
import type { NextPage } from "next";
import Head from "next/head";
import { bookings } from "utils/mock";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bastukung</title>
        <meta name="description" content="Bokningssystem för Risets bastu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Flex
          flex={1}
          as="main"
          bgImage="/images/background.jpg"
          bgPos="center"
          bgSize="cover"
          justify="center"
          align="center"
        ></Flex>
      </Layout>
    </>
  );
};

export default Home;
