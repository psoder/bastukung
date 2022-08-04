import { Box, Flex } from "@chakra-ui/react";
import AccessDenied from "components/AccessDenied";
import Layout from "components/Layout";
import { ddbClient } from "lib/DynamoDB";
import { default as AdminPanel } from "modules/admin";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { createContext } from "react";
import { Booking, Family, User } from "types";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session?.user.role !== "ADMIN") {
    return { props: {} };
  }

  const getUsers = async () => {
    const { Items } = await ddbClient.scan({
      TableName: "Users",
      ExpressionAttributeNames: {
        "#t": "type",
        "#n": "name",
        "#r": "role",
      },
      ExpressionAttributeValues: {
        ":t": "USER",
      },
      FilterExpression: "#t = :t",
      ProjectionExpression: "image, email, #n, #r, id, familyId, familyAdmin",
    });
    return Items as User[];
  };

  const getFamilies = async () => {
    const { Items } = await ddbClient.scan({
      TableName: "Families",
    });
    return Items as Family[];
  };

  const getBookings = async () => {
    const { Items } = await ddbClient.scan({
      TableName: "Bookings",
    });
    return Items as Booking[];
  };

  return {
    props: {
      users: await getUsers(),
      families: await getFamilies(),
      bookings: await getBookings(),
    },
  };
};

export const AdminContext = createContext<{
  users: User[];
  families: Family[];
  bookings: Booking[];
}>({ users: [], families: [], bookings: [] });

const Admin: NextPage = ({ users, families, bookings }: any) => {
  const { data: session } = useSession();

  if (session?.user.role !== "ADMIN") {
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
        <title>Bastukung</title>
        <meta name="description" content="Bokningssystem för Risets bastu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AdminContext.Provider
        value={{ users: users, families: families, bookings: bookings }}
      >
        <Layout>
          <Box flex={1} display="flex" bgColor="red.100">
            <AdminPanel />
          </Box>
        </Layout>
      </AdminContext.Provider>
    </>
  );
};

export default Admin;
