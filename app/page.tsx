import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import HomeContent from "@/components/home-content"

// Server component for data fetching
export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return <HomeContent />
}