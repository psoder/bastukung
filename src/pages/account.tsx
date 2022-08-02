import {
  DescribeTableCommand,
  DynamoDBClient,
  DynamoDBClientConfig,
} from "@aws-sdk/client-dynamodb";
import { Box, Flex } from "@chakra-ui/react";
import AccessDenied from "components/AccessDenied";
import Layout from "components/Layout";
import ddbClient from "lib/DynamoDB";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { default as AccountComponent } from "modules/account";

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
        <AccountComponent />
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  // const config: DynamoDBClientConfig = {
  //   region: process.env.AWS_REGION,
  //   credentials: {
  //     accessKeyId: process.env.DB_ACCESS_KEY!,
  //     secretAccessKey: process.env.DB_ACCESS_SECRET!,
  //   },
  // };

  // let ddbc = new DynamoDBClient({
  //   region: process.env.AWS_REGION,
  //   credentials: {
  //     accessKeyId: process.env.DB_ACCESS_KEY!,
  //     secretAccessKey: process.env.DB_ACCESS_SECRET!,
  //   },
  // });

  const cmd = new DescribeTableCommand({ TableName: "Users" });
  const res = await ddbClient.send(cmd);
  console.log(res);

  return {
    props: {},
  };
}

export default Account;
