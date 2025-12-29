"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/types"
import { Mail, UserIcon, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/sign-in")
        return
      }
      setUser(currentUser)
      setLoading(false)
    }
    fetchUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
        <Navbar />
        <div className="pt-24 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Profile Information</CardTitle>
            <CardDescription>View and manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Full Name
                </Label>
                <Input value={user.name} disabled />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input value={user.email} disabled />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Account Type
                </Label>
                <Input value={user.role.charAt(0).toUpperCase() + user.role.slice(1)} disabled />
              </div>
            </div>

            <div className="pt-6 border-t flex gap-3">
              <Button
                asChild
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
              >
                <Link href={user.role === "doctor" ? "/dashboard/doctor" : "/dashboard/patient"}>Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
