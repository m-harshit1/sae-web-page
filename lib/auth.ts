import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "SAEBAJA Admin Authentication",
      credentials: {
        username: { label: "Admin Username", type: "text", placeholder: "admin" },
        password: { label: "Admin Password", type: "password", placeholder: "••••••••" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const usernameTrimmed = credentials.username.trim();
        const user = await prisma.user.findUnique({
          where: { username: usernameTrimmed }
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name || "SAEINDIA Admin",
          role: user.role || "Admin",
          username: user.username
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
  },
  pages: {
    signIn: '/?tab=portal',
  },
  secret: process.env.NEXTAUTH_SECRET || "932879e1c72bda14832fb54c50148f9505d14bb38ec5efbfad34db572c3da1d6"
};
