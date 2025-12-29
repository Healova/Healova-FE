import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { PatientDashboard } from "@/components/patient-dashboard"

export default async function PatientDashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  if (user.role !== "patient") {
    redirect("/dashboard/doctor")
  }

  return <PatientDashboard user={user} />
}
