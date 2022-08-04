import NextAuth, { DefaultSession } from "next-auth";
import { Role } from "types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id. */
      id?: string;
      role?: Role;
      familyId?: string;
      familyAdmin: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: Role;
    familyId?: string;
    familyAdmin: boolean;
  }
}
