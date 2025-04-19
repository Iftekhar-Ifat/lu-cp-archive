import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    user_name: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      user_name: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    user_name: string;
  }
}
