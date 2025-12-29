import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DoctorDashboard } from "@/components/doctor-dashboard"

export default async function DoctorDashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  if (user.role !== "doctor") {
    redirect("/dashboard/patient")
  }

  return <DoctorDashboard user={user} />
}
