"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Consultation, Prescription } from "@/lib/types";
import { signOut } from "@/lib/auth";
import { consultationsAPI, prescriptionsAPI } from "@/lib/api";
import {
  LogOut,
  Plus,
  FileText,
  Download,
  Send,
  Calendar,
  Pill,
  Menu,
  X,
} from "lucide-react";

interface PatientDashboardProps {
  user: User;
}

export function PatientDashboard({ user }: PatientDashboardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("consultations");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [consultationsData, prescriptionsData] = await Promise.all([
          consultationsAPI.getByPatient(),
          prescriptionsAPI.getByPatient(user.id),
        ]);

        // Transform data to match frontend types (convert date strings to Date objects)
        const transformedConsultations = consultationsData.map((c: any) => ({
          ...c,
          id: c.id,
          patientId: c.patient_id,
          doctorId: c.doctor_id,
          status: c.status,
          createdAt: new Date(c.created_at),
          updatedAt: new Date(c.updated_at),
          basicDetails: c.basic_details,
          symptoms: c.symptoms,
          medicalHistory: {
            previousDiagnosis: c.medical_history.previousDiagnosis || c.medical_history.previous_diagnosis,
            medications: c.medical_history.medications,
            reportsAvailable: c.medical_history.reportsAvailable || c.medical_history.reports_available,
          },
          media: c.media,
          language: c.language,
        }));

        const transformedPrescriptions = prescriptionsData.map((p: any) => ({
          ...p,
          createdAt: new Date(p.created_at),
          consultationId: p.consultation_id,
          patientId: p.patient_id,
          doctorId: p.doctor_id,
          lifestyleRecommendations: p.lifestyle_recommendations,
          followUpNotes: p.follow_up_notes,
          pdfUrl: p.pdf_url,
        }));

        setConsultations(transformedConsultations);
        setPrescriptions(transformedPrescriptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

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

  const getPrescriptionByConsultationId = (consultationId: string) => {
    return prescriptions.find((p) => p.consultationId === consultationId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* Header with Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  HEALOVA
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors duration-300 ${pathname === "/"
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                  }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors duration-300 ${pathname === "/about"
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                  }`}
              >
                About
              </Link>
              <Link
                href="/pricing"
                className={`text-sm font-medium transition-colors duration-300 ${pathname === "/pricing"
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                  }`}
              >
                Pricing
              </Link>
              <Link
                href="/faq"
                className={`text-sm font-medium transition-colors duration-300 ${pathname === "/faq"
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                  }`}
              >
                FAQ
              </Link>
            </div>

            {/* Right: User Info & Sign Out */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link
                href="/"
                className="block text-sm font-medium text-gray-700 hover:text-pink-600 py-2"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-sm font-medium text-gray-700 hover:text-pink-600 py-2"
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="block text-sm font-medium text-gray-700 hover:text-pink-600 py-2"
              >
                Pricing
              </Link>
              <Link
                href="/faq"
                className="block text-sm font-medium text-gray-700 hover:text-pink-600 py-2"
              >
                FAQ
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <Button
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
            asChild
          >
            <Link href="/consultation">
              <Plus className="w-4 h-4 mr-2" />
              New Consultation
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Consultations</CardDescription>
              <CardTitle className="text-3xl">{consultations.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Prescriptions</CardDescription>
              <CardTitle className="text-3xl">{prescriptions.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Next Follow-up</CardDescription>
              <CardTitle className="text-lg">In 3 weeks</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Consultations</CardTitle>
                <CardDescription>
                  View your consultation history and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <p>Loading consultations...</p>
                  </div>
                ) : consultations.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      No Consultations Yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Start your first consultation to get expert care.
                    </p>
                    <Button
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                      asChild
                    >
                      <Link href="/consultation">Start Consultation</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {consultations.map((consultation) => {
                      const prescription = getPrescriptionByConsultationId(
                        consultation.id
                      );
                      return (
                        <div
                          key={consultation.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">
                                Consultation #{consultation.id.slice(-4)}
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {consultation.createdAt.toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                            <Badge
                              className={getStatusColor(consultation.status)}
                            >
                              {consultation.status}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Previous Diagnosis:
                              </span>
                              <span className="font-medium uppercase">
                                {consultation.medicalHistory.previousDiagnosis}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Last Updated:
                              </span>
                              <span className="font-medium">
                                {consultation.updatedAt instanceof Date
                                  ? consultation.updatedAt.toLocaleDateString()
                                  : new Date(consultation.updatedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {prescription &&
                            consultation.status === "completed" && (
                              <div className="mt-4 pt-4 border-t">
                                <p className="text-sm text-green-600 font-medium mb-2 flex items-center gap-2">
                                  <Pill className="w-4 h-4" />
                                  Prescription Available
                                </p>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <FileText className="w-4 h-4 mr-2" />
                                    View Prescription
                                  </Button>
                                </div>
                              </div>
                            )}

                          {consultation.status === "in-review" && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-sm text-blue-600 font-medium">
                                Your consultation is being reviewed by our
                                expert doctors. You'll receive your prescription
                                soon.
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Prescriptions</CardTitle>
                <CardDescription>
                  View and download your prescriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {prescriptions.length === 0 ? (
                  <div className="text-center py-12">
                    <Pill className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      No Prescriptions Yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Complete a consultation to receive personalized treatment
                      plans.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {prescriptions.map((prescription) => (
                      <div
                        key={prescription.id}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              Prescription #{prescription.id.slice(-4)}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Issued:{" "}
                              {prescription.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-300">
                            Active
                          </Badge>
                        </div>

                        {/* Diagnosis */}
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-2">
                            Diagnosis
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {prescription.diagnosis}
                          </p>
                        </div>

                        {/* Medicines */}
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-3">
                            Prescribed Medicines
                          </h4>
                          <div className="space-y-3">
                            {prescription.medicines.map((medicine, idx) => (
                              <div
                                key={idx}
                                className="bg-pink-50 rounded-lg p-3"
                              >
                                <div className="flex items-start justify-between mb-1">
                                  <span className="font-medium">
                                    {medicine.name}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {medicine.duration}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">
                                  <strong>Dosage:</strong> {medicine.dosage}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  <strong>Instructions:</strong>{" "}
                                  {medicine.instructions}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Lifestyle Recommendations */}
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-2">
                            Lifestyle Recommendations
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {prescription.lifestyleRecommendations}
                          </p>
                        </div>

                        {/* Follow-up */}
                        <div className="mb-6">
                          <h4 className="font-medium text-sm mb-2">
                            Follow-up Notes
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {prescription.followUpNotes}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t">
                          <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            size="sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            size="sm"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send to WhatsApp
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
