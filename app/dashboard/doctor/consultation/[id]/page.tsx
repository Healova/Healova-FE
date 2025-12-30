import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ConsultationDetail } from "@/components/consultation-detail";
import { consultationsAPI } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default async function ConsultationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  const { id } = await params;

  if (!user || user.role !== "doctor") {
    redirect("/sign-in");
  }

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      redirect("/sign-in");
    }

    // Fetch consultation from API
    const consultationResponse = await fetch(`${API_URL}/consultations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!consultationResponse.ok) {
      redirect("/dashboard/doctor");
    }

    const consultationData = await consultationResponse.json();
    if (!consultationData.success) {
      redirect("/dashboard/doctor");
    }

    const consultation = consultationData.consultation;

    // Transform consultation to match frontend types
    const transformedConsultation = {
      ...consultation,
      id: consultation.id,
      patientId: consultation.patient_id,
      doctorId: consultation.doctor_id,
      status: consultation.status,
      createdAt: new Date(consultation.created_at),
      updatedAt: new Date(consultation.updated_at),
      basicDetails: consultation.basic_details,
      symptoms: consultation.symptoms,
      medicalHistory: {
        previousDiagnosis: consultation.medical_history.previousDiagnosis || consultation.medical_history.previous_diagnosis,
        medications: consultation.medical_history.medications,
        reportsAvailable: consultation.medical_history.reportsAvailable || consultation.medical_history.reports_available,
      },
      media: consultation.media,
      language: consultation.language,
    };

    // For now, we'll pass minimal patient data
    const patient = consultation.patient_id ? { id: consultation.patient_id } : undefined;

    return (
      <ConsultationDetail
        consultation={transformedConsultation}
        patient={patient as any}
        doctorId={user.id}
      />
    );
  } catch (error) {
    console.error("Error fetching consultation:", error);
    redirect("/dashboard/doctor");
  }
}
