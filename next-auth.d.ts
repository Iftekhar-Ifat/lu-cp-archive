import { type USER_TYPE } from "@/types/types";
import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    user_type: USER_TYPE;
    user_name: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      user_name: string;
      user_type: USER_TYPE;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    user_name: string;
    user_type: USER_TYPE;
  }
}
