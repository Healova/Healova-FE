import type {
  User,
  Patient,
  Doctor,
  Consultation,
  Prescription,
} from "./types";

export type { User, Patient, Doctor, Consultation, Prescription };

// Mock Users
export const mockUsers: User[] = [
  {
    id: "patient-1",
    email: "patient@example.com",
    password: "password123",
    role: "patient",
    name: "Sarah Johnson",
    phone: "+1234567890",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "patient-2",
    email: "emily@example.com",
    password: "password123",
    role: "patient",
    name: "Emily Davis",
    phone: "+1234567891",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "doctor-1",
    email: "doctor@example.com",
    password: "password123",
    role: "doctor",
    name: "Dr. Priya Sharma",
    phone: "+1234567892",
    createdAt: new Date("2023-12-01"),
  },
];

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: "patient-1",
    email: "patient@example.com",
    password: "password123",
    role: "patient",
    name: "Sarah Johnson",
    phone: "+1234567890",
    createdAt: new Date("2024-01-15"),
    age: 28,
    height: 165,
    weight: 70,
  },
  {
    id: "patient-2",
    email: "emily@example.com",
    password: "password123",
    role: "patient",
    name: "Emily Davis",
    phone: "+1234567891",
    createdAt: new Date("2024-02-20"),
    age: 32,
    height: 160,
    weight: 68,
  },
];

// Mock Doctors
export const mockDoctors: Doctor[] = [
  {
    id: "doctor-1",
    email: "doctor@example.com",
    password: "password123",
    role: "doctor",
    name: "Dr. Priya Sharma",
    phone: "+1234567892",
    createdAt: new Date("2023-12-01"),
    specialization: "PCOD/PCOS & Women's Health",
    experience: 12,
    patients: ["patient-1", "patient-2"],
  },
];

// Mock Consultations
export const mockConsultations: Consultation[] = [
  {
    id: "consult-1",
    patientId: "patient-1",
    doctorId: "doctor-1",
    status: "completed",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-03"),
    basicDetails: {
      age: 28,
      height: 165,
      weight: 70,
      menstrualCycleRegularity: "irregular",
    },
    symptoms: {
      irregularPeriods: true,
      acne: true,
      weightGain: true,
      hairLoss: false,
      facialHair: true,
      moodChanges: true,
      fatigue: true,
      other: "Heavy bleeding during periods",
    },
    medicalHistory: {
      previousDiagnosis: "pcos",
      medications: "Metformin 500mg",
      reportsAvailable: true,
    },
    media: {
      images: ["/medical-report-concept.png"],
      audio: [],
      video: [],
    },
    language: "English",
  },
  {
    id: "consult-2",
    patientId: "patient-2",
    doctorId: "doctor-1",
    status: "in-review",
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20"),
    basicDetails: {
      age: 32,
      height: 160,
      weight: 68,
      menstrualCycleRegularity: "very-irregular",
    },
    symptoms: {
      irregularPeriods: true,
      acne: false,
      weightGain: true,
      hairLoss: true,
      facialHair: false,
      moodChanges: true,
      fatigue: true,
      other: "",
    },
    medicalHistory: {
      previousDiagnosis: "not-diagnosed",
      medications: "",
      reportsAvailable: false,
    },
    language: "English",
  },
];

// Mock Prescriptions
export const mockPrescriptions: Prescription[] = [
  {
    id: "prescription-1",
    consultationId: "consult-1",
    patientId: "patient-1",
    doctorId: "doctor-1",
    createdAt: new Date("2024-03-03"),
    diagnosis: "Polycystic Ovary Syndrome (PCOS) with metabolic syndrome",
    medicines: [
      {
        name: "Metformin",
        dosage: "500mg",
        duration: "3 months",
        instructions: "Take twice daily after meals",
      },
      {
        name: "Myo-Inositol",
        dosage: "2g",
        duration: "3 months",
        instructions: "Take once daily in the morning",
      },
      {
        name: "Vitamin D3",
        dosage: "2000 IU",
        duration: "3 months",
        instructions: "Take once daily with breakfast",
      },
    ],
    lifestyleRecommendations:
      "Follow a low-glycemic diet with regular exercise (30 minutes daily). Reduce refined carbohydrates and increase protein intake. Maintain regular sleep schedule of 7-8 hours.",
    followUpNotes:
      "Follow up after 3 months with updated blood reports (fasting glucose, insulin, thyroid panel). Track menstrual cycle regularity.",
    pdfUrl: "/prescriptions/prescription-1.pdf",
  },
];

// Helper functions to simulate API calls
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find((user) => user.email === email);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

export const getPatientById = (id: string): Patient | undefined => {
  return mockPatients.find((patient) => patient.id === id);
};

export const getDoctorById = (id: string): Doctor | undefined => {
  return mockDoctors.find((doctor) => doctor.id === id);
};

export const getConsultationsByPatientId = (
  patientId: string
): Consultation[] => {
  return mockConsultations.filter(
    (consultation) => consultation.patientId === patientId
  );
};

export const getConsultationsByDoctorId = (
  doctorId: string
): Consultation[] => {
  return mockConsultations.filter(
    (consultation) => consultation.doctorId === doctorId
  );
};

export const getConsultationById = (id: string): Consultation | undefined => {
  return mockConsultations.find((consultation) => consultation.id === id);
};

export const getPrescriptionByConsultationId = (
  consultationId: string
): Prescription | undefined => {
  return mockPrescriptions.find(
    (prescription) => prescription.consultationId === consultationId
  );
};

export const getPrescriptionsByPatientId = (
  patientId: string
): Prescription[] => {
  const consultations = getConsultationsByPatientId(patientId);
  const consultationIds = consultations.map((c) => c.id);
  return mockPrescriptions.filter((prescription) =>
    consultationIds.includes(prescription.consultationId)
  );
};
