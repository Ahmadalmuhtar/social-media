import { prisma } from "@/app/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await prisma.user.upsert({
        where: {
          id: parseInt(user.id as string),
        },
        create: {
          id: parseInt(user.id as string),
          username: user.name!,
          email: user?.email as string,
          firstname: user?.name as string,
          lastname: user?.name as string,
          password: user?.email as string,
        },
        update: {
          username: user.name!,
          email: user?.email as string,
        },
      });
      // console.log(user);
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
