import { Flex } from "@chakra-ui/react";
import AccessDenied from "components/AccessDenied";
import Layout from "components/Layout";
import { default as AccountComponent } from "modules/account";
import { AccountContextProvider } from "modules/account/account-context";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { getBookings, getFamily, getUser } from "utils/db-utils";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const user = await getUser(session?.user.id as string);

  if (!user) {
    return { props: {} };
  }

  return {
    props: {
      user: user,
      bookings: await getBookings(),
      family: await getFamily(user?.familyId as string),
    },
  };
};

const Account: NextPage = ({ user, bookings, family }: any) => {
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

      <AccountContextProvider
        value={{ user: user, family: family, bookings: bookings }}
      >
        <Layout>
          <AccountComponent />
        </Layout>
      </AccountContextProvider>
    </>
  );
};

export default Account;
