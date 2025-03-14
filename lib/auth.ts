import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { createUser } from "@/lib/firebase"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        // Create user in Firebase if they don't exist
        await createUser(user.email, user.name || "")
      }
      return true
    },
    async session({ session }) {
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}

