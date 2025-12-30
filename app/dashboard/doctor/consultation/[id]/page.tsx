import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getConsultationById, getPatientById } from "@/lib/utils/helpers";
import { ConsultationDetail } from "@/components/consultation-detail";

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

  const consultation = getConsultationById(id);
  if (!consultation) {
    redirect("/dashboard/doctor");
  }

  const patient = getPatientById(consultation.patientId);

  return (
    <ConsultationDetail
      consultation={consultation}
      patient={patient}
      doctorId={user.id}
    />
  );
}
