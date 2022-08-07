import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Role } from "types";
// import FacebookProvider from "next-auth/providers/facebook";
// import GithubProvider from "next-auth/providers/github";
// import EmailProvider from "next-auth/providers/email"

const adapterConfig = (): DynamoDBClientConfig => {
  let config: DynamoDBClientConfig = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.DB_ACCESS_KEY!,
      secretAccessKey: process.env.DB_ACCESS_SECRET!,
    },
  };

  if (process.env.NODE_ENV !== "production") {
    config = { ...config, endpoint: "http://local-dynamodb:8000" };
  }

  return config;
};

const client = DynamoDBDocument.from(new DynamoDB(adapterConfig()), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains
    */
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID!,
    //   clientSecret: process.env.FACEBOOK_SECRET!,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.role = (user.role as Role) ?? "USER";
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: DynamoDBAdapter(client, { tableName: "Users" }),
};

export default NextAuth(authOptions);
