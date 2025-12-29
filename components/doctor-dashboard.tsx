"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockConsultations, mockPatients, type User } from "@/lib/mock-data";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { LogOut, FileText, Clock, CheckCircle } from "lucide-react";

interface DoctorDashboardProps {
  user: User;
}

export function DoctorDashboard({ user }: DoctorDashboardProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "in-review":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "in-review":
        return <FileText className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                HEALOVA
              </h1>
              <p className="text-sm text-muted-foreground">Doctor Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {user.role}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Patients</CardDescription>
              <CardTitle className="text-3xl">{mockPatients.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending Reviews</CardDescription>
              <CardTitle className="text-3xl">
                {
                  mockConsultations.filter((c) => c.status === "in-review")
                    .length
                }
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-3xl">
                {
                  mockConsultations.filter((c) => c.status === "completed")
                    .length
                }
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Consultations List */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Consultations</CardTitle>
            <CardDescription>
              Review and manage patient consultations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockConsultations.map((consultation) => {
                const patient = mockPatients.find(
                  (p) => p.id === consultation.patientId
                );
                const symptoms = [];
                if (consultation.symptoms.irregularPeriods)
                  symptoms.push("Irregular periods");
                if (consultation.symptoms.acne) symptoms.push("Acne");
                if (consultation.symptoms.weightGain)
                  symptoms.push("Weight gain");
                if (consultation.symptoms.hairLoss) symptoms.push("Hair loss");

                return (
                  <div
                    key={consultation.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {patient?.name || "Unknown Patient"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Age: {consultation.basicDetails.age} | BMI:{" "}
                          {(
                            consultation.basicDetails.weight /
                            Math.pow(consultation.basicDetails.height / 100, 2)
                          ).toFixed(1)}
                        </p>
                      </div>
                      <Badge className={getStatusColor(consultation.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(consultation.status)}
                          {consultation.status}
                        </span>
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Symptoms:</p>
                      <div className="flex flex-wrap gap-2">
                        {symptoms.map((symptom, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Submitted: {consultation.createdAt.toLocaleDateString()}
                      </p>
                      <Button size="sm" asChild>
                        <Link
                          href={`/dashboard/doctor/consultation/${consultation.id}`}
                        >
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
