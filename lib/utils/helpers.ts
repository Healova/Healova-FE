import type {
  User,
  Patient,
  Doctor,
  Consultation,
  Prescription,
} from "../types";
import {
  mockUsers,
  mockPatients,
  mockDoctors,
  mockConsultations,
  mockPrescriptions,
} from "../mock-data";

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
