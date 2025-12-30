export type UserRole = "patient" | "doctor";

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phone?: string;
  createdAt: Date;
}

export interface Patient extends User {
  role: "patient";
  age?: number;
  height?: number;
  weight?: number;
}

export interface Doctor extends User {
  role: "doctor";
  specialization: string;
  experience: number;
  patients: string[]; // patient IDs
}

// Consultation Form Types
export type ConsultationStep = 1 | 2 | 3 | 4;

export interface BasicDetails {
  age: number;
  height: number;
  weight: number;
  menstrualCycle: "regular" | "irregular" | "very-irregular";
}

export interface Symptoms {
  irregularPeriods: boolean;
  acne: boolean;
  weightGain: boolean;
  hairLoss: boolean;
  facialHair: boolean;
  moodChanges: boolean;
  fatigue: boolean;
  other: string;
}

export interface MedicalHistory {
  diagnosis: "pcod" | "pcos" | "not-diagnosed";
  medications: string;
  reportsAvailable: "yes" | "no";
}

export interface MediaFile {
  id: string;
  name: string;
  file: File;
  type: "image" | "audio" | "video";
  url: string;
}

export interface ConsultationFormData {
  basicDetails: BasicDetails;
  symptoms: Symptoms;
  medicalHistory: MedicalHistory;
  media: MediaFile[];
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId?: string;
  status: "pending" | "in-review" | "completed";
  createdAt: Date;
  updatedAt: Date;
  basicDetails: {
    age: number;
    height: number;
    weight: number;
    menstrualCycleRegularity: "regular" | "irregular" | "very-irregular";
  };
  symptoms: {
    irregularPeriods: boolean;
    acne: boolean;
    weightGain: boolean;
    hairLoss: boolean;
    facialHair: boolean;
    moodChanges: boolean;
    fatigue: boolean;
    other?: string;
  };
  medicalHistory: {
    previousDiagnosis: "pcod" | "pcos" | "not-diagnosed";
    medications?: string;
    reportsAvailable: boolean;
  };
  media?: {
    images?: string[];
    audio?: string[];
    video?: string[];
  };
  language: string;
}

export interface Prescription {
  id: string;
  consultationId: string;
  patientId: string;
  doctorId: string;
  createdAt: Date;
  diagnosis: string;
  medicines: {
    name: string;
    dosage: string;
    duration: string;
    instructions: string;
  }[];
  lifestyleRecommendations: string;
  followUpNotes: string;
  pdfUrl?: string;
}
