import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import Dbconnect from "./utils/dbConnect";
import Userdata from "./utils/models/User";

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await Dbconnect();

        const user = await Userdata.findOne({ email: credentials?.email });
        if (!user) return null;

        // ✅ Compare passwords (supports hashed or plain for dev)
        const isValid =
          user.password === credentials.password ||
          (await bcrypt.compare(credentials.password, user.password));

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.fullname,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  secret: process.env.SECRET_KEY,
  pages: {
    signIn: "/login", // ✅ Login page, not /api/Login
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
