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
        try {
          // Create user in Firebase if they don't exist
          await createUser(user.email, user.name || "")
        } catch (error) {
          console.error("Error creating user in Firebase:", error)
          // Don't block sign-in if Firebase fails
        }
      }
      return true
    },
    async session({ session }) {
      return session
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  debug: process.env.NODE_ENV === "development",
}

