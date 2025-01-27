import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";

export const authOptions = {
   session: {
      strategy: "jwt",
   },
   providers: [
      CredentialsProvider({
         name: "Email and Password",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            const user = await prisma.user.findUnique({
               where: { email: credentials.email },
            });
            if (!user) throw new Error("Invalid email or password");

            // Compare passwords
            const isValidPassword = await bcrypt.compare(
               credentials.password,
               user.password
            );
            if (!isValidPassword) throw new Error("Invalid email or password");

            return {
               id: user.id,
               email: user.email,
            };
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id;
            token.email = user.email;
            token.name = 'user.name';
         }
         return token;
      },

      async session({ session, token }) {
         if (token) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name || token.email.split('@')[0];
         }

         return session;
      },
   },
   secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
