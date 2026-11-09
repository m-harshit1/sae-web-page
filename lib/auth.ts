import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "SAEBAJA Member Verification",
      credentials: {
        membershipId: { label: "SAEBAJA Membership ID", type: "text", placeholder: "SAEBAJA-ADMIN" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Priority 1: SAEBAJA Membership ID validation against database
        if (credentials?.membershipId && credentials.membershipId.trim() !== "") {
          const rawId = credentials.membershipId.trim();

          // Built-in Admin ID check
          if (rawId.toUpperCase() === "SAEBAJA-ADMIN") {
            const adminMember = await prisma.member.findFirst({
              where: {
                OR: [
                  { membershipId: "SAEBAJA-ADMIN" },
                  { role: { contains: "President" } }
                ]
              }
            });

            return {
              id: adminMember?.id || "admin-root",
              name: adminMember?.name || "Harshit Kumar Mishra",
              email: adminMember?.email || "harshit.mishra@iiitk.ac.in",
              role: "Admin",
              membershipId: "SAEBAJA-ADMIN",
              department: "Executive Board"
            };
          }

          const member = await prisma.member.findFirst({
            where: {
              OR: [
                { membershipId: rawId },
                { membershipId: rawId.toUpperCase() },
                { id: rawId }
              ]
            }
          });

          if (!member) {
            return null; // Not in database -> Reject access
          }

          let computedRole = "Member";
          const roleLower = member.role.toLowerCase();
          const deptLower = member.department.toLowerCase();
          if (roleLower.includes("president") || roleLower.includes("admin") || deptLower.includes("executive")) {
            computedRole = "Admin";
          } else if (roleLower.includes("lead") || roleLower.includes("head") || roleLower.includes("officer")) {
            computedRole = "Core Team";
          }

          return {
            id: member.id,
            name: member.name,
            email: member.email,
            role: computedRole,
            membershipId: member.membershipId,
            department: member.department
          };
        }

        // Priority 2: Admin user credential validation
        if (credentials?.username && credentials?.password) {
          const user = await prisma.user.findUnique({
            where: { username: credentials.username }
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
            name: user.name,
            role: user.role,
            membershipId: "SAEBAJA-ADMIN",
            department: "Executive Board"
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.membershipId = user.membershipId;
        token.department = user.department;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.membershipId = token.membershipId;
        session.user.department = token.department;
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
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_sae_12345"
};
