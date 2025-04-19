import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      profile(profile) {
        return {
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          user_name: profile.login,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        await prisma.users.upsert({
          where: { email: user.email! },
          update: {
            name: user.name!,
            image: user.image,
            user_name: user.user_name,
            updated_at: new Date(),
          },
          create: {
            name: user.name!,
            email: user.email!,
            image: user.image,
            user_name: user.user_name!,
            user_type: "STANDARD",
          },
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.picture;
      }
      return session;
    },
  },
});
